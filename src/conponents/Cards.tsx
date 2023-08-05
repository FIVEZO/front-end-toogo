import React from 'react'
import { styled } from 'styled-components'
import Card from 'react-bootstrap/Card';
import { cardData, cardItem } from '../types/posts';
import 일본 from "../img/일본.jpg"




export const Cards = ({items}: {items:cardItem}) => {
  const {id, nickname, title, country, contents, createdAt, meetDate} = items
  
  // 내용이 26자가 넘어가면 자름
  const truncatedContents = contents.length > 26 ? contents.slice(0, 26) + "..." : contents;
  
  return (
  
    <DivRayout>
      <StyledCardImg border-radius= "8px" variant="top" src={일본} />
      <DivContent>
        <CardNickname>{nickname}</CardNickname>
        <CardTitle>{title}</CardTitle>
        <CardText>{truncatedContents}</CardText>
        <DateFootter>{meetDate}</DateFootter>
      </DivContent>
    </DivRayout>
  )
}


const CardText = styled.div`
font-size: 12px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
text-align: left;
color: #6a6a6a;
`

const CardNickname = styled.div`
  font-size: 14px;
  
`

const CardTitle = styled.div`
margin: 0 0 10px 0;
font-size: 14px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
text-align: left;
color: #252525;
`

const DivContent = styled.div`
 padding: 16px
`


const DivRayout = styled.div`
width: 282px;
height: 339px;
flex-grow: 0;
margin: 80px 25px 80px 24px;
padding: 0 0 16px;
border-radius: 8px;
border: solid 1px rgba(0, 0, 0, 0.1);
background-color: #fff;
`


const DateFootter = styled.div`
font-weight: bold;
text-align: right;
color: #252525;
font-size: 13.9px;
margin: 8px 0 0 0 ;
`

const StyledCardImg = styled(Card.Img)`
  border-radius: 8px 8px 0 0;
`;