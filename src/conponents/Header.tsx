import React from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { logOff } from '../redux/modules/loginSlice';
import { useMutation } from 'react-query';
import { logout } from '../api/api';
import { RootState } from '../types/login';
import "../fonts/Font.css";
import { LuSearch } from 'react-icons/lu';
import { HiOutlineBell } from 'react-icons/hi';
import { RxAvatar } from 'react-icons/rx';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.isLogin.isLogin)

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      dispatch(logOff())
      navigate('/')
    }
  });

  const logOutButton = () => {
    logoutMutation.mutate()
  }

  return (
    <HeaderContainer>
      <HeaderContainer2>
      <Logo onClick={() => navigate('/')}>오이여행</Logo>
      <SearchContainer>
        <SearchInput type="text" placeholder="검색어를 입력해주세요." />
        <SearchButton><LuSearch color='white' size='17px'/></SearchButton>
      </SearchContainer>
      {state ? (
        <LoginConditionButtons>
          <Bell><HiOutlineBell color='#403F4E' size='24px'/></Bell>
          <Profile><RxAvatar color='#403F4E' size='26px'/></Profile>
        </LoginConditionButtons>
      ) : (
        <LogoutConditionButtons>
          <SignupButton onClick={() => navigate('/signup')}>회원가입</SignupButton>
          <Line>|</Line>
          <LoginButton onClick={() => navigate('/login')}>로그인</LoginButton>
        </LogoutConditionButtons>
      )}
      </HeaderContainer2>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background-color: white;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: #d1d5db;
`;

const HeaderContainer2 = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
max-width: 1200px;
`;

const Logo = styled.button`
  background-color: white;
  border: none;
  color: #2BDE97;
  font-family: 'Cafe24 Ssurround';
  font-size: 30px;
  font-weight: 700;
`;

const SearchContainer = styled.div`
  width: 334px;
  height: 48px;
  display: flex;
  align-items: center;
  position: relative;
  gap: 16px;
  border-radius: 1000px;
  border: 1px solid  #CFCED7;
  background: white;
`;

const SearchInput = styled.input`
  width: 254px;
  height: 20px;
  margin-left: 24px;
  border: none;
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 500;
  outline: none;
  &::placeholder {
       color: #DDDCE3;
   }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  width: 32px;
  height: 32px;
  background-color: #2BDE97;
  border: none;
  border-radius: 1000px;
  padding-bottom: 4px;
`;

const LogoutConditionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const SignupButton = styled.button`
  background-color: white;
  border: none;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const LoginButton = styled.button`
  background-color: white;
  border: none;
  color: #9A9A9A;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
`;

const Line = styled.div`
  color: #9A9A9A;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 400;
  cursor: default;
`;

const LoginConditionButtons = styled.div`
  width: 88px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 8px;
  padding: 8px 8px 8px 8px;
  border-radius: 1000px;
  border: 1px solid  #CFCED7;
  background: white;
`;

const Bell = styled.button`
  border: none;
  padding: 0px;
  background-color: white;
`;

const Profile  = styled.button`
  border: none;
  padding: 0px;
  background-color: white;
`;