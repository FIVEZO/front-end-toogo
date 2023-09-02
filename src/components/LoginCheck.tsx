import React from "react";
import { styled } from "styled-components";

export const LoginCheck = () => {
  return (
    <LoginLabel>
      <InputCheck type="checkbox" />
      <LoginLabel2>로그인 상태 유지</LoginLabel2>
    </LoginLabel>
  );
};

const LoginLabel = styled.div`
  height: 49.1px;
  flex-grow: 0;
  padding: 0 251px 25.1px 0;
  display: flex;
`;

const InputCheck = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 7px;
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 2px;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgb(221,220,227)' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 150% 150%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #00ce7c;
  }
`;

const LoginLabel2 = styled.div`
  margin-top: 4px;
`;
