import React, { Component, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Page1Image1 from "./assets/slider/Page1.webp";
import Page1Image2 from "./assets/slider/Page2.webp";
import Page1Image3 from "./assets/slider/Page3.webp";
import { styled } from "styled-components";
import Header from "./Header";
import { ReactComponent as Prev } from "../components/assets/prev.svg";
import { ReactComponent as Next } from "../components/assets/next.svg";

function VerticalMode({ setShowComponent }: { setShowComponent: any }) {
  const settings = {
    dots: true,

    nextArrow: (
      <Div>
        <Next />
      </Div>
    ),
    prevArrow: (
      <DivPre>
        <Prev />
      </DivPre>
    ),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
  };

  const goToMain = () => {
    setShowComponent(true);
    // navigate("/");
  };

  return (
    <div>
      <Header />
      <ButtonClick onClick={goToMain}>입장하기</ButtonClick>
      <StSlider {...settings}>
        <div>
          <Stimg src={Page1Image1} alt="Image" />
        </div>
        <div>
          <Stimg src={Page1Image2} alt="Image" />
        </div>
        <div>
          <Stimg src={Page1Image3} alt="Image" />
        </div>
      </StSlider>
    </div>
  );
}
const Div = styled.div`
  position: fixed;
  right: 120px;
  top: 350px;
  z-index: 1;
`;
const DivPre = styled.div`
  position: fixed;
  left: 120px;
  top: 350px;
  z-index: 1;
`;
const StSlider = styled(Slider)`
  width: 98%;
`;

const Stimg = styled.img`
  object-fit: contain;
  max-width: 100%;
  max-height: 83vh;
  width: auto;
  height: auto;
  display: block;
  margin: 0 auto;
`;

const LayOut = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ButtonClick = styled.div`
  position: fixed;
  /* top: 800px; */
  bottom: 70px;
  right: 100px;
  width: 300px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #34d996;
  font-family: Inter;
  font-size: 40px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  cursor: pointer;
  z-index: 1000;
`;

export default VerticalMode;
