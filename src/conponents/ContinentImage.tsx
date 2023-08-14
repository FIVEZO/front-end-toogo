import React from 'react';
import styled from 'styled-components';
import "../fonts/Font.css";

const continentData = [
  {
    id: 1,
    imageSrc: '/img/아시아.jpg',
    textLine1: '아시아',
    textLine2: '한국, 태국, 필리핀'
  },
  {
    id: 2,
    imageSrc: '/img/아프리카.jpg',
    textLine1: '아프리카',
    textLine2: '모로코, 이집트, 케냐'
  },
  {
    id: 3,
    imageSrc: '/img/유럽.jpg',
    textLine1: '유럽',
    textLine2: '영국, 프랑스, 이탈리아'
  },
  {
    id: 4,
    imageSrc: '/img/오세아니아.jpg',
    textLine1: '오세아니아',
    textLine2: '호주, 뉴질랜드, 파푸아뉴기니'
  },
  {
    id: 5,
    imageSrc: '/img/아메리카.jpg',
    textLine1: '아메리카',
    textLine2: '미국, 캐나다, 브라질'
  }
]

interface ContinentProps {
  id: number;
}

const Continent: React.FC<ContinentProps> = ({ id }) => {
  const data = continentData.find(item => item.id === id);

  if (!data) {
    return <div>해당 ID에 맞는 컨텐츠가 없습니다.</div>;
  }

  return (
    <ContinentContainer>
      <ImageContainer>
        <Image src={data.imageSrc} alt={`이미지 ${data.id}`} />
        <TextContainer>
          <Text1>{data.textLine1}</Text1>
          <Text2>{data.textLine2}</Text2>
        </TextContainer>
      </ImageContainer>
    </ContinentContainer>
  );
};

export default Continent;

const ContinentContainer = styled.div`
  display: flex;
  height: 449px;
  width: 100%;
  background-color: #1E414E;
  justify-content: center;
`;

const ImageContainer = styled.div`
  width: 1200px;
  height: 449px;
  flex: 0 0 1200px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const TextContainer = styled.div`
  width: 477px;
  height: 449px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  gap: 10px;
  margin-left: 110px;
`;

const Text1 = styled.p`
  color: #FFF;
    font-family: 'Pretendard';
    font-size: 26px;
    font-weight: 500;
`;

const Text2 = styled.p`
  color: #FFF;
    font-family: 'Pretendard';
    font-size: 42px;
    font-weight: 700;
`;