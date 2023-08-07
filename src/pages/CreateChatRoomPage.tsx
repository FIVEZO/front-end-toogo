import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { createChatRoom } from '../api/chatApi';

const CreateChatRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const [receiver, setReceiver] = useState('');

  const handleCreateRoom = async () => {
    try {
      const newChatRoom = await createChatRoom( receiver );
      navigate(`/chatroom/${newChatRoom.id}`);
    } catch (error) {
      console.error('Error creating chat room:', error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <CreateChatRoomContainer>
      <h2>Create New Chat Room</h2>
      <label>
        Receiver:
        <input type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
      </label>
      <button onClick={handleCreateRoom}>Create Room</button>
    </CreateChatRoomContainer>
  );
};

export default CreateChatRoomPage;

const CreateChatRoomContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;
