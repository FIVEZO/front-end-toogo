import React from "react";
// import { useState, useRef, useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { logOff } from "../redux/modules/loginSlice";
import { logout } from "../api/userApi";

type selectForm = {
  position: string;
  isSelectOpen: boolean;
};

function HeaderSelect({ position, isSelectOpen }: selectForm) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectList = ["마이페이지", "쪽지함", "로그아웃"];

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      alert("로그아웃 되었습니다.");
      dispatch(logOff());
      navigate("/");
    },
  });

  const selectListHendler = (index: number) => {
    // 목록을 선택
    switch (selectList[index]) {
      case "마이페이지":
        return navigate("/mypage");
      case "쪽지함":
        return navigate("/chat/main");
      case "로그아웃":
        return logoutMutation.mutate();
      default:
        return;
    }
  };

  return (
    <>
      {isSelectOpen && (
        <StSelectList position={position}>
          {selectList.map((item, index) => {
            return (
              <StLi key={index} onClick={() => selectListHendler(index)}>
                {item}
              </StLi>
            );
          })}
        </StSelectList>
      )}
    </>
  );
}

export default HeaderSelect;

const StSelectList = styled.ul<{ position: string }>`
  box-shadow: 3px 0px 15px #c1c1c1;
  border-radius: 16px;
  top: 70px;
  right: 0px;
  width: 243px;
  height: 162px;
  margin: 0%;
  padding-left: 0; // ul 밑의 li부분은 기본적으로 padding-left값이 있어 이것을 초기화 해줌
  list-style: none; // 목록 마커 삭제
  position: ${(props) => props.position};
  z-index: 999;
`;

const StLi = styled.li`
  border-bottom: 1px solid #cfced7;
  height: 54px;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: white;
  font-size: 14px;
  font-weight: 500;
  padding-left: 15px;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
  &:last-child {
    color: red;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-bottom: none;
  }
`;
