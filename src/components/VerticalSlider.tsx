import React, { useEffect, useState } from 'react';
import Page1Image from './assets/slider/0001.jpg';
import { styled } from 'styled-components';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const VerticalSlider = ({onClose}:{onClose:() => void}) => {

  const navigate = useNavigate();


  const goToMain = () => {
    onClose()
    navigate('/');
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
     <MainOpen>
      <Header/>
      <ParentContainer>
        <ImageContainer>
          <Stimg src={Page1Image} alt="Image" />
        </ImageContainer>
      </ParentContainer>

        <ModalContainer >
          <ModalContent>
            <ModalBody>
              <OeText>오이여행</OeText>
            </ModalBody>
            <ModalFooter>
              <ButtonClick onClick={goToMain}>입장하기</ButtonClick>
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
    </MainOpen>
  );
};

export default VerticalSlider;

const MainOpen = styled.div`
   position: absolute;
   background-color: white;
   height: 200vh;
  top: 0; /* 페이지의 맨 위에 고정되도록 top 속성 추가 */
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999; /* 다른 요소 위에 표시하도록 z-index 설정 */
`

const OeText =styled.div`
    width: 115px;
  height: 35px;
  font-family: Cafe24Ssurround;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #2bde97;
`
const CloseButtonContainer = styled.div`
  order: 1; /* 순서를 바꿔줌 */
`;
const ButtonClick = styled.div`
   width: 68px;
  height: 28px;
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
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  cursor: pointer;
`

const ParentContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  max-width: 80%; /* 최대 너비를 100%로 설정 */
  height: 100vh;
  background-image: url(${Page1Image}); 
  background-size: cover; 
  background-position: center;
`;

const Stimg = styled.img`
  object-fit: cover;
  width: 100%; /* 부모 요소의 너비에 맞게 이미지 너비를 설정합니다. */
`;

const ModalContainer = styled.div`
  position: fixed;
   bottom: -25vh; /* 화면 아래에서 5% 높이 위치에 배치 */
  left: 40vw;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.span`
  cursor: pointer;
  font-size: 20px;
  
`;

const ModalBody = styled.div`
  margin: 0px 0;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
`;