import { useEffect, useRef, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { getCookie } from "../utils/cookieUtils";
import { useRecoilState } from "recoil";
import { eventDataListState } from "../recoil/Alert";


const SseAlert = () => {
  const [eventDataList, setEventDataList] = useRecoilState(eventDataListState); // eventData를 저장할 상태
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
      setEventDataList(eventDataList => [...eventDataList, eventData]);
    });

    sse.current.addEventListener("addComment", (event: any) => {
      const eventData = JSON.parse(event.data);
      console.log("댓글을 받았습니다:", eventData);
      setEventDataList(eventDataList => [...eventDataList, eventData]); // 상태 업데이트

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

console.log("eventDataList", eventDataList)
}
  export default SseAlert;