import React from "react";
import styled from "styled-components";

interface AlertModalProps {
  text: string;
  onButton1?: any;
  onButton2: any;
}

const textHandler = (text: AlertModalProps["text"]) => {
  switch (text) {
    case "CancelMembership":
      return [
        "정말 탈퇴하시겠습니까?",
        "탈퇴하면 모든 정보들이 삭제됩니다.",
        "탈퇴",
        "취소",
      ];
    case "ChangePassword":
      return [
        "비밀번호 재설정 완료!",
        "재설정한 비밀번호로 다시 로그인 해주세요",
        "",
        "확인",
      ];
    case "Signup":
      return ["회원가입이 완료되었습니다.", "", "", "확인"];
    case "DeletePost":
      return [
        "글을 삭제하시겠습니까?",
        "삭제한 글은 복구가 되지 않습니다.",
        "취소",
        "삭제",
      ];
    case "CancelPost":
      return [
        "글 작성을 취소하시겠습니까?",
        "작성한 내용은 복구가 되지 않습니다.",
        "취소",
        "나가기",
      ];
    default:
      return ``;
  }
};

export const AlertModal: React.FC<AlertModalProps> = ({
  text,
  onButton1,
  onButton2,
}) => {
  const PropsText = textHandler(text);
  return (
    <Overlay onClick={onButton1}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Stdiv1>{PropsText[0]}</Stdiv1>
        <Stdiv2>{PropsText[1]}</Stdiv2>
        <Buttons>
          {onButton1 ? (
            <StButton1 onClick={onButton1}>{PropsText[2]}</StButton1>
          ) : null}
          <StButton2 onClick={onButton2}>{PropsText[3]}</StButton2>
        </Buttons>
      </Content>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Content = styled.div`
  width: 420px;
  height: 256px;
  border-radius: 8px;
  border: 1px solid #cfced7;
  background-color: white;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Stdiv1 = styled.div`
  /* width: 190px; */
  height: 32px;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 56px;
`;

const Stdiv2 = styled.div`
  /* width: 230px; */
  height: 26px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 12px;
`;

const Buttons = styled.div`
  width: 265px;
  height: 48px;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  margin-top: 32px;
`;

const StButton1 = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.20000000298023224px;
  background-color: white;
  color: #9a9a9a;
  border: solid 1px #9a9a9a;
  border-radius: 8px;
`;

const StButton2 = styled.button`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.20000000298023224px;
  background-color: #2bde97;
  color: white;
  border: none;
  border-radius: 8px;
`;
