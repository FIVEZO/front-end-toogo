import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import Header from "../conponents/Header";
import Footer from "../conponents/Footer";
import { ReactComponent as Winking1 } from "../conponents/assets/emoticon/winking1.svg";
import { ReactComponent as Winking1Big } from "../conponents/assets/emoticon/winking1big.svg";
import { BiSolidPencil } from "react-icons/bi";
import Input from "../conponents/Input";
import useInput from "../hooks/useInput";
import { useMutation } from "react-query";
import { nickCheck } from "../api/api";

export const Account = () => {
  const [activeTab, setActiveTab] = useState("changeNickname");
  const [nickname, handleNicknameChange] = useInput();
  const [introduction, handleIntroductionChange] = useInput();
  const [nicknameChecks, setNicknameChecks] = useState<boolean | string>(false);
  const [password, handlePasswordChange] = useInput();
  const [passwordConfirm, handlePasswordConfirmChange] = useInput();
  const [passwordCheck, setPasswordCheck] = useState<boolean | string>(false);
  const [passwordConfirmCheck, setPasswordConfirmCheck] = useState<
    boolean | string
  >(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // -------------------------------------------------닉네임 중복확인
  const nickCheckMutation = useMutation(nickCheck, {
    onSuccess: (data) => {
      console.log(data);
      if (data) {
        setNicknameChecks("사용 가능한 닉네임입니다.");
      } else {
        setNicknameChecks("이미 사용 중인 닉네임입니다.");
      }
    },
    onError: (error) => {
      console.error("닉네임 중복 확인 오류:", error);
    },
  });

  const nickCheckHandler = (event: FormEvent<Element>) => {
    event.preventDefault();
    console.log("클릭");

    nickCheckMutation.mutate(nickname);
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

      {activeTab === "changeNickname" && (
        <ContentBox>
          <MainEmoticon>
            <Winking1Big />
            <PenIconBox>
              <PenIcon />
            </PenIconBox>
          </MainEmoticon>

          <MailBox>hurshey12@gmail.com</MailBox>

          <ChangeNicknameForm>
            <Label>닉네임</Label>
            <Input
              type="text"
              placeholder="2자 이상 10자 이하"
              value={nickname}
              onChange={handleNicknameChange}
              size={"nicknameChange"}
              color={
                nicknameChecks === "사용 가능한 닉네임입니다."
                  ? "#cfced7"
                  : nicknameChecks
                  ? "#E32D2D"
                  : "#cfced7"
              }
              variant={"button"}
              name={"중복확인"}
              required
              onButtonClick={nickCheckHandler}
            />
            {nicknameChecks && (
              <StCheckMassage
                color={
                  nicknameChecks === "사용 가능한 닉네임입니다."
                    ? "black"
                    : "#E32D2D"
                }
              >
                {nicknameChecks}
              </StCheckMassage>
            )}
            <Label>소개</Label>
            <IntroductionInputContainer>
              <IntroductionInput
                placeholder={"소개글을 입력해주세요."}
              ></IntroductionInput>
            </IntroductionInputContainer>
          </ChangeNicknameForm>
          <SaveButton>저장하기</SaveButton>
          <LogoutCancelMembership>
            <Logout>로그아웃</Logout>|
            <CancelMembership>회원 탈퇴</CancelMembership>
          </LogoutCancelMembership>
        </ContentBox>
      )}

      {activeTab === "changePassword" && (
        <ContentBox>
          <OriginalPasswordForm>
            <Label>기존 비밀번호</Label>
            <Input
              type="password"
              placeholder="영문,숫자 조합 8자 이상 15자 이하"
              value={password}
              onChange={handlePasswordChange}
              size={"signup"}
              color={passwordCheck ? "#E32D2D" : "#cfced7"}
              variant={"eyeIcon"}
            />
            {passwordCheck && (
              <StCheckMassage color={"#E32D2D"}>{passwordCheck}</StCheckMassage>
            )}
          </OriginalPasswordForm>
          <NewPasswordForm>
            <Label>새 비밀번호</Label>
            <Input
              type="password"
              placeholder="영문,숫자 조합 8자 이상 15자 이하"
              value={password}
              onChange={handlePasswordChange}
              size={"signup"}
              color={passwordCheck ? "#E32D2D" : "#cfced7"}
              variant={"eyeIcon"}
            />
            {passwordCheck && (
              <StCheckMassage color={"#E32D2D"}>{passwordCheck}</StCheckMassage>
            )}
            <Label>새 비밀번호 확인</Label>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              size={"signup"}
              color={passwordConfirmCheck ? "#E32D2D" : "#cfced7"}
              variant={"eyeIcon"}
            />
            {passwordConfirmCheck && (
              <StCheckMassage color={"#E32D2D"}>
                {passwordConfirmCheck}
              </StCheckMassage>
            )}
          </NewPasswordForm>
          <SaveButton>저장하기</SaveButton>
        </ContentBox>
      )}

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

const ContentBox = styled.div`
  width: 1200px;
  height: 820px;
  display: flex;
  margin: 0 auto;
  border-radius: 8px;
  border: 1.336px solid var(--grey-150, #eaeaee);
  background: white;
  flex-direction: column;
  align-items: center;
`;

const MainEmoticon = styled.div`
  position: relative;
  width: 180px;
  height: 174px;
  margin-top: 40px;
  display: flex;
`;

const PenIconBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #2bde97;
`;

const PenIcon = styled(BiSolidPencil)`
  color: white;
  width: 25px;
  height: 25px;
`;

const MailBox = styled.div`
  width: 200px;
  color: #121;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 24px auto 52px auto;
`;

const ChangeNicknameForm = styled.div``;

const Label = styled.label`
  align-self: flex-start;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 16px;
  font-family: "Pretendard";
  color: #403f4e;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
`;

const StCheckMassage = styled.div`
  font-size: 13px;
  margin: 0px auto 8px 0;
  color: ${({ color }) => color};
`;

const IntroductionInputContainer = styled.div`
  width: 384px;
  height: 135px;
  display: flex;
  padding: 15px;
  border-radius: 8px;
  border: 1.067px solid #cfced7;
`;

const IntroductionInput = styled.textarea`
  border: none;
  width: 354px;
  height: 105px;
  color: #403f4e;
  font-family: "Pretendard";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  resize: none;
  box-sizing: border-box;
  overflow-wrap: break-word;
  outline: none;
  &::placeholder {
    color: #9a9a9a;
  }
`;

const SaveButton = styled.button`
  width: 180px;
  height: 46px;
  border-radius: 8px;
  background-color: #2bde97;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: "Pretendard";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  border: none;
  margin-top: 80px;
`;

const LogoutCancelMembership = styled.div`
  width: 170px;
  height: 18px;
  gap: 17px;
  margin-top: 24px;
  display: flex;
  padding: 0;
  justify-content: center;
  color: #484848;
  font-size: 16px;
`;

const Logout = styled.button`
  width: 63px;
  height: 18px;
  border: none;
  background-color: white;
  color: #484848;
  font-family: "Pretendard";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  padding: 0;
`;

const CancelMembership = styled.button`
  width: 67px;
  height: 18px;
  border: none;
  background-color: white;
  color: #484848;
  font-family: "Pretendard";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  padding: 0;
`;

const OriginalPasswordForm = styled.div`
  margin-bottom: 34px;
  margin-top: 201px;
`;

const NewPasswordForm = styled.div``;
