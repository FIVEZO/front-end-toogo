import React from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function Header() {
  const navigate = useNavigate();

  return (
    <NavbarRayout>
      <Container>
        <FlexWrapper>
          <NavbarBrand onClick={() => navigate('/')}>OE</NavbarBrand>
          <StloginButton onClick={() => navigate('/login')}>로그인</StloginButton>
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

