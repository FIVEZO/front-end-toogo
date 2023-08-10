// src/components/ChatRoom.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';

interface Message {
  id: number;
  text: string;
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

    
    
    
    const ChatRoom: React.FC = () => {
      const [messages, setMessages] = useState<string[]>([]);
      const [messageInput, setMessageInput] = useState<string>('');
      const [socket, setSocket] = useState<any>(null);
    
      useEffect(() => {
        // 웹소켓 연결 및 설정
        const accessToken = getCookie("access_token");
        const refreshToken = getCookie("refresh_token");
        const socket = new SockJS(`${process.env.REACT_APP_SERVER_URL}/ws-stomp`);
        
        // 헤더에 accessToken과 refreshToken을 실어서 연결
        socket.onopen = () => {
          socket.send(JSON.stringify({ accessToken, refreshToken }));
        };
    
        // 메시지 수신 처리
        socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, message]);
        };
    
        setSocket(socket);
    
        return () => {
          socket.close(); // 컴포넌트가 언마운트될 때 웹소켓 연결 해제
        };
      }, []);
    
      const sendMessage = () => {
        if (socket && messageInput.trim() !== '') {
          const message = {
            text: messageInput,
            timestamp: new Date().toISOString(),
          };
          socket.send(JSON.stringify(message));
          setMessageInput('');
        }
      };
    
      return (
        <ChatContainer>
          <ChatMessages>
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </ChatMessages>
          <ChatInput
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <ChatButton onClick={sendMessage}>Send</ChatButton>
        </ChatContainer>
      );
    };
    
    export default ChatRoom;
    
// 스타일 컴포넌트를 사용하여 스타일링
const ChatContainer = styled.div`
width: 400px;
margin: 0 auto;
padding: 20px;
border: 1px solid #ccc;
`;

const ChatMessages = styled.div`
height: 300px;
overflow: auto;
border: 1px solid #ccc;
padding: 10px;
`;

const ChatInput = styled.input`
width: 100%;
padding: 5px;
margin-top: 10px;
`;

const ChatButton = styled.button`
margin-top: 10px;
`;






// const ChatRoom: React.FC = () => {
  
//   const roomId = useParams().id;
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [messageInput, handleMessageChange, resetMessage] = useInput();
//   const accessToken = getCookie("access_token");
//   const refreshToken = getCookie("refresh_token");
//   // /ws-stomp/${roomId}
//   const socket = new SockJS(`${process.env.REACT_APP_SERVER_URL}/ws-stomp`); // WebSocket 연결
// console.log("socket", socket)

//   // const socket = new SockJS(`${process.env.REACT_APP_SERVER_URL}/ws-stomp`, null, 
//   // {
//   //   headers: {
//   //     Accept: "*/*",
//   //     accessToken : `${accessToken}`,
//   //     refreshToken : `${refreshToken}`
//   //   },
//   // });
//   // const socket = new WebSocket(`${process.env.REACT_APP_SERVER_URL}/ws-stomp/${roomId}`, [
//   //   'Authorization: ' + accessToken,
//   //   'Refresh-Token: ' + refreshToken,
//   // ]);

//   console.log("socket", socket)
//   useEffect(() => {
//     socket.onopen = () => {
//       socket.send(
//         JSON.stringify({
//           type: 'SET_HEADERS',
//           headers: {
//             accessToken: accessToken,
//             refreshToken: refreshToken,
//           },
//         })
//       );
//       console.log('WebSocket 연결됨');
//     };

//     socket.onmessage = event => {
//       const newMessage = JSON.parse(event.data);
//       setMessages(prevMessages => [...prevMessages, newMessage]);
//     };

//     socket.onclose = () => {
//       console.log('WebSocket 연결 닫힘');
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   const handleSendMessage = () => {
//     if (messageInput.trim() !== '') {
//       const newMessage: Message = {
//         id: Date.now(),
//         text: messageInput,
//       };
//       socket.send(JSON.stringify(newMessage));
//       resetMessage();
//     }
//   };

//   return (
//     <ChatRoomContainer>
//       <h2>Chat Room</h2>
//       <div>
//         {messages.map(message => (
//           <MessageContainer key={message.id}>{message.text}</MessageContainer>
//         ))}
//       </div>
//       <div>
//         <input
//           type="text"
//           value={messageInput}
//           onChange={handleMessageChange}
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </ChatRoomContainer>

//   );
// };

// export default ChatRoom;


// const ChatRoomContainer = styled.div`
//   max-width: 400px;
//   margin: 0 auto;
//   padding: 20px;
//   background-color: #f5f5f5;
//   border-radius: 5px;
// `;

// const MessageContainer = styled.div`
//   background-color: white;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   padding: 10px;
//   margin: 5px 0;

//   &:last-child {
//     margin-bottom: 0;
//   }
// `;