import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { createChatRoom, deleteChatRoom, fetchChatRooms } from '../api/chatApi';
import { styled } from 'styled-components';
import Header from '../conponents/Header';
import useInput from '../hooks/useInput';
interface ChatRoom {
    id : number
    roomName : string,
    sender : string,
    roomId : string,
    receiver : string,}

export const ChatListRoom: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [receiverValue, handleReceiverValueChange, resetReceiverValue] = useInput();
  const { isLoading, isError, data: chatRooms } = useQuery<ChatRoom[]>('chatRoomlist', fetchChatRooms);
  const createChatMutation = useMutation((receiver:string) => createChatRoom(receiver), {
    onSuccess: () => {
      resetReceiverValue()
      queryClient.invalidateQueries('chatRoomlist')

    }
  });
  const deleteChatMutation = useMutation((id:number) => deleteChatRoom(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('chatRoomlist')
    }
  });

  if (isLoading) {
  
    return <p>로딩중...!</p>;
  }
  
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }
  const makeChatRoom = ()=>{
    createChatMutation.mutate(receiverValue)
  }

  const handleEnterChatRoom = (roomId: string) => {
    navigate(`/chatroom/${roomId}`);
  };
  const deleteChat = (id: number) => {
    deleteChatMutation.mutate(id)
  };
  return (
    <div>
        <Header/>
        <input value={receiverValue} onChange={handleReceiverValueChange}/>
        <button onClick={makeChatRoom}> 방 생성하기</button>

        <ChatRoomListContainer>
        {chatRooms?.map(room => (
          <>
          <ChatRoomItem key={room.roomId} onClick={() => handleEnterChatRoom(room.roomId)}>
            {room.sender}
          </ChatRoomItem>
          <ChatDeleteButton onClick={()=>deleteChat(room.id)}>삭제하기</ChatDeleteButton>
          </>
        ))}
        </ChatRoomListContainer>
    </div>
  )
}

const ChatRoomListContainer = styled.div`

`;

const ChatRoomItem = styled.div`
  cursor: pointer;
  
  border: 1px solid #ddd;
  border-radius: 5px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ChatDeleteButton = styled.button`


`