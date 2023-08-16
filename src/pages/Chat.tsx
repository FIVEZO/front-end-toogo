import React, { useEffect, useRef, useState } from 'react'
import Header from '../conponents/Header'
import Footer from '../conponents/Footer'
import { styled } from 'styled-components'
import 프로필 from '../img/프로필.jpg'
import nonechat from "../img/nonechat.jpg"
import { useNavigate, useParams } from 'react-router-dom'
import { ChatRoom, disConnectHandles } from '../conponents/ChatRoom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import useInput from '../hooks/useInput'
import { createChatRoom, deleteChatRoom, fetchChatRooms } from '../api/chatApi'
import { HiDotsVertical } from "react-icons/hi"

interface ChatRoom {
    id : number
    roomName : string,
    sender : string,
    roomId : string,
    receiver : string,}

export const Chat = () => {
    const roomCode = useParams().id;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [receiverValue, handleReceiverValueChange, resetReceiverValue] = useInput();
    const [id, setId]= useState<number>(0)
    const [roomName, setRoomName] = useState<string>('')
    const [modal, setModal]= useState<boolean>(false)
    const disConnectRef =  useRef<disConnectHandles | null>(null);

// 채팅방 목록 받아오기
  const { isLoading, isError, data: chatRooms } = useQuery<ChatRoom[]>('chatRoomlist', fetchChatRooms);

// 채팅방 만들기
  const createChatMutation = useMutation((receiver:string) => createChatRoom(receiver), {
    onSuccess: () => {
      resetReceiverValue()
      queryClient.invalidateQueries('chatRoomlist')

    }
  });

// 채팅방 삭제하기
  const deleteChatMutation = useMutation((id:number) => deleteChatRoom(id), {
    onSuccess: () => {
      navigate(`/chat/main`);
      setModal(false)
      queryClient.invalidateQueries('chatRoomlist')
    }
  });

  const node = useRef<HTMLDivElement | null>(null); // 창의 바깥부분을 클릭하였을때 창이 사라짐
  useEffect(() => { 
    const clickOutside = (e: MouseEvent) => {
    if (modal && node.current && !node.current.contains(e.target as Node)) setModal(false);};
    document.addEventListener("mousedown", clickOutside);
    return () => {document.removeEventListener("mousedown", clickOutside);};
  }, [modal]);

  if (isLoading) {
  
    return <p>로딩중...!</p>;
  }
  
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }
  const makeChatRoom = ()=>{
    createChatMutation.mutate(receiverValue)
  }

  const handleEnterChatRoom = (room:any) => {
    console.log("room", room)
   setId(room.id)
   setRoomName(room.roomName)
   if (disConnectRef.current) {
    disConnectRef.current.disConnect();
  }
   
    navigate(`/chat/${room.roomId}`);
  };

  
 
  const deleteChat = () => {
    deleteChatMutation.mutate(id)
  };

    
  return (
    <div>
        <Header/>
        <input value={receiverValue} onChange={handleReceiverValueChange}/>
        <button onClick={makeChatRoom}> 방 생성하기</button>
        <Layout>
            <StChatListContainer>
            <StChatListHearder>전체 메세지</StChatListHearder>
            {chatRooms?.map((room, index) => ( 
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
                <>
                <StChatReceiver>
                  <StProfileImg src={프로필} alt='프로필사진'/>
                  <StName>{roomName}</StName>
                  <div ref={node}>
                  <StHiDotsVertical onClick={()=>setModal(pre => !pre)}/>
                  {modal&& <StModal onClick={deleteChat} >채팅방 나가기</StModal>}
                  </div>
                  </StChatReceiver>
                
                <StPost></StPost>
                <ChatRoom ref={disConnectRef} roomId={roomCode}/>
                </>
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
const StChatReceiver = styled.div`
background-color: #F4F5F6;
font-size: 24px;
height:105px;
border-bottom: 1px solid #DDDCE3;
padding:24px;
display: flex;
  align-items: center;
  position: relative;
`
const StName = styled.span`
  margin: 0 auto 0 29px;
`
const StHiDotsVertical = styled(HiDotsVertical)`
  cursor: pointer;
`;
const StModal =styled.div`
  width: 243px;
  height: 51px;
  border-radius: 8px;
  position: absolute;
  background-color:white;
  left: 450px;
  top: 90px;
  padding:17.5px 24px;
  box-shadow: 3px 0px 15px #c1c1c1;
 font-size: 16px;
 cursor: pointer;
`

const StPost = styled.div`
background-color: #F4F5F6;
font-size: 16px;
height:80px;
border-bottom: 1px solid #DDDCE3;

`


