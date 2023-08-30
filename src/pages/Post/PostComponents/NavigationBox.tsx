import React, { useState } from "react";
import { styled } from "styled-components";
import { CustomCalendar } from "./CustomCalender";
import SelectCountry from "./SelectCountry";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedCountryState,
  selectedDateState,
  sliderValueState,
} from "../../../recoil/NavigationBar";
import RangeModal from "./RangeModal";

interface InnerBoxProps {
  highlighted: boolean;
}

type NavigationBoxProps = {
  id: number;
  alertMessage?: string;
  setAlertMessage?: any;
};

function NavigationBox({
  id,
  alertMessage,
  setAlertMessage,
}: NavigationBoxProps) {
  const [selectedCountry, setSelectedCountry] =
    useRecoilState(selectedCountryState);
  const [selectedBox, setSelectedBox] = useState(0);
  const [isSelect, setIsSelect] = useState(3);

  const [formattedDate, setFormattedDate] = useRecoilState(selectedDateState);
  const [peoplecount, setPeoplecount] = useRecoilState(sliderValueState);

  const handleBoxClick = (index: number) => {
    setSelectedBox(index);
    setIsSelect(index);
    setAlertMessage("");
  };

  return (
    <>
      <NavigationBoxRayout>
        <NavRayout>
          <InnerBox
            onClick={() => {
              handleBoxClick(0);
            }}
            highlighted={selectedBox === 0}
          >
            <TextBox>
              <TextContent>여행 카테고리</TextContent>
              <TextContent2>
                {selectedCountry ? selectedCountry : "여행지를 선택해주세요."}
              </TextContent2>
            </TextBox>
          </InnerBox>
          <InnerBox
            onClick={() => {
              handleBoxClick(1);
            }}
            highlighted={selectedBox === 1}
          >
            <TextBox>
              <TextContent>날짜</TextContent>
              <TextContent2>
                {formattedDate ? formattedDate : "날짜를 선택해주세요."}
              </TextContent2>
            </TextBox>
          </InnerBox>
          <InnerBox
            onClick={() => {
              handleBoxClick(2);
            }}
            highlighted={selectedBox === 2}
          >
            <TextBox>
              <TextContent>모집 인원</TextContent>
              <TextContent2>
                {" "}
                {peoplecount ? `${peoplecount}명` : "인원수를 선택해주세요."}
              </TextContent2>
            </TextBox>
          </InnerBox>
        </NavRayout>
      </NavigationBoxRayout>
      {/* 모달 부분 */}
      <ModalRayout>
        {alertMessage == "나라" && (
          <div style={{ color: "red" }}>나라를 선택해주세요.</div>
        )}
        {alertMessage == "날짜" && (
          <div style={{ color: "red" }}>날짜를 선택해주세요.</div>
        )}
        {alertMessage == "인원" && (
          <div style={{ color: "red" }}>인원을 선택해주세요.</div>
        )}
        {isSelect == 0 && (
          <SelectCountry id={id} onClick={setSelectedCountry} />
        )}
        {isSelect == 1 && (
          <CustomCalendar setFormattedDate={setFormattedDate} />
        )}
        {isSelect == 2 && <RangeModal />}
      </ModalRayout>
    </>
  );
}

export default NavigationBox;

const ModalRayout = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const TextContent2 = styled.div`
  flex-grow: 0;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #717171;
`;

const TextContent = styled.div`
  flex-grow: 0;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
`;

const NavigationBoxRayout = styled.div`
  display: flex;
`;
const NavRayout = styled.div`
  width: 996px;
  height: 83px;
  margin: 41px auto 40px;
  border-radius: 60px;
  background-color: #f4f5f6;
  display: flex;
`;
const InnerBox = styled.div<InnerBoxProps>`
  width: 331px;
  height: 84px;
  display: flex;
  cursor: pointer;
  padding: 20.4px 140px 20.4px 38px;
  ${({ highlighted }) =>
    highlighted &&
    `
    width: 331px;
    height: 84px;
    display: flex;
    padding: 20.4px 140px 20.4px 38px;
    border-radius: 58.7px;
    box-shadow: 1.3px 0 16.6px 0 rgba(0, 0, 0, 0.25);
    border: solid 1px #2bde97;
    background-color: #fff;
  `}
`;

const TextBox = styled.div`
  width: 147px;
  height: 43px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5.1px;
  padding: 0;
`;
