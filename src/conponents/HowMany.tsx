import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { peplecountState } from '../recoil/peplecountState';

function HowMany() {
    const [peplecount, setPeplecount] = useRecoilState(peplecountState);

  const handleIncrement = () => {
    setPeplecount(peplecount + 1);
  };

  const handleDecrement = () => {
    if (peplecount > 0) {
        setPeplecount(peplecount - 1);
    }
  };

  return (
    <div>
      <h1>모집 인원</h1>
      <p>인원수: {peplecount}</p>
      <button onClick={handleIncrement}>더하기</button>
      <button onClick={handleDecrement}>빼기</button>
    </div>
  );
}

export default HowMany;