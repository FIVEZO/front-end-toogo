import React, { useState } from 'react';
import { css, styled } from 'styled-components';
import { LoginFormValues } from '../types/login';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { useMutation } from 'react-query';
import { login } from '../api/api';
import InputBox from '../conponents/InputBox';
import Button from '../conponents/Button';

  type ButtonProps = {
    backgroundColor?: string;
    fontColor?: string;
    fontWeight?: string;
 
  };

function Login() {

  const [email, handleEmailChange] = useInput();
  const [password, handlePasswordChange] = useInput();
  const [emailCheck, setEmailCheck] = useState<boolean | string>(false)
  const [passwordCheck, setPasswordCheck] = useState<boolean | string>(false)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  // ----------------------------------------로그인 로직
  const loginMutation = useMutation(login, {
    onSuccess: () => {
      alert("로그인을 완료하였습니다.");
      navigate('/')
    }
  });

  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault(); 
    if (!emailRegex.test(email)) {
      setEmailCheck("유효한 이메일 주소를 입력해주세요.");
      return;
    }
    if (password.length == 0) {
      setPasswordCheck("비밀번호를 입력해주세요.");
      return;
    }
    const loginInformation: LoginFormValues = {
      email,
      password,
    }
    loginMutation.mutate(loginInformation)
  };

  // ----------------------------------------카카오 로그인
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = 'http://localhost:3000/api/auth/kakao';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLoginHandler = () => {
    window.location.href = link;
  };

  return (
    <CenteredContainer>
      <LoginLayout>
        <LoginText>로그인</LoginText>
        <LoginForm >
          <Label>이메일</Label>
          <InputBox
            type="text"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={handleEmailChange}
            width="384px" 
            height="46px" 
            color={emailCheck? "#E32D2D" : "grey"}
            showEyeIcon={false} 
          />
          {emailCheck&& <StCheckMassage>{emailCheck}</StCheckMassage>}
        </LoginForm>
        <LoginForm>
          <Label>비밀번호</Label>
          <InputBox
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={handlePasswordChange}
            width="384px" 
            height="46px" 
            color={passwordCheck? "#E32D2D" : "grey"}
            showEyeIcon 
          />
          {passwordCheck && <StCheckMassage>{passwordCheck}</StCheckMassage>}
        </LoginForm>

        <LoginLabel>
          <InputCheck type='checkbox' />
          <LoginLabel2>로그인 상태 유지</LoginLabel2>
        </LoginLabel>

        <LoginButton>
          
          <Button
          backgroundColor={"#00ce7c"} 
          color={"#ffffff"} 
          fontWeight={"bold"} 
          onClick={loginHandler}>
            로그인</Button>
          
          <Button
           
          backgroundColor={"#ffe500"} 
          color={"#292832"} 
          fontWeight={"bold"} 
          onClick={kakaoLoginHandler}>
          <ButtonImage src="https://cdn.zeplin.io/64c908915ce80e21fa43ed1f/assets/2bcf4a12-c983-4f43-b56d-52c6d9ab73ac-3x.png" alt="Kakao Icon"/>Kakao로 시작하기</Button>

        </LoginButton>

        <LoginAccountText>
          <IdText>아이디 / 비밀번호찾기</IdText>
          <AccountLien>|</AccountLien>
          <IdText>회원가입</IdText>
        </LoginAccountText>
      </LoginLayout>
    </CenteredContainer>
  );
}

export default Login;

const LoginLabel2 = styled.div`
  margin-top: 4px;
`
const InputCheck = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 7px;
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 2px;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgb(221,220,227)' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e" );
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e" );
    background-size: 150% 150%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #00ce7c;
  }
`

const StCheckMassage = styled.div`
  font-size: 14px;
  margin: 0 auto 16px 0;
  color: red;
`

const LoginLabel = styled.div`
  height: 49.1px;
  flex-grow: 0;
  padding: 0 251px 25.1px 0;
  display: flex;
`

const AccountLien = styled.span`
  width: 16px;
  height: 16px;
  margin-left: 8.5px;
  margin-right: 8.5px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #636363;
`

const ButtonImage = styled.img`
   width: 20px;
  height: 20px;
  object-fit: contain;
  margin-right: 9.7px;
`;

const Label = styled.label`
  align-self: flex-start;
  margin-bottom: 8px;
  font-size: 16px;
  font-family: Pretendard;
  color: #403f4e;
   font-weight: bold;
  font-stretch: normal;
  font-style: normal;
   line-height: 1;
  letter-spacing: normal;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginLayout = styled.div`
  text-align: center;
`;

const LoginText = styled.div`
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.96px;
  margin-bottom: 40px;
  color: #403f4e;

`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
`;


const LoginButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginAccountText = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const IdText = styled.div`
cursor: pointer;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: right;
  color: #403f4e;
`


