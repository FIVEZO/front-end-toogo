// src/components/ChatRoomList.tsx
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { fetchChatRooms } from '../api/chatApi';


interface ChatRoom {
  id : number
  roomName : string,
  sender : string,
  roomId : string,
  receiver : string,
}

const ChatRoomList: React.FC = () => {
  const navigate = useNavigate();

  const { isLoading, isError, data: chatRooms } = useQuery<ChatRoom[]>('chatRoomlist', fetchChatRooms);
  
 

  if (isLoading) {
  
    return <p>로딩중...!</p>;
  }
  
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  const handleEnterChatRoom = (roomId: number) => {
    navigate(`/chatroom/${roomId}`);
  };

  const handleCreateChatRoom = () => {
    navigate('/createchatroompage'); 
  };

  return (
    <ChatRoomListContainer>
      <h2>Chat Room List</h2>
      <button onClick={handleCreateChatRoom}>Create New Chat Room</button>
      <ul>
        {chatRooms?.map(room => (
          <ChatRoomItem key={room.id} onClick={() => handleEnterChatRoom(room.id)}>
            {room.sender}
          </ChatRoomItem>
        ))}
      </ul>
    </ChatRoomListContainer>
  );
};

export default ChatRoomList;

const ChatRoomListContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const ChatRoomItem = styled.li`
  cursor: pointer;
  padding: 10px;
  margin: 5px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
