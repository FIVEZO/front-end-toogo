import React from 'react'
import Header from '../conponents/Header'
import Footer from '../conponents/Footer'
import { styled } from 'styled-components'
import 프로필 from '../img/프로필.jpg'
import nonechat from "../img/nonechat.jpg"
import { useNavigate, useParams } from 'react-router-dom'
import { ChatRoom } from '../conponents/ChatRoom'
import { useQuery } from 'react-query'
import { fetchChatRooms } from '../api/chatApi'
import Spinner from '../conponents/Spinner'

export interface ChatRoomForm {
    id : number
    roomName : string,
    sender : string,
    roomId : string,
    receiver : string,
  }

export const Chat: React.FC = () => {
    const roomCode = useParams().id;
    const navigate = useNavigate();


// 채팅방 목록 받아오기
  const { isLoading, isError, data: chatRooms } = useQuery<ChatRoomForm[]>('chatRoomlist', fetchChatRooms);
  if (isLoading) {
  
    return <Spinner/>;
  }
  
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }


  const handleEnterChatRoom = (room:any) => {
 
    navigate(`/chat/${room.roomId}`);

  };
    
  return (
    <div>
        <Header/>
        <Layout>
            <StChatListContainer>
            <StChatListHearder>전체 메세지</StChatListHearder>
            {chatRooms?.map((room) => ( 
              room.roomId == roomCode?

            <StChatSelect key={room.roomId} onClick={() => handleEnterChatRoom(room)}>
                <StProfileImg src={프로필} alt='프로필사진'/>
                <StContentsBox>
                    <StReceiverNickname>{room.roomName}</StReceiverNickname>  
                    <StReceiverMessage>{"오늘 프랑스에 같이 가면 좋을 거 같아서 연락을 드렸..."}</StReceiverMessage>
                </StContentsBox>
                <StReceiverTime>{"12:34"}</StReceiverTime>
            </StChatSelect>
              :
            <StChatList key={room.roomId} onClick={() => handleEnterChatRoom(room)}>
                <StProfileImg src={프로필} alt='프로필사진'/>
                <StContentsBox>
                    <StReceiverNickname>{room.roomName}</StReceiverNickname>  
                    <StReceiverMessage>{"오늘 프랑스에 같이 가면 좋을 거 같아서 연락을 드렸..."}</StReceiverMessage>
                </StContentsBox>
                <StReceiverTime>{"12:34"}</StReceiverTime>
            </StChatList>
          
            ))}
          
            </StChatListContainer>
            <StChatRoomContainer>
                {roomCode=="main"?
                <StNoneChat>
                    <StNoneChatImg src={nonechat}/>
                    <StNoneChatcomment>채팅할 상대를 <br/> 선택해주세요</StNoneChatcomment>
                </StNoneChat>
                :
                <ChatRoom/>
                }

                
            </StChatRoomContainer>
        </Layout>
        <Footer/>
    </div>
  )
}

const Layout = styled.div`
    padding: 164px 0 176px 0;
    width: 100%;
    max-width:1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
`
const StChatListContainer = styled.div`
    width: 484px;
    height: 869px;
    box-sizing: border-box;
    border-radius: 8px 0px 0px 8px;
    border: 0.85px solid #DDDCE3;
    overflow: auto;
`

const StChatListHearder = styled.div`
    font-size: 16px;
    padding: 16px 24px;
    border-bottom: 1px solid #DDDCE3;
`

const StChatSelect = styled.div`
    font-size: 16px;
    padding: 16px 24px;
    border-bottom: 1px solid #DDDCE3;
    height:68px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    background-color: #f0f0f0;
`
const StChatList = styled.div`
    font-size: 16px;
    padding: 16px 24px;
    border-bottom: 1px solid #DDDCE3;
    height:68px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    &:hover {
    background-color: #f0f0f0;
  }
`

const StProfileImg =styled.img`

`

const StContentsBox =styled.div`
    margin-left:16px;
`
const StReceiverNickname = styled.div`
    font-weight:700;
    font-size:16px;
`

const StReceiverMessage = styled.div`
    margin-top:9px;
    font-size: 12px;
`

const StReceiverTime = styled.div`
    margin-left:auto;
    font-size: 12px;
`

const StChatRoomContainer = styled.div`
    width: 716px;
    height: 869px;
    box-sizing: border-box;
    border-radius: 0px 8px 8px 0px;
    border: 1px solid #DDDCE3;
    overflow: hidden;
`
const StNoneChat = styled.div`
    background-color: #F4F5F6;
    width:100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const StNoneChatImg = styled.img`
    border-radius: 50%;
    width:50px;
    height: 50px;
    margin-bottom:26px;
`
const StNoneChatcomment = styled.div`
font-size: 24px;
`



