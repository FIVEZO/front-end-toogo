import React, { useState } from "react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import { styled } from "styled-components";
import ReactSlider from "react-slider";
import { useRecoilState } from "recoil";
import { sliderValueState } from "../../../recoil/NavigationBar";

function RangeModal() {
  const [sliderValue, setSliderValue] =
    useRecoilState<string>(sliderValueState);
  const handleSliderChange = (value: number | number[]) => {
    // 슬라이더 값이 변경될 때마다 문자열로 변경하여 state 업데이트
    setSliderValue(String(value));
  };

  return (
    <div>
      <Box>
        <TextBox>
          <TextPeple>인원</TextPeple>
          <TextPepleMany>동행 인원을 선택해주세요.</TextPepleMany>
        </TextBox>

        <Slider
          style={sliderStyle}
          trackStyle={trackStyle}
          handleStyle={handleStyle}
          railStyle={railStyle}
          step={1}
          min={0}
          max={9}
          onChange={handleSliderChange}
          value={Number(sliderValue)}
          allowCross={false}
          pushable
        />

        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          value={Number(sliderValue)}
          onChange={handleSliderChange}
          defaultValue={0}
          ariaLabelledby="slider-label"
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => (
            <Thumb {...props}>{state.valueNow}명</Thumb>
          )}
          max={9}
          min={0}
          step={1}
        />
      </Box>
    </div>
  );
}

export default RangeModal;
const sliderStyle = {
  width: 386,
  height: 30,
};

const trackStyle = {
  backgroundColor: "#2bde97", // 트랙 색상
  height: 12, // 트랙 높이
};

const handleStyle = {
  borderColor: "white",
  height: 14,
  width: 14,
  marginLeft: 0,
  marginTop: -1,
  backgroundColor: "#2bde97",
};

const railStyle = {
  backgroundColor: "#f4f5f6",
  width: 386,
  height: 12,
};

const Thumb = styled.div`
  width: 30px;
  height: 16px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #747474;
`;
const TextPepleMany = styled.div`
  width: 170px;
  height: 16px;
  flex-grow: 0;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #747474;
`;
const TextPeple = styled.div`
  width: 50px;
  height: 19px;
  flex-grow: 0;
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
`;
const TextBox = styled.div`
  width: 153px;
  height: 43px;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  margin: 0 171px 15px 1px;
  padding: 0;
`;
const Box = styled.div`
  width: 472px;
  height: 157px;
  margin: 0px 389px 5px 696px;
  padding: 30px 43px 20px;
  border-radius: 8px;
  border: solid 1px #cfced7;
  background-color: #fff;
`;
