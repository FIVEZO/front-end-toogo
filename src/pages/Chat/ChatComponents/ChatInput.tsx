import { styled } from "styled-components";
import sendButton from "../../../img/sendButton.jpg";

interface ChatInputProps {
    sendChat: () => void;
    chat: string;
    setChat: React.Dispatch<React.SetStateAction<string>>;
  }
  
export  const ChatInput: React.FC<ChatInputProps> = ({ sendChat, chat, setChat }) => {
    return (
      <StInputContainer>
        <StChatInput
          type="text"
          placeholder="메세지를 입력해주세요"
          onChange={(e) => setChat(e.target.value)}
          value={chat}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendChat();
          }}
        />
        <StSendButton type="button" onClick={sendChat}>
          <img src={sendButton} />
        </StSendButton>
      </StInputContainer>
    );
  };

  const StInputContainer = styled.div`
  position: relative;
`;

const StChatInput = styled.input`
  width: 659px;
  height: 60px;
  margin: 35px 28px;
  border: none;
  border-radius: 8px;
  padding: 18px 60px 18px 16px;
`;

const StSendButton = styled.button`
  position: absolute;
  border: none;
  background-color: white;
  right: 40px;
  top: 50px;
`;