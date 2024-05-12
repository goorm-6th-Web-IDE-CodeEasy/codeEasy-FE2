import React, { useState, useEffect } from 'react';
import './Chat.module.scss'
interface ChatMessage {
    sender: string;
    message: string;
    timestamp: string;
}

export const Chat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetch('/chats')
            .then(res => res.json())
            .then(data => setMessages(data.messages));
    }, []);

    const sendMessage = () => {
        fetch('/chats/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: newMessage })
        }).then(res => res.json())
          .then(data => setMessages([...messages, data]));
        
        setNewMessage('');
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{`${msg.sender}: ${msg.message}`}</p>
                ))}
            </div>
            <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};
