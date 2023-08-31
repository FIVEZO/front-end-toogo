import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { ReactComponent as Winking1 } from "../../../components/assets/emoticon/winking1.svg";
import { ReactComponent as Winking2 } from "../../../components/assets/emoticon/winking2.svg";
import { ReactComponent as Winking3 } from "../../../components/assets/emoticon/winking3.svg";
import { ReactComponent as Winking4 } from "../../../components/assets/emoticon/winking4.svg";
import { ReactComponent as Winking5 } from "../../../components/assets/emoticon/winking5.svg";
interface EmoticonSelectionModalProps {
  open: boolean;
  onClose: () => void;
  updateEmoticon: (emoticonValue: string) => void;
  selectedEmoticon: string;
}

const EmoticonSelectionModal: React.FC<EmoticonSelectionModalProps> = ({
  open,
  onClose,
  updateEmoticon,
  selectedEmoticon,
}) => {
  const emoticonOptions = [
    { id: "1", component: Winking1, label: "행복" },
    { id: "2", component: Winking2, label: "언짢" },
    { id: "3", component: Winking3, label: "심심" },
    { id: "4", component: Winking4, label: "졸림" },
    { id: "5", component: Winking5, label: "놀람" },
  ];
  if (!open) return null;

  return (
    <EmoticonModalOverlay onClick={onClose}>
      <EmoticonModalContent onClick={(e) => e.stopPropagation()}>
        <Emoticons>
          {emoticonOptions.map(
            ({ id, component: EmoticonComponent, label }) => (
              <Emoticon
                key={id}
                onClick={() => updateEmoticon(id)}
                style={{
                  color: selectedEmoticon === id ? "#2bde97" : "black",
                }}
              >
                <EmoticonComponent />
                {label}
              </Emoticon>
            )
          )}
        </Emoticons>
        <EmoticonModalCloseButton onClick={onClose}>
          <MdClose size="22px" />
        </EmoticonModalCloseButton>
      </EmoticonModalContent>
    </EmoticonModalOverlay>
  );
};

// Styles...

export default EmoticonSelectionModal;

const EmoticonModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const EmoticonModalContent = styled.div`
  width: 620px;
  height: 192px;
  border-radius: 4px;
  border: 1px solid #cfced7;
  background-color: white;
  padding: 0;
  display: flex;
  position: relative;
`;

const EmoticonModalCloseButton = styled.button`
  position: absolute;
  border: none;
  background-color: white;
  top: 14px;
  right: 24.76px;
  padding: 0;
  width: 14.24px;
  height: 14.24px;
`;

const Emoticons = styled.div`
  width: 557px;
  height: 107px;
  margin: 53px 32px 32px 31px;
  gap: 58px;
  display: flex;
`;

const Emoticon = styled.div`
  width: 65px;
  height: 107px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  gap: 24px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0px;
  text-align: center;
  cursor: pointer;
`;
