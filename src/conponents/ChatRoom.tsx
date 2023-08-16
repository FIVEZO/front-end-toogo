
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import * as StompJs from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import { IMessage, Client, messageCallbackType} from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { styled } from 'styled-components';
import sendButton from '../img/sendButton.jpg'

type ReceiveData = {
  message:string;
}
export interface disConnectHandles {
  disConnect: () => void;
}
interface ChatRoomProps {
  roomId?: string|undefined;
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

    export const ChatRoom = forwardRef<disConnectHandles ,ChatRoomProps>((roomId, ref) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chats, setChatList] = useState<any>([]);
  const [chat, setChat] = useState<string>("");
  const [client, changeClient] = useState<StompJs.Client>();
  const accessToken = getCookie("access_token");
  const refreshToken = getCookie("refresh_token");
  const nickname = getCookie("nickname");


  
  const connect = () => {
    // 소켓 연결
    try {
  const clientdata = new Client({
    brokerURL: `ws://${process.env.REACT_APP_CHAT_URL}/ws-stomp`,
    connectHeaders: {
      accessToken: accessToken || "",
      refreshToken: refreshToken || "",
    },
    debug: function (str) {
      console.log("debug",str);
    },
    reconnectDelay: 5000, // 자동 재 연결
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });


  clientdata.onConnect = function () {
    console.log("Connect 구독");
    clientdata.subscribe(`/sub/chat/room/${roomId}`, 
    function (message : IMessage) {
      
      if (message.body) {
        let msg = JSON.parse(message.body) as ReceiveData;
        console.log("msg",msg)
        setChatList((chats: any) => [...chats, msg]);
      }
    } as messageCallbackType);
  };
  clientdata.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};
  clientdata.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

  clientdata.activate(); // 클라이언트 활성화
  changeClient(clientdata); // 클라이언트 갱신
} catch (err) {
  console.log(err);
}
};
const disConnect = () => {
  // 연결 끊기
  console.log("asd")
  if (client) {
    client.deactivate();
  }else{
    return;
  }
};

const sendChat = () => {
  console.log("Send Message", chat);
  if (chat === "") {
    return;
  }
  console.log(1);
  if(client === undefined)
    return;
    console.log("2", chat);
  client.publish({ //메세지 전송
    destination: "/pub/message",
    body: JSON.stringify({
      type: "",
      sender: nickname,
      roomId: roomId,
      message: chat,
    }),
  });

  setChat("");
};

useEffect(() => {
  // 최초 렌더링 시 , 웹소켓에 연결
  // 우리는 사용자가 방에 입장하자마자 연결 시켜주어야 하기 때문에,,
  connect();

  return () => disConnect();
}, []);

const scrollToBottom = () => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
};

useEffect(() => {
  scrollToBottom();
}, [chats]);

useImperativeHandle(ref, () => ({
  // 부모 컴포넌트에서 사용할 함수를 선언
  disConnect
}))
    

  return (
    <Stlayout>
    <StChatContainer ref={chatContainerRef}>
      
      {!!chats && chats.map((e:any,i:number) => 
        e.sender == nickname? // 메세지를 보낸사람 확인해서 채팅창 구분
        <StSendMessageBox key={i}><StSendMessage   ><div className='speech-bubble'><div className='text'>{e.message}</div><div className='time'>12:34 AM</div></div></StSendMessage></StSendMessageBox>
      :
      <StReceiveMessageBox key={i}><StReceiveMessage ><div className='speech-bubble'>{e.message}</div><div>12:34 AM</div></StReceiveMessage></StReceiveMessageBox>
      )}
      </StChatContainer>
      <StInputContainer>
      <StChatInput type='text' placeholder='메세지를 입력해주세요' onChange={(e) => setChat(e.target.value)} value={chat} onKeyPress={(e) => {
        if(e.key === 'Enter')
          sendChat();
      }}/>
      <StSendButton type="button" onClick={sendChat}><img src={sendButton}/></StSendButton>
      </StInputContainer>
      </Stlayout>
  )
})

const Stlayout =styled.div`
width: 716px;
  background-color: #F4F5F6;
`

const StChatContainer = styled.div`
  width: 716px;
  height: 551px;
  overflow: auto;
  padding: 8px 24px 5px;
`
const StInputContainer = styled.div`
position: relative;
`

const StChatInput = styled.input`
  width:659px;
  height:60px;
  margin: 35px 28px;
  border:none;
  border-radius:8px;
  padding: 18px 60px 18px 16px;
`

const StSendButton =styled.button`
position: absolute;
border:none;
background-color: white;
right:40px;
top: 50px;
`
const StReceiveMessageBox =styled.div`
display: flex;
flex-direction: row;
`

const StReceiveMessage= styled.div`
margin-top:32px;
  .speech-bubble {
  max-width: 453px;
  min-height:40px;
	position: relative;
	background: white;
	border-radius: .4em;
  left: 15px;
  padding:16px;
}

.speech-bubble:after {
	content: '';
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
`

const StSendMessageBox =styled.div`
display: flex;
flex-direction: row-reverse;
`
const StSendMessage= styled.div`
margin-top:32px;
color: white;
.speech-bubble {
  max-width: 453px;
  min-height:40px;
	position: relative;
	background: #2BDE97;
	border-radius: .4em;
  padding:16px;
}

.speech-bubble:after {
	content: '';
	position: absolute;
	right: 29px;
	top: 19.5px;
	border: 15px solid transparent;
	border-left-color: #2BDE97;
	border-right: 0;
	border-top: 0;
	margin-top: -19.5px;
	margin-right: -39px;
}

.text{
  font-size: 16px;
  margin-bottom: 5px;
}

.time{
  font-size: 14px;
}
`



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