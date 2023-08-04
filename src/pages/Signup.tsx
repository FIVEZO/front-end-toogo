import React, { useState, FormEvent } from 'react';
import { styled } from 'styled-components';
import {  SignupFormValues } from '../types/login';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { useMutation, useQueryClient } from 'react-query';
import InputBox from '../conponents/InputBox';
import Button from '../conponents/Button';
import ButtonBox from '../conponents/ButtonBox';
import { emailCheck ,addUsers, nickCheck } from '../api/api';
import Input from '../conponents/Input';


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
  
  const [emailChecks, setEmailChecks] = useState<boolean | string>(false)
  const [passwordCheck, setPasswordCheck] = useState<boolean | string>(false)
  const [passwordConfirmCheck, setPasswordConfirmCheck] = useState<boolean | string>(false);
  const [nicknameChecks, setNicknameChecks] = useState<string>("")

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const navigate = useNavigate();

  // ---------------------------------------회원가입
  const signupMutation = useMutation(addUsers, {
    onSuccess: () => {
      alert("회원가입을 완료하였습니다.");
      navigate('/')
    }
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
  
    if (hasError) {
      return;
    }
  
    const newUser: SignupFormValues = {
      email,
      nickname,
      password,
      
    }
    signupMutation.mutate(newUser);
  };
  

// -------------------------------------------------이메일 중복확인
const emailCheckMutation = useMutation(emailCheck, {
  onSuccess: (data) => {
    console.log("data",data)
     if (data) {
      setEmailChecks("사용 가능한 이메일입니다.");
    } else {
      setEmailChecks("이미 사용 중인 이메일입니다.");
    }
  },
  onError: (error) => {
    console.error("이메일 중복 확인 오류:", error);
  },
});

const emailCheckHandler = (event: FormEvent<Element>) => {
  event.preventDefault();
  console.log("클릭") 
  if (!emailRegex.test(email)) {
    setEmailChecks("유효한 이메일 주소를 입력해주세요.");
    return
  }
  email && emailCheckMutation.mutate(email);
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
  console.log("클릭")
  
  nickCheckMutation.mutate(nickname);
};

  return (
    <CenteredContainer>

    <LoginLayout>
      <LoginText>회원가입</LoginText>
      <LoginForm >
        {/* <Input 
        type="text"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={handleEmailChange}
          size={"회원가입"}
          color={emailChecks? "#E32D2D" : "grey"}
          variant={'default'}
          onButtonClick={emailCheckHandler}
          /> */}
        <Label>이메일</Label>
        <InputBox
          type="text"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={handleEmailChange}
          width="384px" 
          height="46px" 
          color={emailChecks? "#E32D2D" : "grey"}
          showEyeIcon={false} 
          showButton
          onButtonClick={emailCheckHandler} // 클릭 이벤트 핸들러 전달
        />
        {emailChecks&& <StCheckMassage>{emailChecks}</StCheckMassage>}
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
        {passwordCheck&& <StCheckMassage>{passwordCheck}</StCheckMassage>}
      </LoginForm>

      <LoginForm>
        <Label>비밀번호 확인</Label>
        <InputBox
          type="password"
          placeholder="비밀번호를 확인하세요"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          width="384px" 
          height="46px" 
          color={passwordConfirmCheck? "#E32D2D" : "grey"}
          showEyeIcon 
        />
         {passwordConfirmCheck&& <StCheckMassage>{passwordConfirmCheck}</StCheckMassage>}
      </LoginForm>

      <LoginForm>
        <Label>닉네임</Label>
        <InputBox
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={handleNicknameChange}
          width="384px" 
          height="46px" 
          color={nicknameChecks? "#E32D2D" : "grey"}
          showButton
          onButtonClick={nickCheckHandler} // 클릭 이벤트 핸들러 전달
        />
        {!!nicknameChecks && <StCheckMassage>{nicknameChecks}</StCheckMassage>}
      </LoginForm>


      <LoginButton>
      
      <ButtonBox  onClick={signupHandler} margin='32px 0 0 0' size="large" color="negative" name="회원가입" />
 

      </LoginButton>

    
    </LoginLayout>
  </CenteredContainer>
);
  }

export default Signup

const StCheckMassage = styled.div`
  font-size: 14px;
  margin: 0 auto 16px 0;
  color: red;
`



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



