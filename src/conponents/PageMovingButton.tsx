import React from 'react';
import styled from 'styled-components';
import "../fonts/Font.css";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const PageMovingButton: React.FC<ButtonProps> = ({ onClick, text }) => {
  return <Button onClick={onClick}>{text}</Button>;
};

export default PageMovingButton;

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
  justify-content: center;
`;
