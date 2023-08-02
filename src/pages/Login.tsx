import React from 'react';
import { css, styled } from 'styled-components';
import { LuEyeOff } from "react-icons/lu";

  type ButtonProps = {
    backgroundColor?: string;
    fontColor?: string;
    fontWeight?: string;
 
  };


function Login() {

  
  return (
    <CenteredContainer>
      <LoginLayout>
        <LoginText>로그인</LoginText>
        <LoginForm >
          <Label>아이디</Label>
          <InputBox>
            <Input    type="text" placeholder="아이디를 입력하세요" autoFocus/>
          </InputBox>
        </LoginForm>
        <LoginForm>
          <Label>비밀번호</Label>
          <InputBox>
            <Input type="password" placeholder="비밀번호를 입력하세요" />
            <CustomEyeOffIcon />
          </InputBox>
        </LoginForm>

        <LoginLabel>
          <InputCheck type='checkbox' />
          <LoginLabel2>로그인 상태 유지</LoginLabel2>
        </LoginLabel>

        <LoginButton>
          <Button color={"green"} fontColor={"#ffffff"} fontWeight={"bold"}>로그인</Button>
          <Button color={"yellow"}  fontColor={"#292832"}>
          <ButtonImage src="https://cdn.zeplin.io/64c908915ce80e21fa43ed1f/assets/2bcf4a12-c983-4f43-b56d-52c6d9ab73ac-3x.png" alt="Kakao Icon" />
          Kakao로 시작하기</Button>
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

const Button = styled.div<ButtonProps>`
font-family: Pretendard;
font-stretch: normal;
font-style: normal;
line-height: 1.1;
letter-spacing: normal;
text-align: left;
font-size: 16px;
width: 384px;
height: 46px;
border-radius: 8.53px;
display: inline-flex;
align-items: center;
margin-bottom: 16px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
cursor: pointer;
background-color: ${({ theme, color }) =>
    color === "green" ? theme.color.green : theme.color.yellow};

color: ${({ fontColor }) => fontColor};
font-weight: ${({ fontWeight }) => fontWeight};

&:active {
    background-color: ${({ theme, color }) =>
      color === "green" ? theme.color.darkGreen : theme.color.darkYellow};
  }
  
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

const Input = styled.input`
  margin-left: 16px;
  font-size: 16px;
  color: #000000;
  border: none;
  outline: none;
  flex: 1;
  
  &::placeholder {
    color: #dddce3;
  }
`;

const InputBox = styled.div`
  width: 384px;
  height: 46px;
  border: 1px solid #ccc;
  border-radius: 8.53px;
  display: inline-flex;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
`;

const CustomEyeOffIcon = styled(LuEyeOff)`
cursor: pointer;
color: #cfced7;
margin-right: 16px;
width: 19.8px;
  height: 17.6px;
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
