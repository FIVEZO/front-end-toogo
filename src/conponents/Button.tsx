import { styled } from "styled-components";
import React from 'react';

type ButtonProps = {
  onClick?: (event: React.FormEvent) => void; 
  margin?: string;
  children?: React.ReactNode;
  size: string;
  color: string;
  name?: string; 
  kakao?: boolean;
  disabled?:boolean;
};

const sizeHandler = (size: ButtonProps['size']) => {
  switch (size) {
    case 'large':
      return `width: 384px; height: 46px; `;
    case 'medium':
      return `width: 180px; height: 46px;`;
     case 'small':
        return `width: 72px; height: 36px;`;
     case 'detail':
        return `width: 324px; height: 60px; font-size: 24px;` ;
     case 'post':
        return `width: 580px; height: 109px; font-size: 40px;`;
     case 'addComment':
        return `width: 160px; height: 80px; font-size: 24px;`;
     case 'main': 
        return `width: 120px; height: 50px;`;
    default:
      return `width: 72px; height: 36px;`;
  }
};

const colorHandler = (color: ButtonProps['color']) => {
  switch (color) {
    case 'negative':
      return `border: 1px solid #CFCED7; color: #ffffff; background-color: #CFCED7;  font-weight: bold; font-size: 16px;`; 
    case 'loginOn':
      return `border: 1px solid #1FEC9B; color: #ffffff; background-color: #1FEC9B;  font-weight: bold; font-size: 16px;`;
    case 'kakaoLogin':
      return `border: 1px solid #FFE500; color: #292832; background-color: #FFE500;  font-size: 16px;`;
    case 'detailBtn':
      return `border: 1px solid #1FEC9B; color: #ffffff; background-color:  #1FEC9B;  font-weight: bold; `;
    case 'negativeDetailBtn':
      return `border: 1px solid #CFCED7; color: #ffffff; background-color: #CFCED7;  font-weight: bold; `;
    case 'mainCardBtn':
      return `border: 1px solid#fff; color: #000; background-color:  #fff;  font-weight: bold; font-size: 20px;`;
    default:
      return `border: 1px solid #1FEC9B; color: #ffffff; background-color: #1FEC9B; font-weight: bold; font-size: 16px;`;
  }
};

function Button({ size, color, onClick, name, margin, kakao, disabled  }: ButtonProps) {
  if(disabled){
  return (
    <StyledButton
      color={color} 
      size={size}   
      margin={margin}
      disabled
    >
      {kakao && <ButtonImage src="https://cdn.zeplin.io/64c908915ce80e21fa43ed1f/assets/2bcf4a12-c983-4f43-b56d-52c6d9ab73ac-3x.png" alt="Kakao Icon"/>}
      {name}
      
    </StyledButton>
  );}else{
    return (
      <StyledButton
        onClick={onClick}
        color={color} 
        size={size}   
        margin={margin}
      >
        {kakao && <ButtonImage src="https://cdn.zeplin.io/64c908915ce80e21fa43ed1f/assets/2bcf4a12-c983-4f43-b56d-52c6d9ab73ac-3x.png" alt="Kakao Icon"/>}
        {name}
        
      </StyledButton>
    );
  }
}

const StyledButton = styled.button<ButtonProps>`
  font-family: Pretendard;
  font-stretch: normal;
  font-style: normal;
  text-align: center;
  border-radius: 8.53px;
  display: inline-flex;
  align-items: center;
  margin: ${({ margin }) => margin};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  ${({ color }) => colorHandler(color)};
  ${({ size }) => sizeHandler(size)};
`;

export default Button;

const ButtonImage = styled.img`
   width: 20px;
  height: 20px;
  object-fit: contain;
  margin-right: 9.7px;
`;


