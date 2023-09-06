import React from "react";
import { ReactComponent as Winking2 } from "../../../components/assets/emoticon/winking2.svg";
import styled from "styled-components";

const PostNoting = () => {
  return (
    <ResultNoting>
      <Winking2 />
      <ResultNotingText>
        게시글이 없어요
        <br />
        첫번째 게시글을 남겨주세요.
      </ResultNotingText>
    </ResultNoting>
  );
};

export default PostNoting;

const ResultNoting = styled.div`
  display: flex;
  width: 369px;
  height: 145px;
  margin: 60px auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const ResultNotingText = styled.div`
  display: flex;
  width: 369px;
  height: 71px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: var(--black, #131f3c);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 133.333% */
`;
