import React from "react";
import { styled } from "styled-components";
import { Avatar } from "@mui/material";
import { ReactComponent as Winking1 } from "../components/assets/emoticon/winking1.svg";
import { useQuery } from "react-query";
import { NotificationFormValues } from "../types/posts";

function BugetMessege({ items }: { items: NotificationFormValues }) {
  const { sender, createdAt, readStatus, contents, message } = items;

  return (
    <TextBoxRayout>
      <Avata>
        <MiniSvg />
      </Avata>
      <TextUpeer>
        <TextRayout>
          <TextName>{sender}</TextName>님의 {message}
        </TextRayout>
        <TextMessege>{contents}</TextMessege>
      </TextUpeer>
    </TextBoxRayout>
  );
}

const MiniSvg = styled(Winking1)`
  width: 32px;
  height: 32px;
`;
const TextUpeer = styled.div`
  width: 360px;
  height: 40px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;
const TextMessege = styled.div`
  flex-grow: 1;
  display: flex;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: #484848;
`;

const Avata = styled.div`
  width: 62px;
  height: 40px;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
`;

const TextBoxRayout = styled.div`
  width: 440px;
  height: 56px;
  align-self: stretch;
  flex-grow: 0;
  display: flex;

  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 0 8px;
`;

const TextRayout = styled.div`
  flex-grow: 1;
  display: flex;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: #484848;
`;
const TextName = styled.div`
  font-weight: bold;
  color: #2bde97;
`;

export default BugetMessege;
