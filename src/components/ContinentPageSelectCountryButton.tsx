import React, { useState } from "react";
import { styled } from "styled-components";
import categorymarker from "../img/categorymarker.jpg";
import "../fonts/Font.css";
import { RxReset } from "react-icons/rx";

interface ContinentPageSelectCountryProps {
  id: number;
  onSelectCountry: (country: string) => void;
}

const ContinentPageSelectCountry: React.FC<ContinentPageSelectCountryProps> = ({
  id,
  onSelectCountry,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleContent = () => {
    setIsVisible(!isVisible);
  };

  const countrySelect = (category: number) => {
    switch (category) {
      case 1:
        return [
          "한국",
          "일본",
          "홍콩",
          "대만",
          "중국",
          "몽골",
          "싱가포르",
          "베트남",
          "태국",
          "인도네시아",
          "말레이시아",
          "필리핀",
          "라오스",
          "캄보디아",
          "미얀마",
          "아랍에미리트",
          "인도",
          "네팔",
          "이스라엘",
          "카타르",
        ];
      case 2:
        return [
          "이집트",
          "남아프리카공화국",
          "탄자니아",
          "에티오피아",
          "케냐",
          "나미비아",
          "모로코",
        ];
      case 3:
        return [
          "프랑스",
          "이탈리아",
          "터키",
          "스페인",
          "영국",
          "오스트리아",
          "네덜란드",
          "독일",
          "스위스",
          "포르투갈",
          "폴란드",
          "아이슬란드",
          "핀란드",
          "스웨덴",
          "노르웨이",
          "덴마크",
          "그리스",
          "러시아",
          "아일랜드",
          "헝가리",
          "벨기에",
          "체코",
          "슬로베니아",
        ];
      case 4:
        return ["호주", "뉴질랜드", "괌", "하와이"];
      case 5:
        return [
          "미국",
          "캐나다",
          "멕시코",
          "페루",
          "볼리비아",
          "칠레",
          "아르헨티나",
          "쿠바",
          "브라질",
        ];
      default:
        return [];
    }
  };

  const handleCountryClick = (country: string) => {
    onSelectCountry(country);
    toggleContent();
  };

  const handleResetClick = () => {
    window.location.reload();
  };

  return (
    <ButtonContainer>
      <ToggleButton onClick={toggleContent}>
        {isVisible ? "여행지 ∧" : "여행지 ∨"}
      </ToggleButton>
      <Content isVisible={isVisible}>
        <CountrySelect>
          {countrySelect(id).map((item, index) => (
            <StSelects key={index}>
              <img src={categorymarker} alt="Marker" />
              <StCountry onClick={() => handleCountryClick(item)}>
                {item}
              </StCountry>
            </StSelects>
          ))}
          <Reset onClick={handleResetClick}>
            <RxReset color="#9a9a9a" />
            초기화
          </Reset>
        </CountrySelect>
      </Content>
    </ButtonContainer>
  );
};

export default ContinentPageSelectCountry;

const ButtonContainer = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 21px auto;
`;

const ToggleButton = styled.button`
  width: 175px;
  height: 63px;
  background-color: white;
  color: #484848;
  font-family: "Pretendard";
  font-size: 22px;
  font-weight: 500;
  border-radius: 82.902px;
  border: 1px solid #9a9a9a;
  padding: 18px 45px;
  margin-left: auto;
  margin-bottom: 40px;
  cursor: pointer;
`;

const Content = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  margin-bottom: 40px;
`;

const CountrySelect = styled.div`
  width: 100%;
  border: 1px solid #cfced7;
  border-radius: 8px;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 32px;
  display: flex;
`;

const StSelects = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 260px;
  margin: 8px 0;
`;

const StCountry = styled.button`
  color: #313131;
  text-align: center;
  font-family: "Pretendard";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  padding: 0;
  border: none;
  background-color: white;
`;

const Reset = styled.button`
  background-color: white;
  color: #9a9a9a;
  font-family: "Pretendard";
  border: none;
  font-size: 18px;
  display: flex;
  justify-content: baseline;
  gap: 5px;
  padding: 0;
  margin-left: auto;
  margin-top: auto;
`;
