import React, { useState, useEffect, useCallback } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import styles from './ChatModal.module.scss';

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
    const [stompClient, setStompClient] = useState<any>(null);

    const connect = useCallback(() => {
        const socket = new SockJS('http://localhost:8080/ws/chat');
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe('/topic/messages', (message) => {
                const newMsg: ChatMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMsg]);
            });
        });
        setStompClient(client);
    }, []);

    useEffect(() => {
        if (isOpen) {
            connect();
        } else {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
        }
        return () => {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
        };
    }, [isOpen, connect, stompClient]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        const msg = { sender: 'User1', message: newMessage, timestamp: new Date().toISOString() };
        stompClient.send('/app/chat/message', {}, JSON.stringify(msg));
        setNewMessage('');
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            sendMessage();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.chatModal}>
            <div className={styles.chatHeader}>
                <button onClick={onClose}>Close</button>
            </div>
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
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatModal;
