import React from 'react';
import styled from 'styled-components';
import "../fonts/Font.css";

interface ButtonProps {
  onClick: () => void;
}

const LoadMoreButton: React.FC<ButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>더 보기</Button>;
};

export default LoadMoreButton;

const Button = styled.button`
  width: 323px;
  height: 56px;
  padding: 20px 40px;
  background-color: white;
  color: #484848;
  font-family: 'Pretendard';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  border-radius: 88px;
  border: 1px solid #9A9A9A;
  margin: 100px auto 120px auto;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;