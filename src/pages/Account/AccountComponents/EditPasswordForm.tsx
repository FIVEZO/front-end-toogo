import React, { useState } from "react";
import { styled } from "styled-components";
import { AlertModal } from "../../../components/AlertModal";
import useInput from "../../../hooks/useInput";
import { useMutation } from "react-query";
import { changePassword } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOff } from "../../../redux/modules/loginSlice";
import { changePasswordFormValue } from "../../../types/acount";
import Input from "../../../components/Input";

export const EditPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, handlePasswordChange] = useInput();
  const [newpassword, handleNewPasswordChange] = useInput();
  const [newpasswordConfirm, handleNewPasswordConfirmChange] = useInput();
  const [passwordCheck, setPasswordCheck] = useState<boolean | string>(false);
  const [newpasswordCheck, setNewPasswordCheck] = useState<boolean | string>(
    false
  );
  const [newpasswordConfirmCheck, setNewPasswordConfirmCheck] = useState<
    boolean | string
  >(false);
  const [changePasswordModal, setChangePasswordModal] =
    useState<boolean>(false);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;

  const pwchangeMutation = useMutation(changePassword, {
    onSuccess: (data) => {
      if (data.success == false) {
        setPasswordCheck(data.msg);
        return;
      }
      setChangePasswordModal(true);
      dispatch(logOff());
    },
  });

  const changepasswordHandler = () => {
    let hasError = false;

    if (!passwordRegex.test(newpassword)) {
      setNewPasswordCheck("8자리 이상 15자이하, 영문과 숫자를 포함해주세요.");
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

  return (
    <ContentBox>
      <OriginalPasswordForm>
        <Label>기존 비밀번호</Label>
        <Input
          type="password"
          placeholder="기존 비밀번호를 입력해주세요."
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
          placeholder="8자 이상 15자 이하 영문과 숫자를 입력해주세요"
          value={newpassword}
          onChange={handleNewPasswordChange}
          size={"signup"}
          color={newpasswordCheck ? "#E32D2D" : "#cfced7"}
          variant={"eyeIcon"}
        />
        {newpasswordCheck && (
          <StCheckMassage color={"#E32D2D"}>{newpasswordCheck}</StCheckMassage>
        )}
        <Label>새 비밀번호 확인</Label>
        <Input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
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

const OriginalPasswordForm = styled.div`
  margin-bottom: 34px;
  margin-top: 201px;
`;

const NewPasswordForm = styled.div``;

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
