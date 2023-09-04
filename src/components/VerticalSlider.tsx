import React, { useEffect, useState } from "react";
import Page1Image from "./assets/slider/0001.jpg";
import { styled } from "styled-components";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const VerticalSlider = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

  const goToMain = () => {
    onClose();
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainOpen>
      <Header />
      <ParentContainer>
        <ImageContainer>
          <Stimg src={Page1Image} alt="Image" />
        </ImageContainer>
      </ParentContainer>

      <ModalContent>
        <ModalBody>
          <OeText>오이여행</OeText>
        </ModalBody>
        <ModalFooter>
          <ButtonClick onClick={goToMain}>입장하기</ButtonClick>
        </ModalFooter>
      </ModalContent>
    </MainOpen>
  );
};

export default VerticalSlider;

const MainOpen = styled.div`
  position: absolute;
  background-color: white;
  height: 200vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
`;

const ParentContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  max-width: 80%;
  height: 100vh;
  background-image: url(${Page1Image});
  background-size: cover;
  background-position: center;
`;

const Stimg = styled.img`
  object-fit: cover;
  width: 100%;
`;

const ModalContent = styled.div`
  position: absolute;
  top: calc(0vh + 110px);
  left: calc(50% - 125px);
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  border: 2px solid orange;
  height: 170px;
  width: 250px;
  display: flex;
  flex-direction: column;
`;

const ModalBody = styled.div`
  margin: 15px auto 15px auto;
`;

const OeText = styled.div`
  width: 200px;
  height: 35px;
  font-family: Cafe24Ssurround;
  font-size: 40px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #2bde97;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
`;

const ButtonClick = styled.div`
  width: 150px;
  height: 40px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #2bde97;
  flex-grow: 0;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  cursor: pointer;
`;
