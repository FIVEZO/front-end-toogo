
import styled from 'styled-components';
import { LuEyeOff } from 'react-icons/lu';
import Button from './Button';
import React, { FormEvent } from 'react';


type InputBoxProps = {
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  height?: string;
  color?: string;
  showEyeIcon?: boolean;
  showButton?: boolean;
  error?: boolean;
  onButtonClick?: (event: React.FormEvent<Element>) => void; 
};

const InputBox: React.FC<InputBoxProps> = ({
  placeholder,
  type,
  value,
  onChange,
  width,  
  height,
  color,
  showEyeIcon,
  showButton,
  onButtonClick,
}) => {
  return (
    <InputBoxContainer width={width} height={height} color={color}>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        color={color}
        
      />
     {showEyeIcon && <CustomEyeOffIcon />}
      {showButton &&  onButtonClick && ( 
        <CustomButton 
          type='small'
          color="#ffffff" 
          fontWeight='bold'
          margin='0 6px 0 0'
          onClick={onButtonClick}
          
        >
          중복확인
        </CustomButton>
      )}

    </InputBoxContainer>
  );
};

export default InputBox;

const InputBoxContainer = styled.div<{ width?: string; height?: string; color?: string; error?: boolean }>`
  width: ${({ width }) => (width ? width : '384px')};
  height: ${({ height }) => (height ? height : '46px')};
  border: 1px solid ${({ color }) => (color ? color : '#ccc')};
  border-radius: 8.53px;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  margin-bottom: 16px;
  position: relative;
  border-color: ${({ error, theme }) => (error ? 'red' : theme.color.grey)};
`;

const Input = styled.input<{ color?: string}>`
  margin-left: 16px;
  font-size: 16px;
  color: #403F4E;
  border: none;
  outline: none;
  flex: 1;
  &::placeholder {
    color: #dddce3; 
  }
`;

const CustomEyeOffIcon = styled(LuEyeOff)`
  cursor: pointer;
  color: #cfced7;
  margin-right: 16px;
  width: 19.8px;
  height: 17.6px;
`;

const CustomButton = styled(Button)<{ color?: string }>`
 &:active {
    background-color: ${({ theme, color }) =>
      color === "#ffffff" ? theme.color.grey : "#ffffff"};
    color: ${({ theme, color }) =>
      color === "#ffffff" ? "black" : theme.color.grey}; /* 이 예시에서 theme.color.grey가 버튼의 기본 글자색인 경우 */
    /* 기타 :active 상태일 때의 스타일 속성들 */}
`;

