import { useEffect, useRef, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { getCookie } from "../utils/cookieUtils";
import { getNotification } from "../api/api";
import React from "react";

const SseAlert = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [isStarted, setIsStarted] = useState(false);
    const sse = useRef<EventSourcePolyfill | null>(null);
  
    useEffect(() => {
      const accessToken = getCookie("access_token");
      const refreshToken = getCookie("refresh_token");
  
      const eventSourceInitDict: any = {
        headers: {
          accessToken: accessToken || "",
          refreshToken: refreshToken || "",
        },
      };
  
      sse.current = new EventSourcePolyfill(
        `${process.env.REACT_APP_SERVER_URL}/api/notification/subscribe`,
        eventSourceInitDict
      );
  
      sse.current.onopen = (e) => {
        setIsStarted(true);
        console.log("[sse] 연결이 열렸습니다", { e });
      };
  
      sse.current.addEventListener("addMessage", (event: any) => {
        const eventData = JSON.parse(event.data);
        console.log("메시지를 받았습니다:", eventData);
     
      });
  
      sse.current.addEventListener("addComment", (event: any) => {
        const eventData = JSON.parse(event.data);
        console.log("댓글을 받았습니다:", eventData);
        // setMessages((prevMessages: any[]) => [...prevMessages, eventData]);

      });
  
      sse.current.onerror = (err) => {
        console.log("[sse] 에러 발생", { err });
      };
  
      // 컴포넌트가 언마운트될 때 SSE 연결을 해제합니다.
      return () => {
           if (sse.current) {
          sse.current.close();
        }
      };
    }, []);
  
    return null; // 컴포넌트가 화면에 보이지 않도록 null을 반환합니다.
  };
  
  export default SseAlert;