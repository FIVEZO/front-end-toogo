import React, { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import { IMessage, Client, messageCallbackType} from '@stomp/stompjs';
import { styled } from 'styled-components';
import sendButton from '../img/sendButton.jpg'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ChatRoomForm } from '../pages/Chat';
import { deleteChatRoom, fetchChatMessage, fetchChatRoom } from '../api/chatApi';
import Spinner from './Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { HiDotsVertical } from 'react-icons/hi';
import 프로필 from '../img/프로필.jpg'
import { countryImages } from '../img/countryImages';

type ReceiveData = {
  message: string;
};
interface disConnectHandles {
  disConnect: () => void;
}
interface ChatRoomProps {
  roomId?: string | undefined;
}

function getCookie(cookieName: string) {
  var cookieValue = null;
  if (document.cookie) {
    var array = document.cookie.split(escape(cookieName) + "=");
    if (array.length >= 2) {
      var arraySub = array[1].split(";");
      cookieValue = unescape(arraySub[0]);
    }
  }
  return cookieValue;
}

export const ChatRoom = () => {
  const roomCode = useParams().id;
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chats, setChatList] = useState<any>([]);
  const [chat, setChat] = useState<string>("");
  const [beforeChat, setBeforeChat] = useState<any>([]);
  const [client, changeClient] = useState<StompJs.Client>();
  const accessToken = getCookie("access_token");
  const refreshToken = getCookie("refresh_token");
  const nickname = getCookie("nickname");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const date = new Date();
  const nowHours = (String(date.getHours()).padStart(2, '0')) + ":" + (String(date.getMinutes()).padStart(2, '0'));
  const [modal, setModal]= useState<boolean>(false)
  const { isLoading: isLoading1, isError:isError1, data: chatMessages } = useQuery<ChatRoomForm[]>(['chatMessage',roomCode], ()=>fetchChatMessage(roomCode!));
  const { isLoading: isLoading2, isError:isError2, data: chatRoomIn } = useQuery(['chatroom',roomCode], ()=>fetchChatRoom(roomCode!));
  const countryImage = countryImages[chatRoomIn?.country] || countryImages['한국']

