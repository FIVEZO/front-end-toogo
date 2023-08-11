import React from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { logOff } from '../redux/modules/loginSlice';
import { useMutation } from 'react-query';
import { logout } from '../api/api';
import { RootState } from '../types/login';

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


  const logOutButton = () =>{
    logoutMutation.mutate()
  }

  return (
    <NavbarRayout>
      <Container>
        <FlexWrapper>
          <NavbarBrand onClick={() => navigate('/')}>OE</NavbarBrand>
          {state
          ? <StloginButton onClick={logOutButton}>로그아웃</StloginButton>// 로그인 되엇을때
          :
          <StloginButton onClick={() => navigate('/login')}>로그인</StloginButton>// 로그아웃 상태일때
          }
        </FlexWrapper>
      </Container>
    </NavbarRayout>
  );
}

export default Header;

const NavbarRayout = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: solid 1px gray;
  background-color: #fff;
  padding: 20px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarBrand = styled.span`
  height: 40px;
  font-family: Inter;
  font-size: 40px;
  letter-spacing: normal;
  color: #000;
  cursor: pointer;
`;

const StloginButton = styled.span`
  font-size: 25px;
  cursor: pointer;
  margin-left: auto;
`;

