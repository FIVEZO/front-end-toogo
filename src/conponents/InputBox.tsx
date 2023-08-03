import React from 'react';
import styled from 'styled-components';
import { LuEyeOff } from 'react-icons/lu';

type InputBoxProps = {
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  height?: string;
  color?: string;
  showEyeIcon?: boolean;
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
    </InputBoxContainer>
  );
};

export default InputBox;

const InputBoxContainer = styled.div<{ width?: string; height?: string; color?: string }>`
  width: ${({ width }) => (width ? width : '384px')};
  height: ${({ height }) => (height ? height : '46px')};
  border: 1px solid ${({ color }) => (color ? color : '#ccc')};
  border-radius: 8.53px;
  display: inline-flex;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
`;

const Input = styled.input<{ color?: string }>`
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
