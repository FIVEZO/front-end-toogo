
import React, { useEffect, useState } from 'react'
import * as StompJs from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import { IMessage, Client, messageCallbackType} from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import Header from '../conponents/Header';
import { styled } from 'styled-components';
import sendButton from '../img/sendButton.jpg'

type ReceiveData = {
  message:string;
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
  const [chats, setChatList] = useState<Array<string>>([]);
  const [chat, setChat] = useState<string>("");
  const [client, changeClient] = useState<StompJs.Client>();
  const accessToken = getCookie("access_token");
  const refreshToken = getCookie("refresh_token");
  const roomId = useParams().id;

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
      console.log("message1", message.body);
      
      if (message.body) {
        let msg = JSON.parse(message.body) as ReceiveData;
        console.log("msg",msg)
        setChatList((chats) => [...chats, msg.message]);
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
      roomId: roomId,
      message: chat,
    }),
  });

  setChat("");
};

useEffect(() => {
  // 최초 렌더링 시 , 웹소켓에 연결
  // 우리는 사용자가 방에 입장하자마자 연결 시켜주어야 하기 때문에,,

  console.log(accessToken)
  console.log(refreshToken)
  connect();

  return () => disConnect();
}, []);


  return (
    <Stlayout>
    <StChatContainer>
    
      <div>ChatRoom</div>
      <br/>
      {!!chats && chats.map((e,i) => <div key={i}><label >{e}</label><br/></div>)}
      </StChatContainer>
      <StInputContainer>
      <StChatInput type='text' placeholder='메세지를 입력해주세요' onChange={(e) => setChat(e.target.value)} value={chat} onKeyPress={(e) => {
        if(e.key === 'Enter')
          sendChat();
      }}/>
      <StSendButton type='submit'><img src={sendButton}/></StSendButton>
      </StInputContainer>
      </Stlayout>
  )
}

const Stlayout =styled.div`
width: 716px;
  background-color: #F4F5F6;
`

const StChatContainer = styled.div`
  width: 716px;
  height: 738px;


`
const StInputContainer = styled.div`


`


const StChatInput = styled.input`
  width:659px;
  height:60px;
  margin: 35px 28px;
`

const StSendButton =styled.button`

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