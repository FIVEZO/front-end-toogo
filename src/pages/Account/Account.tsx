import React, { useState, FormEvent } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { BiSolidPencil } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Input from "../../components/Input";
import useInput from "../../hooks/useInput";
import { ReactComponent as Winking1 } from "../../components/assets/emoticon/winking1.svg";
import { ReactComponent as Winking2 } from "../../components/assets/emoticon/winking2.svg";
import { ReactComponent as Winking3 } from "../../components/assets/emoticon/winking3.svg";
import { ReactComponent as Winking4 } from "../../components/assets/emoticon/winking4.svg";
import { ReactComponent as Winking5 } from "../../components/assets/emoticon/winking5.svg";
import { logOff } from "../../redux/modules/loginSlice";
import {
  nickCheck,
  changePassword,
  logout,
  deleteUser,
  editUser,
} from "../../api/api";
import { editUserFromValue, changePasswordFormValue } from "../../types/acount";
import { getCookie } from "../../utils/cookieUtils";
import { selectedEmoticonBig } from "../../utils/emoticonUtils";
import { AlertModal } from "../../components/AlertModal";

export const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("changeNickname");
  const [newNickname, handleNewNickname] = useInput();
  const [newIntroduction, handleNewIntroduction] = useInput();

  const [nicknameChecks, setNicknameChecks] = useState<boolean | string>(false);
  const [emoticonModalOpen, setemoticonModalOpen] = useState(false);
  const [cancelmemberModalOpen, setcancelmemberModalOpen] = useState(false);
  const [password, handlePasswordChange] = useInput();
  const [newpassword, handleNewPasswordChange] = useInput();
  const [newpasswordConfirm, handleNewPasswordConfirmChange] = useInput();
  const [newpasswordCheck, setNewPasswordCheck] = useState<boolean | string>(
    false
  );
  const [passwordCheck, setPasswordCheck] = useState<boolean | string>(false);
  const [newpasswordConfirmCheck, setNewPasswordConfirmCheck] = useState<
    boolean | string
  >(false);
  const [changePasswordModal, setChangePasswordModal] =
    useState<boolean>(false);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  //---------------------------------------------------- 쿠키에서 닉네임,이메일,이모티콘 가져오기

  const nickname = getCookie("nickname");
  const email = getCookie("email");
  const emoticon = getCookie("emoticon");

  //---------------------------------------------------- 'emoticon' 값에 따라 다른 이모티콘 컴포넌트를 렌더링

  const [newEmoticon, setNewEmoticon] = useState<any>(emoticon);

  //---------------------------------------------------- newEmoticon 값 업데이트 기능

  const updateNewEmoticon = (emoticonValue: string) => {
    setemoticonModalOpen(false);
    setNewEmoticon(emoticonValue);
  };

  //---------------------------------------------------- 닉네임 중복확인 기능
  const nickCheckMutation = useMutation(nickCheck, {
    onSuccess: (data) => {
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
    nickCheckMutation.mutate(newNickname);
  };

  //---------------------------------------------------- 로그아웃 기능
  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      alert("로그아웃 되었습니다.");
      dispatch(logOff());
      navigate("/");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  //---------------------------------------------------- 회원 탈퇴 기능
  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: (data) => {
      dispatch(logOff());
      navigate("/");
    },
  });
  const handleDeleteUser = () => {
    deleteUserMutation.mutate();
  };

  //---------------------------------------------------- 내 정보 수정 기능
  const editUserMutation = useMutation(editUser, {
    onSuccess: () => {
      alert("내 정보 수정이 완료되었습니다.");
      navigate("/mypage");
    },
  });

  const editUserHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (nicknameChecks === "이미 사용 중인 닉네임입니다.") {
      alert("사용 가능한 닉네임을 입력해주세요.");
      return;
    }

    const newUserInfomation: editUserFromValue = {
      newEmoticon,
      newNickname,
      newIntroduction,
    };
    editUserMutation.mutate(newUserInfomation);
  };

  //---------------------------------------------------- 비밀번호 변경 기능

  const pwchangeMutation = useMutation(changePassword, {
    onSuccess: () => {
      setChangePasswordModal(true);
      dispatch(logOff());
    },
  });

  const changepasswordHandler = () => {
    let hasError = false;

    if (!passwordRegex.test(password)) {
      setPasswordCheck("비밀번호는 8자리 이상, 영문과 숫자를 포함해주세요.");
      hasError = true;
    } else {
      setPasswordCheck(false);
    }

    if (!passwordRegex.test(newpassword)) {
      setNewPasswordCheck("비밀번호는 8자리 이상, 영문과 숫자를 포함해주세요.");
      hasError = true;
    } else {
      setNewPasswordCheck(false);
    }

    if (newpassword !== newpasswordConfirm) {
      setNewPasswordConfirmCheck("비밀번호가 일치하지 않습니다");
      hasError = true;
    } else {
      setNewPasswordConfirmCheck(false);
    }

    if (hasError) {
      return;
    }

    const newPassword: changePasswordFormValue = {
      password,
      newPassword: newpassword,
    };
    pwchangeMutation.mutate(newPassword);
  };

  const emoticonOptions = [
    { id: "1", component: Winking1, label: "행복" },
    { id: "2", component: Winking2, label: "언짢" },
    { id: "3", component: Winking3, label: "심심" },
    { id: "4", component: Winking4, label: "졸림" },
    { id: "5", component: Winking5, label: "놀람" },
  ];

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
      {/* ----------------------------------------------------------------------------- 내 정보 수정 칸 */}
      {/* ------------------------------------------------------------------ 이모티콘 수정 버튼 */}
      {activeTab === "changeNickname" && (
        <ContentBox>
          <MainEmoticon>
            {selectedEmoticonBig(newEmoticon)}
            <PenIconBox onClick={() => setemoticonModalOpen(true)}>
              <PenIcon />
            </PenIconBox>
          </MainEmoticon>
          {/* ------------------------------------------------------------------ 이모티콘 선택 모달 */}
          {emoticonModalOpen && (
            <EmoticonModalOverlay onClick={() => setemoticonModalOpen(false)}>
              <EmoticonModalContent onClick={(e) => e.stopPropagation()}>
                <Emoticons>
                  {emoticonOptions.map(
                    ({ id, component: EmoticonComponent, label }) => (
                      <Emoticon
                        key={id}
                        onClick={() => updateNewEmoticon(id)}
                        style={{
                          color: newEmoticon === id ? "#2bde97" : "black",
                        }}
                      >
                        <EmoticonComponent />
                        {label}
                      </Emoticon>
                    )
                  )}
                </Emoticons>
                <EmoticonModalCloseButton
                  onClick={() => setemoticonModalOpen(false)}
                >
                  <MdClose size="22px" />
                </EmoticonModalCloseButton>
              </EmoticonModalContent>
            </EmoticonModalOverlay>
          )}
          <NameBox>{nickname}</NameBox>
          <MailBox>{email}</MailBox>
          {/* ------------------------------------------------------------------ 닉네임/소개 수정 구간 */}
          <ChangeNicknameForm>
            <Label>닉네임</Label>
            <Input
              type="text"
              placeholder="2자 이상 10자 이하"
              value={newNickname}
              onChange={handleNewNickname}
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
                value={newIntroduction}
                onChange={handleNewIntroduction}
              ></IntroductionInput>
            </IntroductionInputContainer>
          </ChangeNicknameForm>
          <SaveButton onClick={editUserHandler}>저장하기</SaveButton>
          <LogoutCancelMembership>
            <Logout onClick={handleLogout}>로그아웃</Logout>|
            <CancelMembership onClick={() => setcancelmemberModalOpen(true)}>
              회원 탈퇴
            </CancelMembership>
          </LogoutCancelMembership>
        </ContentBox>
      )}
      {/* ------------------------------------------------------------------ 회원 탈퇴 모달 */}
      {cancelmemberModalOpen && (
        <AlertModal
          text={"CancelMembership"}
          onButton1={handleDeleteUser}
          onButton2={() => setcancelmemberModalOpen(false)}
        />
      )}
      {/* ----------------------------------------------------------------------------- 비밀번호 수정 칸 */}
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
              value={newpassword}
              onChange={handleNewPasswordChange}
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
              value={newpasswordConfirm}
              onChange={handleNewPasswordConfirmChange}
              size={"signup"}
              color={newpasswordConfirmCheck ? "#E32D2D" : "#cfced7"}
              variant={"eyeIcon"}
            />
            {newpasswordConfirmCheck && (
              <StCheckMassage color={"#E32D2D"}>
                {newpasswordConfirmCheck}
              </StCheckMassage>
            )}
          </NewPasswordForm>
          <SaveButton onClick={changepasswordHandler}>저장하기</SaveButton>
          {changePasswordModal && (
            <AlertModal
              text={"ChangePassword"}
              onButton2={() => navigate("/login")}
            />
          )}
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
  cursor: pointer;
`;

const PenIcon = styled(BiSolidPencil)`
  color: white;
  width: 25px;
  height: 25px;
`;

const NameBox = styled.div`
  width: 182.1px;
  height: 28px;
  font-family: "Pretendard";
  margin-top: 10.5px;
  font-size: 23.6px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #112211;
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

const EmoticonModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const EmoticonModalContent = styled.div`
  width: 620px;
  height: 192px;
  border-radius: 4px;
  border: 1px solid #cfced7;
  background-color: white;
  padding: 0;
  display: flex;
  position: relative;
`;

const EmoticonModalCloseButton = styled.button`
  position: absolute;
  border: none;
  background-color: white;
  top: 14px;
  right: 24.76px;
  padding: 0;
  width: 14.24px;
  height: 14.24px;
`;

const Emoticons = styled.div`
  width: 557px;
  height: 107px;
  margin: 53px 32px 32px 31px;
  gap: 58px;
  display: flex;
`;

const Emoticon = styled.div`
  width: 65px;
  height: 107px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  gap: 24px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0px;
  text-align: center;
  cursor: pointer;
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
