import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';
import axios from 'axios';
import Modal from 'react-modal';
import styles from './ChatModal.module.scss';

interface ChatMessage {
    id: number;
    sender: string;
    message: string;
    timestamp: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

// 모달 인스턴스 설정을 한 번만 호출
Modal.setAppElement('#root');

const ChatModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const stompClient = useRef<Client | null>(null);

    // 모달이 열릴 때와 닫힐 때
    useEffect(() => {
        if (isOpen) {
            fetchMessages();
            connectWebSocket();
        } else {
            disconnectWebSocket();
        }
        // 컴포넌트가 언마운트될 때 웹소켓 연결 해제
        return () => {
            disconnectWebSocket();
        };
    }, [isOpen]);

    // 메시지 가져오기
    const fetchMessages = () => {
        axios
            .get('/chats/messages/main-room')
            .then((response) => {
                setMessages(Array.isArray(response.data) ? response.data : []);
            })
            .catch((error) => {
                console.error('Error fetching messages:', error);
                setMessages([]);
            });
    };

    // 웹소켓 연결
    const connectWebSocket = () => {
        const socket = new SockJS('http://localhost:8080/ws-stomp');
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            onConnect: () => {
                console.log('WebSocket connected');
                stompClient.current?.subscribe('/sub/chats/main-room', (message: Message) => {
                    const newMessage: ChatMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
                stompClient.current?.publish({
                    destination: '/pub/chats/send',
                    body: JSON.stringify({ type: 'ENTER', roomId: 'main-room', sender: 'CurrentUser' }),
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });
        stompClient.current.activate();
    };

    // 웹소켓 연결 해제
    const disconnectWebSocket = () => {
        if (stompClient.current) {
            stompClient.current.deactivate();
            console.log('WebSocket disconnected');
        }
    };

    // 메시지 전송
    const sendMessage = () => {
        if (!newMessage.trim()) return;
        const messageToSend: ChatMessage = {
            id: 0,
            sender: 'CurrentUser',
            message: newMessage,
            timestamp: new Date().toISOString(),
        };

        axios
            .post('/chats/send', messageToSend)
            .then((response) => {
                if (stompClient.current && stompClient.current.connected) {
                    stompClient.current.publish({
                        destination: '/pub/chats/send',
                        body: JSON.stringify(response.data),
                    });
                }
                setNewMessage('');
            })
            .catch((error) => console.error('Error sending message:', error));
    };

    // 키 입력 처리 함수
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={styles.chatModal}
            overlayClassName={styles.overlay}
            shouldCloseOnOverlayClick={true} // 오버레이 클릭 시 모달 닫기
        >
            <div className={styles.chatHeader}>Code Easy 채팅방</div>
            <div className={styles.messages}>
                {messages.map((msg) => (
                    <p key={msg.id}>{`${msg.sender}: ${msg.message}`}</p>
                ))}
            </div>
            <div className={styles.chatInput}>
                <input
                    type="text"
                    value={newMessage}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="메세지를 입력하세요..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </Modal>
    );
};

export default ChatModal;
