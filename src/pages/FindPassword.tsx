import React, { useState } from 'react';
import { css, styled } from 'styled-components';
import { LoginFormValues } from '../types/login';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { useMutation } from 'react-query';
import { findPassword } from '../api/api';
import Button from '../conponents/Button';
import Input from '../conponents/Input';

  type ButtonProps = {
    backgroundColor?: string;
    fontColor?: string;
    fontWeight?: string;
 
  };

function FindPassword() {

  const [email, handleEmailChange] = useInput();
  const [emailCheck, setEmailCheck] = useState<boolean | string>(false)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  // ----------------------------------------로그인 로직
  const findPasswordMutation = useMutation(findPassword, {
    onSuccess: (data) => {
      if(data.statusCode == 404){
        setEmailCheck("해당 이메일을 찾을 수 없습니다.");
      }else{
        alert("이메일로 임시 비밀번호가 발송되었습니다.")
        navigate('/login')
      }
    },

  });

  const findPasswordHandler = (event: React.FormEvent) => {
    event.preventDefault(); 
    if (!emailRegex.test(email)) {
      setEmailCheck("유효한 이메일 주소를 입력해주세요.");
      return;
    }
    findPasswordMutation.mutate(email)
  };


  // 입력값에 따라 로그인 버튼의 색상을 업데이트하는 함수
  const updateLoginButtonColor = () => {
    if (email) {
      return "loginOn"; // 두 입력값이 모두 채워져 있을 때
    } else {
      return "negative"; // 두 입력값 중 하나라도 
    }
  };

  return (
    <CenteredContainer>
      <LoginLayout>
        <LoginText>비밀번호 찾기</LoginText>
        <Text>가입 시 등록한 이메일을 입력해주세요.</Text>
        <LoginForm onSubmit={findPasswordHandler}>
          <Label>이메일</Label>
          <Input 
          type="text"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={handleEmailChange}
          size={"signup"}
          color={emailCheck? "#E32D2D" : "grey"}
          variant={'default'}
          />
          {emailCheck && <StCheckMassage>{emailCheck}</StCheckMassage>}
        </LoginForm>
       

        <LoginButton>
          <Button
          color={updateLoginButtonColor()} 
          onClick={findPasswordHandler}
          margin={"0 0 16px 0"}
          size={'large'}
          name={"비밀번호 찾기"}
          />
        
        </LoginButton>

      </LoginLayout>
    </CenteredContainer>
  )
}

export default FindPassword

const Text = styled.div`
margin: 24px 0 40px 0;
font-family: Pretendard;
font-size: 16px;
color: #403f4e;
`
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
