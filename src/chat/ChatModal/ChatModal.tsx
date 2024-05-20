import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';
import axios from 'axios';
import Modal from 'react-modal';
import styles from './ChatModal.module.scss';
import { v4 as uuidv4 } from 'uuid';

// TypeScript enum 정의
enum MessageType {
    ENTER = 'ENTER',
    TALK = 'TALK',
}

// ChatMessage 인터페이스 정의
interface ChatMessage {
    id: number;
    type: MessageType;
    roomId: string;
    sender: string;
    message: string;
}

// Props 인터페이스 정의
interface Props {
    isOpen: boolean;
    onClose: () => void;
}

// 모달 인스턴스 설정을 컴포넌트 외부에서 한 번만 호출
Modal.setAppElement('#root');

const ChatModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [nickname, setNickname] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState<ChatMessage[]>([]);
    const stompClient = useRef<Client | null>(null);
    const modalInstanceRef = useRef<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 모달이 열릴 때와 닫힐 때 효과 설정
    useEffect(() => {
        if (isOpen) {
            if (!modalInstanceRef.current) {
                modalInstanceRef.current = true;
                promptForNickname();
            }
        } else {
            modalInstanceRef.current = false;
            disconnectWebSocket();
        }
        return () => {
            disconnectWebSocket();
        };
    }, [isOpen]);

    useEffect(() => {
        // 채팅입력시 입력메시지로 스크롤
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const promptForNickname = () => {
        const userNickname = prompt('닉네임을 입력해 주세요.');
        if (userNickname) {
            setNickname(userNickname);
            fetchMessages();
            connectWebSocket(userNickname);
        } else {
            alert('닉네임을 입력해 주세요.');
            promptForNickname();
        }
    };

    // 메시지 가져오기 함수
    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/chats/messages/main-room');
            setMessages(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]);
        }
    };

    // 웹소켓 연결 함수
    const connectWebSocket = (nickname: string) => {
        const socket = new SockJS('http://localhost:8080/ws-stomp');
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            onConnect: () => {
                console.log('WebSocket connected');
                stompClient.current?.subscribe('/sub/chat/main-room', (message: Message) => {
                    const newMessage: ChatMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
                stompClient.current?.publish({
                    destination: '/pub/chat/send',
                    body: JSON.stringify({ type: 'ENTER', roomId: 'main-room', sender: nickname }),
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });
        stompClient.current.activate();
    };

    // 웹소켓 연결 해제 함수
    const disconnectWebSocket = () => {
        if (stompClient.current) {
            stompClient.current.deactivate();
            console.log('WebSocket disconnected');
        }
    };

    // 메시지 전송 함수
    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        const messageToSend = {
            type: 'TALK',
            roomId: 'main-room',
            sender: nickname,
            message: newMessage,
        };

        try {
            if (stompClient.current && stompClient.current.connected) {
                stompClient.current.publish({
                    destination: '/pub/chat/send',
                    body: JSON.stringify(messageToSend),
                });
            }
            setMessages((prevMessages) => [...prevMessages, messageToSend]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // 메시지 검색 함수
    const searchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/chats/search', {
                params: { keyword: searchKeyword },
            });
            setSearchResults(response.data);
            if (response.data.length === 0) {
                alert('검색 결과가 없습니다.');
            }
        } catch (error) {
            console.error('Error searching messages:', error);
            setSearchResults([]);
        }
    };

    // 키 입력 처리 함수
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    // 검색 결과 클릭 시 닫기 함수
    const handleClearSearchResults = () => {
        setSearchResults([]);
    };

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={styles.chatModal}
            overlayClassName={styles.overlay}
            shouldCloseOnOverlayClick={true} // 빈 공간 클릭 시 모달 닫기
        >
            <div className={styles.chatHeader}>Code Easy 채팅방</div>
            <div className={styles.messages}>
                {messages.map((msg) => (
                    <p key={uuidv4()}>{`${msg.sender}: ${msg.message}`}</p>
                ))}
            </div>
            <div>
                {searchResults.length > 0 && (
                    <div className={styles.searchResults} onClick={handleClearSearchResults}>
                        <h4>검색 결과</h4>
                        <ul>
                            {searchResults.map((msg) => (
                                <li key={msg.id}>{`${msg.sender}: ${msg.message}`}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className={styles.chatInput}>
                <div className="inputGroup">
                    <label>검색</label>
                    <input
                        type="text"
                        value={searchKeyword}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') searchMessages();
                        }}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button onClick={searchMessages}>검색</button>
                </div>
                <div className="inputGroup">
                    <label>내용</label>
                    <input
                        type="text"
                        value={newMessage}
                        onKeyDown={handleKeyPress}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="메세지를 입력하세요..."
                    />
                    <button onClick={sendMessage}>보내기</button>
                </div>
            </div>
        </Modal>
    );
};

export default ChatModal;
