// src/components/ChatRoom.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { styled } from 'styled-components';

interface Message {
  id: number;
  text: string;
}

const ChatRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');

  const socket = new SockJS(`${process.env.REACT_APP_CHAT_SERVER}/chat/${roomId}`); // WebSocket 연결

  useEffect(() => {
    socket.onopen = () => {
      console.log('WebSocket 연결됨');
    };

    socket.onmessage = event => {
      const newMessage = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    socket.onclose = () => {
      console.log('WebSocket 연결 닫힘');
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage: Message = {
        id: Date.now(),
        text: messageInput,
      };
      socket.send(JSON.stringify(newMessage));
      setMessageInput('');
    }
  };

  return (
    <ChatRoomContainer>
      <h2>Chat Room {roomId}</h2>
      <div>
        {messages.map(message => (
          <MessageContainer key={message.id}>{message.text}</MessageContainer>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={e => setMessageInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </ChatRoomContainer>

  );
};

export default ChatRoom;


const ChatRoomContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const MessageContainer = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0;

  &:last-child {
    margin-bottom: 0;
  }
`;