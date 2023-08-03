import React from 'react';
import { css, styled } from 'styled-components';

type ButtonProps = {
  backgroundColor?: string;
  fontWeight?: string;
  onClick?: (event: React.FormEvent) => void; 
  type?: "primary" | "medium" | "small";
  color?: string; 
  margin?: string;
  children?: React.ReactNode;
  fontSize?: string; 
};


const Button: React.FC<ButtonProps> = ({
  backgroundColor = "#CFCED7",
  fontWeight,
  onClick,
  type,
  color, 
  children,
  fontSize, 
  margin,
}) => {
  return (
    <StyledButton
      backgroundColor={backgroundColor}
      fontWeight={fontWeight}
      onClick={onClick}
      type={type}
      color={color} 
      fontSize={fontSize}
      margin={margin}
    >
{children} 

    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.div<ButtonProps>`
  font-family: Pretendard;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.1;
  letter-spacing: normal;
  text-align: center;
  width: 384px;
  height: 46px;
  border-radius: 8.53px;
  display: inline-flex;
  align-items: center;
  margin: ${({ margin }) => margin};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color}; 
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  
  ${({ type }) =>
    type === "primary"
      ? css`
          width: 384px;
          height: 46px;
        `
      : type === "medium"
      ? css`
          width: 180px;
          height: 46px;
        `
      : type === "small"
      ? css`
          width: 72px;
          height: 36px;
        `
      : css``}; 

`;