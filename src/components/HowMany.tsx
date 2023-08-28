import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { peplecountState } from '../recoil/peplecountState';

function HowMany() {
    const [peple, setPeple] = useRecoilState(peplecountState);

  const handleIncrement = () => {
    setPeple(peple + 1);
  };

  const handleDecrement = () => {
    if (peple > 0) {
        setPeple(peple - 1);
    }
  };

  return (
    <div>
      <h1>모집 인원</h1>
      <p>인원수: {peple}</p>
      <button onClick={handleIncrement}>더하기</button>
      <button onClick={handleDecrement}>빼기</button>
    </div>
  );
}

export default HowMany;