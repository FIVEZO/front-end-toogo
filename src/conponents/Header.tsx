import React from 'react'
import Container from 'react-bootstrap/Container';
import { styled } from 'styled-components';

function Header() {
  return (
    <NavbarRayout>
      <Container>
        <NavbarBrand >OE</NavbarBrand>
      
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
  align-items: center;
  justify-content: center;
  display: flex;
  border: solid 1px gray;
  background-color: #fff;
`

const NavbarBrand = styled.span`
  width: 250px;
  height: 40px;
  font-family: Inter;
  font-size: 40px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
`