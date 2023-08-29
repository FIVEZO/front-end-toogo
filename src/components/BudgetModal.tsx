import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import BugetMessege from './BugetMessege'
import { useQuery } from 'react-query'
import { getNotification } from '../api/api'
import { NotificationFormValues } from '../types/posts'
import { EventSourcePolyfill } from "event-source-polyfill";
import { getCookie } from '../utils/cookieUtils'
import SseAlert from './SseAlert'

type selectForm = {
  position: string,
  budgetOpen: boolean
}



function BudgetModal({position, budgetOpen}:selectForm) {

const [eventDataList, setEventDataList] = useState<any[]>([]); // eventData를 저장할 상태
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
  const [showData, setShowData] = useState(true);
  return (

    <>
      {budgetOpen && (
     <ModalRayout position={position}>
      <BoxUpper>
        <BoxUpperText>
            새소식
          </BoxUpperText>
          <BoxUpperNum>
            0
          </BoxUpperNum>
      </BoxUpper>
     
      
      {showData && eventDataList.map((item: NotificationFormValues, index: number) => (
  <BugetMessege key={index} items={item} />
))}

  
   </ModalRayout>
      )}
    </>
  )
      }

const ModalRayout = styled.div<{ position: string }>`
  width: 438px;
  height: 189px;
  top: 70px;
  right: 0px;
  flex-grow: 0;
  overflow: hidden;
  object-fit: contain;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.17);
  position: ${(props) => props.position};

`;

const BoxUpper = styled.div`
  width: 440px;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 12px 16px;
  border-bottom: solid 1px #f4f5f6;
  background-color: #fff;

`;

const BoxUpperText = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: left;
  color: #484848;
  margin-right: 8px;

`
const BoxUpperNum = styled.div`
   width: 44px;
  height: 20px;
  flex-grow: 0;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  text-align: left;
 
  color: #9a9a9a;
`
export default BudgetModal;
