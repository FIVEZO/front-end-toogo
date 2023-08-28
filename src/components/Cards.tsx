import React from "react";
import { styled } from "styled-components";
import Card from "react-bootstrap/Card";
import { cardItem } from "../types/posts";
import { Avatar } from "@mui/material";
import { formatTimeAgo } from "./Time";
import { useNavigate } from "react-router-dom";
import { countryImages } from "../img/countryImages";
import { ReactComponent as Winking1 } from "./assets/emoticon/winking1.svg";
import { ReactComponent as Winking2 } from "./assets/emoticon/winking2.svg";
import { ReactComponent as Winking3 } from "./assets/emoticon/winking3.svg";
import { ReactComponent as Winking4 } from "./assets/emoticon/winking4.svg";
import { ReactComponent as Winking5 } from "./assets/emoticon/winking5.svg";

export const Cards = ({ items }: { items: cardItem }) => {
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
  // 내용이 26자가 넘어가면 자름
  const truncatedContents =
    contents.length > 26 ? contents.slice(0, 26) + "..." : contents;
  const truncatedTitle = title.length > 15 ? title.slice(0, 15) + "..." : title;
  const navigate = useNavigate();

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


  return (
    <DivRayout onClick={() => navigate(`/detailpage/${category}&${id}`)}>
      <StyledCardImg border-radius="8px" variant="top" src={countryImage} />
      <DivContent>
        <AvatarLine>
          <AvatarPic>
            <Avatar alt="Avatar" sx={{ width: 24, height: 24 }}>
              {selectedEmoticon}
            </Avatar>
          </AvatarPic>
          <CardNickname>{nickname}</CardNickname>
          <SpanLine></SpanLine>
          <CreateTime>{formattedCreatedDate}</CreateTime>
        </AvatarLine>
        <CardTitle>{truncatedTitle}</CardTitle>
        <CardText>{truncatedContents}</CardText>
        <DateFootter>{meetDate}</DateFootter>
      </DivContent>
    </DivRayout>
  );
};
const AvatarPic = styled.div`
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
`;

const CardText = styled.div`
  width: 250px;
  height: 39px;
  margin: 10px 0 8px 0;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #6a6a6a;
`;

const CardNickname = styled.div`
  margin: 6px 0 7px 0;
  font-size: 12px;
  font-weight: 500;
  font-family: Pretendard;
`;

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
`;

const DivContent = styled.div`
  padding: 16px;
`;

const DivRayout = styled.div`
  width: 282px;
  height: 339px;
  flex-grow: 0;
  margin: 0px 0px 0 0px;
  border-radius: 8px;
  border: solid 1px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  cursor: pointer;
  box-shadow: 3px 0px 15px #c1c1c1;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-10px);
  }
`;

const DateFootter = styled.div`
  font-weight: bold;
  text-align: right;
  color: #252525;
  font-size: 13.9px;
  margin: 8px 0 0 0;
`;

const StyledCardImg = styled(Card.Img)`
  width: 100%;
  height: 180px;
  border-radius: 8px 8px 0 0;
`;
