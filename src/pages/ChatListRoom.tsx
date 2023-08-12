import React from 'react'
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { fetchChatRooms } from '../api/chatApi';
import { styled } from 'styled-components';
import Header from '../conponents/Header';
interface ChatRoom {
    id : number
    roomName : string,
    sender : string,
    roomId : string,
    receiver : string,}

export const ChatListRoom: React.FC = () => {
    const navigate = useNavigate();

  const { isLoading, isError, data: chatRooms } = useQuery<ChatRoom[]>('chatRoomlist', fetchChatRooms);


  if (isLoading) {
  
    return <p>로딩중...!</p>;
  }
  
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }


  const handleEnterChatRoom = (roomId: string) => {
    navigate(`/chatroom/${roomId}`);
  };
  return (
    <div>
        <Header/>
        <ChatRoomListContainer>
        {chatRooms?.map(room => (
          <ChatRoomItem key={room.roomId} onClick={() => handleEnterChatRoom(room.roomId)}>
            {room.sender}
          </ChatRoomItem>
        ))}
        </ChatRoomListContainer>
    </div>
  )
}

const ChatRoomListContainer = styled.div`

`;

const ChatRoomItem = styled.li`
  cursor: pointer;

  border: 1px solid #ddd;
  border-radius: 5px;

  &:hover {
    background-color: #f0f0f0;
  }
`;