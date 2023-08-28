import React from "react";
import { styled } from "styled-components";
import Card from "react-bootstrap/Card";
import { cardData, cardItem } from "../../../types/posts";
import { Avatar } from "@mui/material";
import { ReactComponent as Winking1 } from "../../../components/assets/emoticon/winking1.svg";
import { ReactComponent as Winking2 } from "../../../components/assets/emoticon/winking2.svg";
import { ReactComponent as Winking3 } from "../../../components/assets/emoticon/winking3.svg";
import { ReactComponent as Winking4 } from "../../../components/assets/emoticon/winking4.svg";
import { ReactComponent as Winking5 } from "../../../components/assets/emoticon/winking5.svg";
import { formatTimeAgo } from "../../../components/Time";
import { useNavigate } from "react-router-dom";
import { countryImages } from "../../../img/countryImages";
import "../../../fonts/Font.css";


export const SearchCard = ({ items }: { items: cardItem }) => {
  const {
    id,
    nickname,
    title,
    country,
    contents,
    createdAt,
    meetDate,
    category,
    emoticon,
  } = items;
  const countryImage = countryImages[country] || countryImages["한국"];
  const formattedCreatedDate = formatTimeAgo(createdAt); // createdAt을 문자열로 변환하여 formatTimeAgo 함수에 전달

  type EmoticonComponents = {
    [key: string]: JSX.Element;
  };
  const emoticonComponents: EmoticonComponents = {
    1: <Winking1 />,
    2: <Winking2 />,
    3: <Winking3 />,
    4: <Winking4 />,
    5: <Winking5 />,
  };
  const selectedEmoticon = emoticon ? emoticonComponents[emoticon] : null;

  // 내용이 26자가 넘어가면 자름
  const truncatedContents =
    contents.length > 180 ? contents.slice(0, 180) + "..." : contents;

  const truncatedTitle = title.length > 50 ? title.slice(0, 50) + "..." : title;

  const navigate = useNavigate();

  return (
    <DivRayout onClick={() => navigate(`/detailpage/${category}&${id}`)}>
      <StyledCardImg border-radius="12px" variant="top" src={countryImage} />
      <DivContent>
        <CardTitle>{truncatedTitle}</CardTitle>
        <CardText>{truncatedContents}</CardText>
        <AvatarLine>
          <AvatarPic>
            <Avatar alt="Avatar" sx={{ width: 44, height: 44 }}>
             {selectedEmoticon}
            </Avatar>
          </AvatarPic>
          <NicknameAndTime>
            <CardNickname>{nickname}</CardNickname>
            <CreateTime>{formattedCreatedDate}</CreateTime>
          </NicknameAndTime>
          <MeetingTime>{meetDate}</MeetingTime>
        </AvatarLine>
      </DivContent>
    </DivRayout>
  );
};

const DivRayout = styled.div`
  display: flex;
  width: 1200px;
  height: 220px;
  border-radius: 8px;
  border: solid 1px #dddce3;
  background-color: white;
  padding: 24px;
  gap: 24px;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-5px);
  }
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
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: left;
  margin-bottom: 8px;
  height: 22px;
  width: 808px;
  color: #484848;
`;

const CardText = styled.div`
  height: 53px;
  width: 808px;
  font-family: "Pretendard";
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
  background-color: #f4f5f6;
  padding: 15px 16px 15px 16px;
  border-radius: 12px;
  align-items: center;
`;

const AvatarPic = styled.div`
  margin-right: 10px;
`;

const NicknameAndTime = styled.div`
  width: 551px;
  height: 44px;
  gap: 4px;
`;

const CardNickname = styled.div`
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.10000000149011612px;
  text-align: left;
  width: 551px;
  height: 22px;
  color: #3e3232;
`;

const CreateTime = styled.div`
  color: #9a9a9a;
  width: 551px;
  height: 18px;
  font-family: "Pretendard";
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.25px;
  text-align: left;
`;

const MeetingTime = styled.div`
  width: 165px;
  height: 44px;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 700;
  color: #484848;
  text-align: center;
  display: flex;
  align-items: center;
`;
