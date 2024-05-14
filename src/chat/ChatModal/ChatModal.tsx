import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        if (isOpen) {
            fetch('/chats')
                .then((res) => res.json())
                .then((data) => setMessages(data.messages))
                .catch((error) => console.error('Error fetching messages:', error));
        }
    }, [isOpen]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        fetch('/chats/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: newMessage }),
        })
            .then((res) => res.json())
            .then((data) => {
                setMessages([...messages, data]);
                setNewMessage('');
            })
            .catch((error) => console.error('Error sending message:', error));
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
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatModal;
