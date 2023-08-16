import React from 'react'
import Header from '../conponents/Header'
import Footer from '../conponents/Footer'
import { styled } from 'styled-components'
import 프로필 from '../img/프로필.jpg'

export const Chat = () => {
  return (
    <div>
        <Header/>
        <Layout>
            <StChatListContainer>
            <StChatListHearder>전체 메세지</StChatListHearder>

            <StChatList>
                <StProfileImg src={프로필} alt='프로필사진'/>
                <StContentsBox>
                    <StReceiverNickname>{"민서"}</StReceiverNickname>  
                    <StReceiverMessage>{"오늘 프랑스에 같이 가면 좋을 거 같아서 연락을 드렸..."}</StReceiverMessage>
                </StContentsBox>
                <StReceiverTime>{"12:34"}</StReceiverTime>
            </StChatList>

            <StChatList>
                <StProfileImg src={프로필} alt='프로필사진'/>
                <StContentsBox>
                    <StReceiverNickname>{"민서"}</StReceiverNickname>  
                    <StReceiverMessage>{"오늘 프랑스에 같이 가면 좋을 거 같아서 연락을 드렸..."}</StReceiverMessage>
                </StContentsBox>
                <StReceiverTime>{"12:34"}</StReceiverTime>
            </StChatList>

            <StChatList>
                <StProfileImg src={프로필} alt='프로필사진'/>
                <StContentsBox>
                    <StReceiverNickname>{"민서"}</StReceiverNickname>  
                    <StReceiverMessage>{"오늘 프랑스에 같이 가면 좋을 거 같아서 연락을 드렸..."}</StReceiverMessage>
                </StContentsBox>
                <StReceiverTime>{"12:34"}</StReceiverTime>
            </StChatList>
            
            
            </StChatListContainer>
            <StChatRoomContainer>

                
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
const StChatList = styled.div`
    font-size: 16px;
    padding: 16px 24px;
    border-bottom: 1px solid #DDDCE3;
    height:68px;
    display: flex;
    flex-direction: row;
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
    border: 0.85px solid #DDDCE3;
`