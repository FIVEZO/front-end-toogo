import React, { ChangeEvent } from 'react'
import { styled } from 'styled-components';

type InputProps = {
    type:string,
    placeholder:string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}


export const Input = ({type , placeholder, onChange, value }:InputProps) => {
  return (
    <StInputBox>
    <StInput type={type} placeholder={placeholder} value={value} onChange={onChange}/>
    </StInputBox>
  )
}

const StInputBox = styled.div`
  width: 384px;
  height: 46px;
  border: 1px solid #ccc;
  border-radius: 8.53px;
  display: inline-flex;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
`;

const StInput = styled.input`
  margin-left: 16px;
  font-size: 16px;
  color: #000000;
  border: none;
  outline: none;
  flex: 1;
  &::placeholder {
    color: #dddce3;
  }
`;