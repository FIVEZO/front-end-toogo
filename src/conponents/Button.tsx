import { styled } from "styled-components";
import React from 'react';

type ButtonProps = {

  onClick?: (event: React.FormEvent) => void; 
  type?: "primary" | "medium" | "small";
  margin?: string;
  children?: React.ReactNode;
  size: 'small' | 'medium' | 'large';
  color: 'primary' | 'negative' | 'default' | 'custom';
  name?: string; 
};

const sizeHandler = (size: ButtonProps['size']) => {
  switch (size) {
    case 'large':
      return `width: 384px; height: 46px; `;
    case 'medium':
      return `width: 180px; height: 46px;`;
     case 'small':
        return `width: 72px; height: 36px;`;
    default:
      return `width: 72px; height: 36px;`;
  }
};

const colorHandler = (color: ButtonProps['color']) => {
  switch (color) {
    case 'negative':
      return `border: 1px solid #CFCED7; color: #ffffff; background-color: #CFCED7;  font-weight: bold; font-size: 16px;`; 
    default:
      return `border: 1px solid rgb(85, 239, 196); background-color: rgb(85, 239, 196)`;
  }
};

function Button({ size, color, onClick, name, margin }: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      color={color} 
      size={size}   
      margin={margin}
    >
      {name}
    </StyledButton>
  );
}

const StyledButton = styled.button<ButtonProps>`
  font-family: Pretendard;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.1;
  letter-spacing: normal;
  text-align: center;
  border-radius: 8.53px;
  display: inline-flex;
  align-items: center;
  margin: ${({ margin }) => margin};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${({ color }) => colorHandler(color)};
  ${({ size }) => sizeHandler(size)};
`;

export default Button;
