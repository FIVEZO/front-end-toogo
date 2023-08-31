import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import Input from "../../../components/Input";
import EmoticonSelectionModal from "./EmoticonSelectionModal";
import { BiSolidPencil } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCookie } from "../../../utils/cookieUtils";
import useInput from "../../../hooks/useInput";
import { useMutation } from "react-query";
import { deleteUser, editUser, logout, nickCheck } from "../../../api/api";
import { logOff } from "../../../redux/modules/loginSlice";
import { editUserFromValue } from "../../../types/acount";
import { selectedEmoticonBig } from "../../../utils/emoticonUtils";
import { AlertModal } from "../../../components/AlertModal";

export const EditProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newNickname, handleNewNickname] = useInput();
  const [newIntroduction, handleNewIntroduction] = useInput();
  const [nicknameChecks, setNicknameChecks] = useState<boolean | string>(false);
  const [emoticonModalOpen, setEmoticonModalOpen] = useState(false);
  const [cancelmemberModalOpen, setcancelmemberModalOpen] = useState(false);
  const nickname = getCookie("nickname");
  const email = getCookie("email");
  const emoticon = getCookie("emoticon");
  const [newEmoticon, setNewEmoticon] = useState<any>(emoticon);

  //---------------------------------------------------- newEmoticon 값 업데이트 기능

  const updateNewEmoticon = (emoticonValue: string) => {
    setEmoticonModalOpen(false);
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
    onSuccess: () => {
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

  return (
    <ContentBox>
      <MainEmoticon>
        {selectedEmoticonBig(newEmoticon)}
        <PenIconBox onClick={() => setEmoticonModalOpen(true)}>
          <PenIcon />
        </PenIconBox>
      </MainEmoticon>
      {/* ------------------------------------------------------------------ 이모티콘 선택 모달 */}
      <EmoticonSelectionModal
        open={emoticonModalOpen}
        onClose={() => setEmoticonModalOpen(false)}
        updateEmoticon={updateNewEmoticon}
        selectedEmoticon={newEmoticon}
      />
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

      {cancelmemberModalOpen && (
        <AlertModal
          text={"CancelMembership"}
          onButton1={handleDeleteUser}
          onButton2={() => setcancelmemberModalOpen(false)}
        />
      )}
    </ContentBox>
  );
};

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

const ChangeNicknameForm = styled.div``;

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

const StCheckMassage = styled.div`
  font-size: 13px;
  margin: 0px auto 8px 0;
  color: ${({ color }) => color};
`;