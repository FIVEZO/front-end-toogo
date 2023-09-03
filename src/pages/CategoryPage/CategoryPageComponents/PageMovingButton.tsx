import React from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick: () => void;
  text: string;
  color: string;
  backgroundColor: string;
}

const PageMovingButton: React.FC<ButtonProps> = ({
  onClick,
  text,
  color,
  backgroundColor,
}) => {
  return (
    <Button onClick={onClick} color={color} backgroundColor={backgroundColor}>
      {text}
    </Button>
  );
};

export default PageMovingButton;

interface ButtonStyleProps {
  color: string;
  backgroundColor: string;
}

const Button = styled.button<ButtonStyleProps>`
  width: 40px;
  height: 40px;
  padding: 8px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  font-family: "Pretendard";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  justify-content: center;
`;
