import React, { useState, FormEvent } from "react";
import { styled } from "styled-components";
import { SignupFormValues } from "../../types/login";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-query";
import Button from "../../components/Button";
import { emailCheck, addUsers, nickCheck, authCodeCheck } from "../../api/api";
import Input from "../../components/Input";
import Header from "../../components/Header";
import "../../fonts/Font.css";
import Footer from "../../components/Footer";
import { AlertModal } from "../../components/AlertModal";

type ButtonProps = {
  backgroundColor?: string;
  fontColor?: string;
  fontWeight?: string;
};

function Signup() {
  const [email, handleEmailChange] = useInput();
  const [password, handlePasswordChange] = useInput();
  const [nickname, handleNicknameChange] = useInput();
  const [passwordConfirm, handlePasswordConfirmChange] = useInput();
  const [authCode, handleAuthCodeChange] = useInput();
  const navigate = useNavigate();

  const [emailChecks, setEmailChecks] = useState<boolean | string>(false);
  const [passwordCheck, setPasswordCheck] = useState<boolean | string>(false);
  const [passwordConfirmCheck, setPasswordConfirmCheck] = useState<
    boolean | string
  >(false);
  const [nicknameChecks, setNicknameChecks] = useState<boolean | string>(false);
  const [authCodeChecks, setAuthCodeChecks] = useState<boolean | string>(false);
  const [authCodeView, setAuthCodeView] = useState<boolean>(false);
  const [signupModal, setSignupModal] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // 입력값에 따라 로그인 버튼의 색상을 업데이트하는 함수
  const updateLoginButtonColor = () => {
    if (email && password && nickname) {
      return "loginOn"; // 두 입력값이 모두 채워져 있을 때
    } else {
      return "negative"; // 두 입력값 중 하나라도
    }
  };

  // ---------------------------------------회원가입
  const signupMutation = useMutation(addUsers, {
    onSuccess: () => {
      setSignupModal(true);
    },
  });

  //----------------------------------------- 회원가입 유효성 검사
  const signupHandler = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!emailRegex.test(email)) {
      setEmailChecks("유효한 이메일 주소를 입력해주세요.");
      hasError = true;
    } else {
      setEmailChecks(false);
    }

    if (!passwordRegex.test(password)) {
      setPasswordCheck("비밀번호는 8자리 이상, 영문과 숫자를 포함해주세요.");
      hasError = true;
    } else {
      setPasswordCheck(false);
    }

    if (password !== passwordConfirm) {
      setPasswordConfirmCheck("비밀번호가 일치하지 않습니다");
      hasError = true;
    } else {
      setPasswordConfirmCheck(false);
    }

    if (nickname.length < 2) {
      setNicknameChecks("닉네임을 2글자 이상 입력해주세요");
      hasError = true;
    } else {
      setNicknameChecks(false);
    }

    if (hasError) {
      return;
    }

    const newUser: SignupFormValues = {
      email,
      nickname,
      password,
      code: authCode,
    };
    signupMutation.mutate(newUser);
  };

  // -------------------------------------------------이메일 확인
  const emailCheckMutation = useMutation(emailCheck, {
    onSuccess: (data) => {
      if ((data.status = "OK")) {
        setAuthCodeView(true);
        setEmailChecks(false);
      }
    },
    onError: (error) => {
      setEmailChecks("이미 사용 중인 이메일입니다.");
      console.error("이메일 중복 확인 오류:", error);
    },
  });

  const emailCheckHandler = (event: FormEvent<Element>) => {
    event.preventDefault();
    if (!emailRegex.test(email)) {
      setEmailChecks("유효한 이메일 주소를 입력해주세요.");
      return;
    }
    setEmailChecks("잠시만 기다려 주십시오.");
    email && emailCheckMutation.mutate(email);
  };

  // --------------------------------------------------이메일 인증코드 확인
  const authCodeCheckMutation = useMutation(authCodeCheck, {
    onSuccess: (data) => {
      // console.log("인증코드 확인", data);
      setAuthCodeView(false);
      setEmailChecks("사용 가능한 이메일입니다.");
    },
    onError: (error) => {
      // console.error("인증코드 에러", error);
      setAuthCodeChecks("인증코드가 일치하지 않습니다.");
    },
  });

  const authCodeCheckHandler = (event: FormEvent<Element>) => {
    event.preventDefault();
    authCode && authCodeCheckMutation.mutate(authCode);
  };

  // -------------------------------------------------닉네임 중복확인
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
    nickCheckMutation.mutate(nickname);
  };

  return (
    <div>
      {signupModal && (
        <AlertModal text={"Signup"} onButton2={() => navigate("/login")} />
      )}
      <Header />
      <LoginLayout>
        <SignupText>회원가입</SignupText>
        <LoginForm>
          <Label>이메일</Label>
          <Input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
            size={"signup"}
            color={
              emailChecks == "사용 가능한 이메일입니다." ||
              emailChecks == "잠시만 기다려 주십시오." ||
              emailChecks == false
                ? "#cfced7"
                : "#E32D2D"
            }
            variant={"button"}
            name={"인증하기"}
            onButtonClick={emailCheckHandler}
          />
          {emailChecks && (
            <StCheckMassage
              color={
                emailChecks == "사용 가능한 이메일입니다." ||
                emailChecks == "잠시만 기다려 주십시오."
                  ? "black"
                  : "#E32D2D"
              }
            >
              {emailChecks}
            </StCheckMassage>
          )}
        </LoginForm>
        {authCodeView && (
          <LoginForm>
            <Label>인증코드</Label>
            <Input
              type="text"
              placeholder="이메일에 있는 인증코드를 입력해주세요"
              value={authCode}
              onChange={handleAuthCodeChange}
              size={"signup"}
              color={authCodeChecks ? "#E32D2D" : "#cfced7"}
              variant={"button"}
              name={"코드확인"}
              onButtonClick={authCodeCheckHandler}
            />
            {authCodeChecks && (
              <StCheckMassage color={"#E32D2D"}>
                {authCodeChecks}
              </StCheckMassage>
            )}
          </LoginForm>
        )}
        <LoginForm>
          <Label>비밀번호</Label>
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
        </LoginForm>
        <LoginForm>
          <Label>비밀번호 확인</Label>
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
        </LoginForm>
        <LoginForm>
          <Label>닉네임</Label>
          <Input
            type="text"
            placeholder="2자 이상 10자 이하"
            value={nickname}
            onChange={handleNicknameChange}
            size={"signup"}
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
        </LoginForm>
        <SignupButton>
          <Button
            color={updateLoginButtonColor()}
            onClick={signupHandler}
            margin="32px 0 0 0"
            size="large"
            name="회원가입"
          />
        </SignupButton>
      </LoginLayout>
      <Footer />
    </div>
  );
}

export default Signup;

const LoginLayout = styled.div`
  width: 384px;
  margin: 200px auto 330px auto;
  display: flex;
  flex-direction: column;
`;

const SignupText = styled.div`
  font-family: "Pretendard";
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 0.96px;
  margin: 0px auto 40px auto;
  color: #403f4e;
  width: 120px;
  height: 32px;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 384px;
`;

const Label = styled.label`
  align-self: flex-start;
  margin-bottom: 8px;
  font-size: 16px;
  font-family: "Pretendard";
  color: #403f4e;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
`;

const StCheckMassage = styled.div`
  font-size: 14px;
  margin: 0px auto 16px 0;
  color: ${({ color }) => color};
`;

const SignupButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
