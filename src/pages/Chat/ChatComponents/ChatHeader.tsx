import { useEffect, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { styled } from "styled-components";
import { Avatar } from "@mui/material";
import { selectedEmoticon } from "../../../utils/emoticonUtils";

//-------------------------------------------채팅 헤더
interface ChatHeaderProps {
  modal: boolean;
  chatRoomIn: any;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteChat: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  modal,
  chatRoomIn,
  setModal,
  deleteChat,
}) => {
  const node = useRef<HTMLDivElement | null>(null); // 창의 바깥부분을 클릭하였을때 창이 사라짐
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (modal && node.current && !node.current.contains(e.target as Node))
        setModal(false);
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [modal]);

  return (
    <StChatReceiver>
      <Avatar alt="Avatar" sx={{ width: 50, height: 50 }}>
        {selectedEmoticon(chatRoomIn.emoticon)}
      </Avatar>
      <StName>{chatRoomIn.roomName}</StName>
      <div ref={node}>
        <StHiDotsVertical onClick={() => setModal((pre) => !pre)} />
        {modal && <StModal onClick={deleteChat}>채팅방 나가기</StModal>}
      </div>
    </StChatReceiver>
  );
};

const StChatReceiver = styled.div`
  background-color: #f4f5f6;
  font-size: 24px;
  height: 105px;
  border-bottom: 1px solid #dddce3;
  padding: 24px;
  display: flex;
  align-items: center;
  position: relative;
`;
const StName = styled.span`
  margin: 0 auto 0 29px;
`;
const StHiDotsVertical = styled(HiDotsVertical)`
  cursor: pointer;
`;
const StModal = styled.div`
  width: 243px;
  height: 51px;
  border-radius: 8px;
  position: absolute;
  background-color: white;
  left: 450px;
  top: 90px;
  padding: 17.5px 24px;
  box-shadow: 3px 0px 15px #c1c1c1;
  font-size: 16px;
  cursor: pointer;
`;
