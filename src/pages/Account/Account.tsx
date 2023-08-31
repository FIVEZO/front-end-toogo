import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { EditProfileForm } from "./AccountComponents/EditProfileForm";
import { EditPasswordForm } from "./AccountComponents/EditPasswordForm";

export const Account = () => {
  const [activeTab, setActiveTab] = useState("changeNickname");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Header />
      <PageBox>
        <PostTap
          active={activeTab === "changeNickname"}
          onClick={() => handleTabClick("changeNickname")}
        >
          내 정보 수정
        </PostTap>
        <PostTapLine />
        <PostTap
          active={activeTab === "changePassword"}
          onClick={() => handleTabClick("changePassword")}
        >
          비밀번호 재설정
        </PostTap>
      </PageBox>
      {activeTab === "changeNickname" && <EditProfileForm />}
      {activeTab === "changePassword" && <EditPasswordForm />}
      <Footer />
    </div>
  );
};

const PageBox = styled.div`
  max-width: 1200px;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 80px auto 100px auto;
  border-radius: 11.8px;
  box-shadow: 0 3.9px 15.8px 0px rgba(17, 34, 17, 0.05);
  border: solid 1px #dddce3;
  background-color: #fff;
`;

const PostTap = styled.div<{ active: boolean }>`
  height: 80px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  border-bottom: ${({ active }) => (active ? " 3.9px solid  #2bde97" : "none")};
  cursor: pointer;
`;

const PostTapLine = styled.span`
  width: 1px;
  height: 47.3px;
  flex-grow: 0;
  background-color: #d7e2ee;
`;
