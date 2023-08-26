import { styled } from "styled-components";

type ChatMessageProps = {
    message: string;
    sentTime: string;
    isSender: boolean;
  };

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, sentTime, isSender }) => {
    const MessageContainer = isSender ? StSendMessageBox : StReceiveMessageBox;
  
    return (
      <MessageContainer>
        <StSendMessage>
          <div className="speech-bubble">
            <div className="text">{message}</div>
            <div className="time">{sentTime}</div>
          </div>
        </StSendMessage>
      </MessageContainer>
    );
  };

  const StReceiveMessageBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const StReceiveMessage = styled.div`
  margin-top: 32px;
  .speech-bubble {
    max-width: 453px;
    min-height: 40px;
    position: relative;
    background: white;
    border-radius: 0.4em;
    left: 15px;
    padding: 16px;
  }

  .speech-bubble:after {
    content: "";
    position: absolute;
    left: 29px;
    top: 19.5px;
    border: 15px solid transparent;
    border-right-color: white;
    border-left: 0;
    border-top: 0;
    margin-top: -19.5px;
    margin-left: -39px;
  }
  .text {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .time {
    font-size: 14px;
    color: #9a9a9a;
  }
`;

const StSendMessageBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const StSendMessage = styled.div`
  margin-top: 32px;
  color: white;
  .speech-bubble {
    max-width: 453px;
    min-height: 40px;
    position: relative;
    background: #2bde97;
    border-radius: 0.4em;
    padding: 16px;
  }

  .speech-bubble:after {
    content: "";
    position: absolute;
    right: 29px;
    top: 19.5px;
    border: 15px solid transparent;
    border-left-color: #2bde97;
    border-right: 0;
    border-top: 0;
    margin-top: -19.5px;
    margin-right: -39px;
  }

  .text {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .time {
    font-size: 14px;
  }
`;