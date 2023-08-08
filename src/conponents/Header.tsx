import React from 'react'
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function Header() {

  const navigate = useNavigate();

  return (
    <NavbarRayout>
      <Container>
        <NavbarBrand onClick={()=>navigate('/')}>OE</NavbarBrand>
        <StloginButton onClick={()=>navigate('/login')}>로그인</StloginButton>
      </Container>
    </NavbarRayout>
  );
}

export default Header

const NavbarRayout = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content:space-between;
  flex-direction: row;
  border: solid 1px gray;
  background-color: #fff;
  padding: 20px;
`

const NavbarBrand = styled.span`
  width: 250px;
  height: 40px;
  font-family: Inter;
  font-size: 40px;

  letter-spacing: normal;
  color: #000;
  cursor: pointer;
`

const StloginButton = styled.div`
  font-size: 40px;
`