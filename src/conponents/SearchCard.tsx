import React from 'react'
import { styled } from 'styled-components'
import Card from 'react-bootstrap/Card';
import { cardData, cardItem } from '../types/posts';
import { Avatar } from '@mui/material';
import { formatTimeAgo } from './Time';
import { useNavigate } from 'react-router-dom';
import { countryImages } from '../img/countryImages';
import "../fonts/Font.css";

const MySvg = () => (
    <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="80" height="80"><mask id=":r9:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#:r9:)"><rect width="36" height="36" fill="#ff7d10"></rect><rect x="0" y="0" width="36" height="36" transform="translate(5 -1) rotate(155 18 18) scale(1.2)" fill="#70ff56" rx="6"></rect><g transform="translate(3 -4) rotate(-5 18 18)"><path d="M15 21c2 1 4 1 6 0" stroke="#000000" fill="none" strokeLinecap="round"></path><rect x="14" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="20" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>

);

export const SearchCard = ({items}: {items:cardItem}) => {
  const {id, nickname, title, country, contents, createdAt, meetDate, category} = items
  const countryImage = countryImages[country] || countryImages['한국']
  const formattedCreatedDate = formatTimeAgo(createdAt); // createdAt을 문자열로 변환하여 formatTimeAgo 함수에 전달
  // 내용이 26자가 넘어가면 자름
  const truncatedContents = contents.length > 26 ? contents.slice(0, 26) + "..." : contents;
  const navigate = useNavigate();

  return (
    <DivRayout onClick={()=>navigate(`/detailpage/${category}&${id}`)}>
      <StyledCardImg border-radius= "12px" variant="top" src={countryImage} />
      <DivContent>
        <CardTitle>{title}</CardTitle>
        <CardText>{truncatedContents}</CardText>
        <AvatarLine>
          <AvatarPic>
            <Avatar
              alt="Avatar"
              sx={{ width: 24, height: 24 }}>
                <MySvg />
            </Avatar>
          </AvatarPic>
          <CardNickname>{nickname}</CardNickname>
          <SpanLine></SpanLine>
          <CreateTime>{formattedCreatedDate}</CreateTime>
          <DateFootter>{meetDate}</DateFootter>
        </AvatarLine>
      </DivContent>
    </DivRayout>
  )
}

const DivRayout = styled.div`
  display: flex;
  width: 1200px;
  height: 220px;
  border-radius: 8px;
  border: solid 1px #DDDCE3;
  background-color: white;
  padding: 24px;
  gap: 24px;
  cursor: pointer;
`;

const StyledCardImg = styled(Card.Img)`
  width: 320px;          
  height: 172px;      
  border-radius: 12px;
`;

const DivContent = styled.div`
 width: 808px;
 height: 172px;
`;

const CardTitle = styled.div`
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: left;
  margin-bottom: 8px;
  height: 22px;
  color: #484848;
`;

const CardText = styled.div`
  height: 53px;
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #484848;
  margin-bottom: 15px;
`;

const AvatarPic =styled.div`
  margin: 0 8px 0 0;
`;

const SpanLine = styled.span`
  width: 0.9px;
  height: 8px;
  flex-grow: 0;
  margin: 7px 10.6px 9px 10.6px;
  background-color: #bcbcbc;
`;
const CreateTime = styled.div`
  color: #9a9a9a;
  font-size: 12px;
   font-family: Pretendard;
   margin: 6px 0 7px 0;
`;

const AvatarLine = styled.div`
  display: flex;
  margin: 0 0 8px 0;
  background-color: #F4F5F6;
`;



const CardNickname = styled.div`
  margin: 6px 0 7px 0;
  font-size: 12px;
  font-weight: 500;
  font-family: Pretendard;
`;







const DateFootter = styled.div`
font-weight: bold;
text-align: right;
color: #252525;
font-size: 13.9px;
margin: 8px 0 0 0 ;
`;

