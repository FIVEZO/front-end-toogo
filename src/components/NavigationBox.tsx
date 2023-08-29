import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { CustomCalendar } from "../pages/Post/PostComponents/CustomCalender";
import SelectCountry from "./SelectCountry";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedCountryState,
  selectedDateState,
  sliderValueState,
} from "../recoil/NavigationBar";
import { getDetailPosts } from "../api/api";
import { useQuery } from "react-query";
import RangeModal from "./RangeModal";

interface InnerBoxProps {
  highlighted: boolean;
}

function NavigationBox({ id }: { id: number }) {
  const [selectedCountry, setSelectedCountry] =
    useRecoilState(selectedCountryState);
  const [selectedBox, setSelectedBox] = useState(0);
  const [isWhele, setIsWhele] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [isPeple, setIsPeple] = useState(false);
  const [formattedDate, setFormattedDate] = useRecoilState(selectedDateState);
  const [peoplecount, setPeoplecount] = useRecoilState(sliderValueState);

  const handleBoxClick = (index: number) => {
    setSelectedBox(index);
    setIsWhele(false);
    setIsDate(false);
    setIsPeple(false);

    if (index === 0) {
      setIsWhele(true);
    } else if (index === 1) {
      setIsDate(true);
    } else if (index === 2) {
      setIsPeple(true);
    }
  };

  return (
    <>
      <NavigationBoxRayout>
        <NavRayout>
          <InnerBox
            onClick={() => {
              handleBoxClick(0);
              setIsWhele(true);
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
              setIsDate(true);
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
              setIsPeple(true);
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
        {isWhele && <SelectCountry id={id} onClick={setSelectedCountry} />}
        {isDate && <CustomCalendar setFormattedDate={setFormattedDate} />}
        {isPeple && <RangeModal />}
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
