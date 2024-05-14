import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
//import SockJS from 'sockjs-client';
//import Stomp from 'stompjs';
import Modal from 'react-modal';
import styles from './ChatModal.module.scss';

Modal.setAppElement('#root'); // 모달이 포함될 HTML 엘리먼트의 ID 설정

interface ChatMessage {
    sender: string;
    message: string;
    timestamp: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const ChatModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    //const stompClient = useRef<any>(null);

    //msw로 구현
    useEffect(() => {
        if (isOpen) {
            fetchMessages();
        }
    }, [isOpen]);

    const fetchMessages = () => {
        axios
            .get('/chats')
            .then((response) => {
                if (response.data && Array.isArray(response.data.messages)) {
                    setMessages(response.data.messages);
                } else {
                    console.error('Received data is not valid:', response.data);
                    setMessages([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching messages:', error);
                setMessages([]); // 오류 발생시 메시지 배열을 비웁니다.
            });
    };

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        const messageToSend = { sender: 'CurrentUser', message: newMessage, timestamp: new Date().toISOString() };

        axios
            .post('/chats/send', messageToSend)
            .then((response) => {
                setMessages((prevMessages) => [...prevMessages, response.data]);
                setNewMessage('');
            })
            .catch((error) => console.error('Error sending message:', error));
    };

    // useEffect(() => {
    //     if (isOpen) {
    //         axios.get('/chat/room/messages')
    //             .then((response) => {
    //                 setMessages(response.data.messages);
    //             })
    //             .catch((err) => console.error('Error fetching messages:', err));

    //         const socket = new SockJS('http://localhost:8080/ws/chat');
    //         stompClient.current = Stomp.over(socket);
    //         stompClient.current.connect({}, () => {
    //             stompClient.current.subscribe('/topic/messages', (message: any) => {
    //                 const newMsg: ChatMessage = JSON.parse(message.body);
    //                 setMessages(prevMessages => [...prevMessages, newMsg]);
    //             });
    //         });
    //     } else {
    //         if (stompClient.current) {
    //             stompClient.current.disconnect();
    //         }
    //     }

    //     return () => {
    //         if (stompClient.current) {
    //             stompClient.current.disconnect();
    //         }
    //     };
    // }, [isOpen]);

    // const sendMessage = () => {
    //     if (!newMessage.trim()) return;
    //     const msg = { sender: 'User1', message: newMessage, timestamp: new Date().toISOString() };
    //     if (stompClient.current && stompClient.current.connected) {
    //         stompClient.current.send('/app/chat/message', {}, JSON.stringify(msg));
    //         setNewMessage('');
    //     }
    // };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className={styles.chatModal} overlayClassName={styles.overlay}>
            <div className={styles.chatHeader}>Code Easy 채팅방</div>
            <div className={styles.messages}>
                {messages.map((msg, index) => (
                    <p key={index}>{`${msg.sender}: ${msg.message}`}</p>
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