// console.log("chatMessages", chatMessages)

  // 채팅방 삭제하기
  const deleteChatMutation = useMutation((id: number) => deleteChatRoom(id), {
    onSuccess: () => {
      navigate(`/chat/main`);
      setModal(false);
      queryClient.invalidateQueries("chatRoomlist");
    },
  });

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

  const deleteChat = () => {
    deleteChatMutation.mutate(chatRoomIn.id);
  };
  const connect = () => {
    // 소켓 연결
    try {
      const clientdata = new Client({
        brokerURL: `wss://${process.env.REACT_APP_CHAT_URL}/ws-stomp`,
        connectHeaders: {
          accessToken: accessToken || "",
          refreshToken: refreshToken || "",
        },
        debug: function (str) {
          console.log("debug", str);
        },
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      clientdata.onConnect = function () {
        console.log("Connect 구독");
        clientdata.subscribe(`/sub/chat/room/${roomCode}`, function (
          message: IMessage
        ) {
          if (message.body) {
            let msg = JSON.parse(message.body) as ReceiveData;
            console.log("msg", msg);
            setChatList((chats: any) => [...chats, msg]);
          }
        } as messageCallbackType);
      };
      clientdata.onWebSocketError = (error) => {
        console.error("Error with websocket", error);
      };
      clientdata.onStompError = (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      };

      clientdata.activate(); // 클라이언트 활성화
      changeClient(clientdata); // 클라이언트 갱신
    } catch (err) {
      console.log(err);
    }
  };
  const disConnect = () => {
    // 연결 끊기
    console.log("asd");
    if (client) {
      setChatList([]);
      client.deactivate();
    } else {
      return;
    }
  };

  const sendChat = () => {
    if (chat === "") {
      return;
    }
    console.log(1);
    if (client === undefined) return;
    client.publish({
      //메세지 전송
      destination: "/pub/message",
      body: JSON.stringify({
        sentTime: nowHours,
        sender: nickname,
        roomId: roomCode,
        message: chat,
      }),
    });

    setChat("");
  };

  useEffect(() => {
    setBeforeChat(chatMessages);
    connect();
    setChatList([]);
    queryClient.invalidateQueries("chatroom");
    return () => {
      disConnect(); // 웹소켓 연결 해제
      setBeforeChat([]); // beforeChat 상태 초기화
    };
  }, [roomCode]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  if (isLoading1 || isLoading2) {
    return <Spinner />;
  }

  if (isError1 || isError2) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  return (
    <Stlayout>
      <StChatReceiver>
        <StProfileImg src={프로필} alt="프로필사진" />
        <StName>{chatRoomIn.roomName}</StName>
        <div ref={node}>
          <StHiDotsVertical onClick={() => setModal((pre) => !pre)} />
          {modal && <StModal onClick={deleteChat}>채팅방 나가기</StModal>}
        </div>
      </StChatReceiver>
      <StPost></StPost>
      <StChatContainer ref={chatContainerRef}>
        {!!beforeChat &&
          beforeChat.map((e: any, i: number) =>
            e.sender == nickname ? ( // 메세지를 보낸사람 확인해서 채팅창 구분
              <StSendMessageBox key={i}>
                <StSendMessage>
                  <div className="speech-bubble">
                    <div className="text">{e.message}</div>
                    <div className="time">{e.sentTime}</div>
                  </div>
                </StSendMessage>
              </StSendMessageBox>
            ) : (
              <StReceiveMessageBox key={i}>
                <StReceiveMessage>
                  <div className="speech-bubble">
                    <div className="text">{e.message}</div>
                    <div className="time">{e.sentTime}</div>
                  </div>
                </StReceiveMessage>
              </StReceiveMessageBox>
            )
          )}

        {!!chats &&
          chats.map((e: any, i: number) =>
            e.sender == nickname ? ( // 메세지를 보낸사람 확인해서 채팅창 구분
              <StSendMessageBox key={i}>
                <StSendMessage>
                  <div className="speech-bubble">
                    <div className="text">{e.message}</div>
                    <div className="time">{e.sentTime}</div>
                  </div>
                </StSendMessage>
              </StSendMessageBox>
            ) : (
              <StReceiveMessageBox key={i}>
                <StReceiveMessage>
                  <div className="speech-bubble">
                    <div className="text">{e.message}</div>
                    <div className="time">{e.sentTime}</div>
                  </div>
                </StReceiveMessage>
              </StReceiveMessageBox>
            )
          )}
      </StChatContainer>
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
    </Stlayout>
  );
};

const Stlayout = styled.div`
  width: 716px;
  background-color: #f4f5f6;
`;
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

const StProfileImg = styled.img``;
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

const StPost = styled.div`
background-color: #F4F5F6;
font-size: 16px;
height:80px;
border-bottom: 1px solid #DDDCE3;
padding:16px 24px;
display: flex;
  align-items: center;
  cursor: pointer;
`

const StCountryImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;

`
const StPostTitle = styled.span`
  font-size:16px;
  margin-left:24px;
 font-weight:700;
`

const StChatContainer = styled.div`
  width: 716px;
  height: 551px;
  overflow: auto;
  padding: 8px 24px 5px;
`;
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

/*
BackEnd Source

// config/WebSocketConfig.java
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocket
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker("/sub");
    config.setApplicationDestinationPrefixes("/pub");
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws-stomp")
            .setAllowedOriginPatterns("*")
            .setAllowedOrigins("*");
  }
}
*/

/**
 * controller/GreetingController.java
 */
/*
import com.example.chattingtest2.domain.chatting.dto.Greeting;
import com.example.chattingtest2.domain.chatting.dto.HelloMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GreetingController {

  @MessageMapping("/chat")
  @SendTo("/sub/chat/room/10")
  public Greeting greeting(HelloMessage message) throws Exception {
    return new Greeting(String.format("%s : %s", message.getSender(), message.getData()));
  }
}
*/

/** dto/HelloMessage.java
 *
 */
/*
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HelloMessage {

  private String type;
  private String sender;
  private String channelId;
  private String data;
}
*/

/**
 * dto/Greeting.java
 */
/*
public class Greeting {

  private String content;

  public Greeting() {
  }

  public Greeting(String content) {
    this.content = content;
  }

  public String getContent() {
    return content;
  }

}
*/
