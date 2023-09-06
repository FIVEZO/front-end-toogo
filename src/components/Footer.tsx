import React from "react";
import "../fonts/Font.css";
import styled from "styled-components";

function Footer() {
  return (
    <FooterContainer>
      <FooterContainer2>
        <Logo>오이여행</Logo>
        <SecondLine>
          <CompanyName>상호명 오이여행</CompanyName>
          <DesignerName>디자인 송지은</DesignerName>

          <ProgrammersName>
            개발자 백태준 | 이남규 | 이상준 | 박영준 | 김나영 | 장승연
          </ProgrammersName>
        </SecondLine>
        <CorporationName>©2023 오이여행 v1.4</CorporationName>
      </FooterContainer2>
    </FooterContainer>
  );
}
export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  height: 160px;
  background-color: #f4f5f6;
  margin-top: 80px;
  justify-content: center;
  display: flex;
`;

const FooterContainer2 = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
  margin: 22px 0px 23px 0px;
  gap: 18px;
`;

const Logo = styled.div`
  color: #2bde97;
  font-family: "Cafe24 Ssurround";
  font-size: 30px;
  font-weight: 700;
`;

const SecondLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 22px;
`;

const CompanyName = styled.div`
  color: #6a6a6a;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 400;
`;

const DesignerName = styled.div`
  color: #6a6a6a;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 400;
`;

const ProgrammersName = styled.div`
  color: #6a6a6a;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 400;
`;

const CorporationName = styled.div`
  color: #9a9a9a;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 400;
`;
