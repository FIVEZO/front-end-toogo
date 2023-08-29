import React, { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import { IMessage, Client, messageCallbackType } from "@stomp/stompjs";
import { styled } from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ChatRoomForm } from "../Chat";
import {
  deleteChatRoom,
  fetchChatMessage,
  fetchChatRoom,
} from "../../../api/chatApi";
import Spinner from "../../../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { ChatMessage } from "./ChatMessage";
import { getCookie } from "../../../utils/cookieUtils";
import { ChatInput } from "./ChatInput";
import { ChatPost } from "./ChatPost";
import { ChatHeader } from "./ChatHeader";
import LoadingAndError from "../../../components/LoadingAndError";

type ReceiveData = {
  message: string;
};

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

  const formatTime = () => {
    const dateObject = new Date();
    const formattedTime = dateObject.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    return formattedTime;
};
  const [modal, setModal] = useState<boolean>(false);


  const {
    isLoading: isLoading1,
    isError: isError1,
    data: chatMessages,
  } = useQuery<ChatRoomForm[]>(["chatMessage", roomCode], () => fetchChatMessage(roomCode!),{
    refetchOnWindowFocus: false,
    })

  const {
    isLoading: isLoading2,
    isError: isError2,
    data: chatRoomIn,
  } = useQuery(["chatroom", roomCode], () => fetchChatRoom(roomCode!));

  // 채팅방 삭제하기
  const deleteChatMutation = useMutation((id: number) => deleteChatRoom(id), {
    onSuccess: () => {
      navigate(`/chat/main`);
      setModal(false);
      queryClient.invalidateQueries("chatRoomlist");
    },
  });

  const deleteChat = () => {
    deleteChatMutation.mutate(chatRoomIn.id);
  };

  const connect = () => {
    // 소켓 연결
    try {
      const clientdata = new Client({
        brokerURL: `${process.env.REACT_APP_CHAT_URL}/ws-stomp`,
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
        sentTime: formatTime(),
        sender: nickname,
        roomId: roomCode,
        message: chat,
      }),
    });

    setChat("");
  };

  useEffect(() => {
    queryClient.invalidateQueries("chatroom");
    setBeforeChat(chatMessages)
    connect();
    setChatList([]);
   
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
    return <Spinner/>;
  }

  if (isError1 || isError2) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  return (
    <div>
    {/* <LoadingAndError isLoading={isLoading1 || isLoading2} isError={isError1 || isError2} /> */}
    <Stlayout>
      <ChatHeader
        modal={modal}
        chatRoomIn={chatRoomIn}
        setModal={setModal}
        deleteChat={deleteChat}
      />
      <ChatPost chatRoomIn={chatRoomIn} navigate={navigate} />
      {/* 채팅 컴포넌트 사용 */}
      <StChatContainer ref={chatContainerRef}>
        {!!chatMessages &&
          chatMessages.map((e: any, i: number) => (
            <ChatMessage
              key={i}
              message={e.message}
              sentTime={e.sentTime}
              isSender={e.sender === nickname}
            />
          ))}
        {!!chats &&
          chats.map((e: any, i: number) => (
            <ChatMessage
              key={i}
              message={e.message}
              sentTime={e.sentTime}
              isSender={e.sender === nickname}
            />
          ))}
      </StChatContainer>
      <ChatInput sendChat={sendChat} chat={chat} setChat={setChat} />
    </Stlayout>
    </div>
  );
};

const Stlayout = styled.div`
  width: 716px;
  background-color: #f4f5f6;
`;

const StChatContainer = styled.div`
  width: 716px;
  height: 551px;
  overflow: auto;
  padding: 8px 24px 5px;
`;
