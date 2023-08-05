import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

const Sockjs: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  // SockJS 클라이언트 인스턴스 생성
  const sock = new SockJS(`${process.env.REACT_APP_SERVER_URL}/message`); // 서버 주소에 맞게 변경

  useEffect(() => {
    // 메시지 수신 핸들러 등록
    sock.onmessage = (e: MessageEvent) => {
      const newMessage = e.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // 클린업
    return () => {
      sock.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      sock.send(inputValue);
      setInputValue('');
    }
  };

  return (
    <div>
      <h2>채팅</h2>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Sockjs;
