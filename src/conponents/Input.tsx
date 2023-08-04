import styled from 'styled-components';
import { LuEyeOff } from 'react-icons/lu';
import Button from './Button';
import React from 'react';

type InputProps = {
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size: string;
  color?: string;
  variant?: 'default' | 'eyeIcon' | 'button';
  error?: boolean;
  onButtonClick?: (event: React.FormEvent<Element>) => void;
};

const sizeHandler = (size: InputProps['size']) => {
  switch (size) {
    case '회원가입':
        return `width: 384px; height: 46px`;
    default:
        return `width: 384px; height: 46px;`;
    }
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  value,
  onChange,
  size,
  color,
  variant = 'default',
  error,
  onButtonClick,
}) => {

    
 // 일반 인풋
  const renderInput = () => (
    <InputContainer size={size} error={error}>
      <InputField
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputContainer>
  );

  // 눈 버튼이 들어간 인풋
  const renderEyeIcon = () => (
    <InputContainer size={size} error={error}>
      <InputField
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <CustomEyeOffIcon />
    </InputContainer>
  );

    // 인풋안에 버튼
  const renderButton = () => (
    <InputContainer size={size} error={error}>
      <InputField
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {onButtonClick && (
        <CustomButton
          type='small'
          color='#ffffff'
          fontWeight='bold'
          margin='0 6px 0 0'
          onClick={onButtonClick}
        >
          중복확인
        </CustomButton>
      )}
    </InputContainer>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'eyeIcon':
        return renderEyeIcon();
      case 'button':
        return renderButton();
      default:
        return renderInput();
    }
  };

  return renderVariant();
};

export default Input;

const InputContainer = styled.div<{ size: string , error?: boolean }>`
  ${({ size }) => sizeHandler(size)};
  border: 1px solid ${({ error }) => (error ? 'red' : '#ccc')};
  border-radius: 8.53px;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  margin-bottom: 16px;
  position: relative;
`;

const InputField = styled.input`
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
      color === "#ffffff" ? "black" : theme.color.grey};
  }
`;
