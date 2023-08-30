import React from "react";
import { styled } from "styled-components";
import { Avatar } from "@mui/material";
import { ReactComponent as Winking1 } from "../components/assets/emoticon/winking1.svg";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NotificationFormValues } from "../types/posts";
import { getCookie } from "../utils/cookieUtils";
import { selectedEmoticon } from "../utils/emoticonUtils";
import { deleteAlert } from "../api/api";
import { useNavigate } from "react-router-dom";

function BugetMessege({ items }: { items: NotificationFormValues }) {
  const { id, sender, category, createdAt, readStatus, contents, roomId, message, emoticon  } = items;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //40자 이상 짜르기
  const truncatedContents = contents.length > 40 ? `${contents.slice(0, 40)}...` : contents;

  //---------------------------------------------------- 'emoticon' 값에 따라 다른 이모티콘 컴포넌트를 렌더링
  const myEmoticon = getCookie("emoticon");

  //-----------------------------------------알림 삭제
  const deleteAlertMutation = useMutation(
    ( id: number ) => deleteAlert(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAlert");
        console.log("알림 삭제 완료!");
        // navigate(`/detailpage/${category}&${id}`);
      },
    }
  );

  const handleDeleteAlert = (event: React.FormEvent) => {
    deleteAlertMutation.mutate(id);
  };
  //-----------------------------------------




  return (
    <TextBoxRayout>
      <Avata>
        <EmoticonWrapper>
          {selectedEmoticon(emoticon)}
        </EmoticonWrapper>
      </Avata>
      <TextUpeer onClick={handleDeleteAlert}>
        <TextRayout>
          <TextName>{sender}</TextName>님의 {message}
        </TextRayout>
        <TextMessege>{truncatedContents}</TextMessege>
      </TextUpeer>
    </TextBoxRayout>
  );
}


const Avata = styled.div`
  width: 62px;
  height: 32px;
  margin-top: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
`;

const EmoticonWrapper = styled.div`
  width: 32px; 
  height: 32px; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextUpeer = styled.div`
  width: 360px;
  height: 40px;
  margin-top: 7px;
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



const TextBoxRayout = styled.div`
  width: 440px;
  height: 56px;
  align-self: stretch;
  flex-grow: 0;
  display: flex;

  justify-content: flex-start;
  align-items: flex-start;
     &:hover {
    background-color:#F4F5F6;
  }
  cursor: pointer;
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
