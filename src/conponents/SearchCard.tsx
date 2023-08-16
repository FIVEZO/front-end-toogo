import React from 'react'
import { styled } from 'styled-components'
import Card from 'react-bootstrap/Card';
import { cardData, cardItem } from '../types/posts';
import { Avatar } from '@mui/material';
import {  formatTimeAgo } from './Time';
import { useNavigate } from 'react-router-dom';
import { countryImages } from '../img/countryImages';
import "../fonts/Font.css";
import { GoPaperAirplane } from 'react-icons/go';

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
    <DivRayout>
      <StyledCardImg onClick={()=>navigate(`/detailpage/${category}&${id}`)} border-radius= "12px" variant="top" src={countryImage} />
      <DivContent>
        <CardTitle onClick={()=>navigate(`/detailpage/${category}&${id}`)}>{title}</CardTitle>
        <CardText>{truncatedContents}</CardText>
        <AvatarLine>
          <AvatarPic>
            <Avatar
              alt="Avatar"
              sx={{ width: 44, height: 44 }}>
                <MySvg />
            </Avatar>
          </AvatarPic>
          <NicknameAndTime>
          <CardNickname>{nickname}</CardNickname>
          <CreateTime>{formattedCreatedDate}</CreateTime>
          </NicknameAndTime>
          <MeetingTime>{meetDate}</MeetingTime>
          <DM><GoPaperAirplane size='30px' style = {{transform: 'rotate(-35deg)' }}/></DM>
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
`;

const StyledCardImg = styled(Card.Img)`
  width: 320px;          
  height: 172px;      
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    transform: scale(1.005);
  }
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
  width: 808px;
  color: #484848;
  cursor: pointer;
`;

const CardText = styled.div`
  height: 53px;
  width: 808px;
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #484848;
  margin-bottom: 15px;
`;

const AvatarLine = styled.div`
  display: flex;
  width: 808px;
  height: 74px;
  background-color: #F4F5F6;
  padding: 15px 16px 15px 16px;
  border-radius: 12px;
  align-items: center;
`;

const AvatarPic =styled.div`
  margin-right: 10px;
`;

const NicknameAndTime = styled.div`
  width: 551px;
  height: 44px;
  gap: 4px;
`;

const CardNickname = styled.div`
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.10000000149011612px;
  text-align: left;
  width: 551px;
  height: 22px;
  color: #3E3232;
`;

const CreateTime = styled.div`
  color: #9a9a9a;
  width: 551px;
  height: 18px;
  font-family: 'Pretendard';
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.25px;
  text-align: left;
`;

const MeetingTime = styled.div`
  width: 123px;
  height: 44px;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 700;
  color: #484848;
  text-align: center;
  display: flex;
  align-items: center;
`;

const DM = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  margin-left: 14px;
  margin-top: -10px;
  background-color: #F4F5F6;
  &:hover {
    transform: scale(1.05); /* Increase size by 5% (3px) on hover */
  }
`;