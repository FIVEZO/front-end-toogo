
import React, { useEffect } from 'react'
import * as StompJs from "@stomp/stompjs";

// interface OptionsWithHeaders extends SockJS.Options {
//     headers: {
//         accessToken: string;
//         refreshToken: string;
//     };
//   }

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

    // const accessToken = getCookie("access_token");
    // const refreshToken = getCookie("refresh_token");
    // const sock = new SockJS(`${process.env.REACT_APP_SERVER_URL}/ws-stomp`);

export const ChatRoom = () => {
  const accessToken = getCookie("access_token");
  const refreshToken = getCookie("refresh_token");

  const connect = () => {
    // 소켓 연결
    try {
console.log("hi")
  const clientdata = new StompJs.Client({
    brokerURL: "ws://15.164.230.242/ws-stomp",
    connectHeaders: {
      accessToken: accessToken || "",
      refreshToken: refreshToken || "",
    },
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000, // 자동 재 연결
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
  // clientdata.onConnect = function () {
  //   clientdata.subscribe("/sub/channels/" + roomId, callback);
  // };

  // clientdata.activate(); // 클라이언트 활성화
  // changeClient(clientdata); // 클라이언트 갱신
} catch (err) {
  console.log(err);
}
};
// const disConnect = () => {
//   // 연결 끊기
//   if (client === null) {
//     return;
//   }
//   client.deactivate();
// };

// const callback = function (message) {
//   if (message.body) {
//     let msg = JSON.parse(message.body);
//     setChatList((chats) => [...chats, msg]);
//   }
// };

// const sendChat = () => {
//   if (chat === "") {
//     return;
//   }

//   client.publish({
//     destination: "/pub/chat/" + chatroomId,
//     body: JSON.stringify({
//       type: "",
//       sender: userId,
//       channelId: "1",
//       data: chat,
//     }),
//   });

//   setChat("");
// };

useEffect(() => {
  // 최초 렌더링 시 , 웹소켓에 연결
  // 우리는 사용자가 방에 입장하자마자 연결 시켜주어야 하기 때문에,,
  connect();

  // return () => disConnect();
}, []);


  return (
    <div>ChatRoom</div>
  )
}
