import React, { useState, useEffect } from 'react';
import 로딩중 from "../img/로딩중.jpg"
import styled from 'styled-components';

function Spinner() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prevRotation => (prevRotation + 1) % 360); // 회전 속도를 늦추기 위해 1도씩 증가하도록 수정
    }, 50); // 간격을 50ms로 조정하여 늦은 속도로 회전하도록 수정

    return () => clearInterval(interval);
  }, []);

  return (
    <StContainer>
      <StImg
        src={로딩중}
        alt="로딩 중..."
        style={{
          transform: `rotate(${rotation}deg)`
        }}
      />
    </StContainer>
  );
}

export default Spinner;

const StContainer = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  width: 100%;
  height: 100vh; /* 화면 전체 높이를 차지하도록 설정 */
  z-index: 10;
`;

const StImg = styled.img`
  width: 200px;
  height: 200px;
`;