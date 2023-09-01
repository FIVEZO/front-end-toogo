import React from "react";
import { ReactComponent as Winking8 } from "../../../components/assets/emoticon/winking8.svg";
import styled from "styled-components";

const SearchResultNotingPage = () => {
  return (
    <ResultNoting>
      <Winking8 />
      <ResultNotingText>
        검색 결과가 없습니다.
        <br />
        나라/도시명, 닉네임을 검색해보세요.
      </ResultNotingText>
    </ResultNoting>
  );
};

export default SearchResultNotingPage;

const ResultNoting = styled.div`
  display: flex;
  width: 369px;
  height: 145px;
  margin: 150px auto 650px auto;
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
