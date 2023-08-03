import React from 'react'
import { styled } from 'styled-components';

export const Signup: React.FC = () => {
  return (
    <CenteredContainer>
      <SignupLayout>
      <SignupText>로그인</SignupText>
      <SignupForm>



      </SignupForm>

      </SignupLayout>
    </CenteredContainer>
  )
}

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignupLayout = styled.div`
  text-align: center;
`;

const SignupText = styled.div`
  font-family: Pretendard;
  font-size: 32px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.96px;
  margin-bottom: 40px;
  color: #403f4e;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;