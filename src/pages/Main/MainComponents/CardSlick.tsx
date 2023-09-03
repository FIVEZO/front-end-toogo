import React, { useRef } from "react";
import Slider from "react-slick";
import MainCard from "./MainCard";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactComponent as Prev } from "../../../components/assets/prev.svg";
import { ReactComponent as Next } from "../../../components/assets/next.svg";
import { useNavigate } from "react-router-dom";

const Responsive = () => {
  const sliderRef = useRef<Slider | null>(null);
  const navigate = useNavigate();

  const handleNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    nextArrow: (
      <Div onClick={handleNextSlide}>
        <Next />
      </Div>
    ),
    prevArrow: (
      <DivPre onClick={handlePrevSlide}>
        <Prev />
      </DivPre>
    ),
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <StyledSlider {...settings} ref={sliderRef}>
        <div onClick={() => navigate("/categorypage/1")}>
          <h3>
            <MainCard cardtype="아시아" backgroundImage={"아시아"} />
          </h3>
        </div>

        <div onClick={() => navigate("/categorypage/2")}>
          <h3>
            <MainCard cardtype="아프리카" backgroundImage={"아프리카"} />
          </h3>
        </div>

        <div onClick={() => navigate("/categorypage/3")}>
          <h3>
            <MainCard cardtype="유럽" backgroundImage={"유럽"} />
          </h3>
        </div>

        <div onClick={() => navigate("/categorypage/4")}>
          <h3>
            <MainCard cardtype="오세아니아" backgroundImage={"오세아니아"} />
          </h3>
        </div>

        <div onClick={() => navigate("/categorypage/5")}>
          <h3>
            <MainCard cardtype="아메리카" backgroundImage={"아메리카"} />
          </h3>
        </div>
      </StyledSlider>
    </div>
  );
};

export default Responsive;

const StyledSlider = styled(Slider)`
  height: 100%;
  width: 100%;
  margin: 0 auto 0 auto;
  max-width: 1200px;
  position: relative;
  gap: 24px;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    cursor: pointer;
  }
`;

const Div = styled.div`
  right: 30px;
  top: 160px;
  z-index: 1;
`;

const DivPre = styled.div`
  left: -30px;
  top: 160px;
  z-index: 1;
`;

const Arrow = styled.p`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: gray;
  color: #fff;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s;
  z-index: 1;

  &.left {
    left: -34px;
  }

  &.right {
    right: -34px;
  }
`;
