import React, {useEffect, useState} from 'react';
// 기본적으로 제공되는 eventsource 가 아닌 추가로 설치한 eventsource 를 사용
const EventSource = require('eventsource');


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

function SeeAlert() {
    // Server Sent Event 로 가져온 data 를 화면에 보여주기 위한 state 변수
    const [sseDate, setSseDate] = useState();
    const [sseHeader, setSseHeader] = useState();

    useEffect(() => {
        // Server Sent Event 요청시 header 에 auth-user 를 설정하는 부분
         const accessToken = getCookie("accessToken");
        const eventSourceInitDict = {
            headers: {
                Authorization: `${accessToken}`,
            },
        };
        // EventSource 로 Server Sent Event 를 호출하는 부분
        const eventSource = new EventSource(`${process.env.REACT_APP_SERVER_URL}/api/notification/subscribe`, eventSourceInitDict);

        // EventSource 로 data 를 받아서 처리하는 event listener 설정
        eventSource.addEventListener('sseData', async function (event: MessageEvent) {
            const data = JSON.parse(event.data);
            setSseHeader(data['auth-user']);
            setSseDate(data['date']);
        });

        // Server Sent Event 가 종료되는 경우 연결된 EventSource 를 close 하는 부분
        eventSource.addEventListener('close', () => eventSource.close());
        return () => eventSource.close();
    }, [])
    return (
        <div>
            {/*/
            Server Sent Event 로 가져온 데이터를 화면에 보여주는 부분
            /*/}
            <center>
                <h5>header : {sseHeader}</h5>
                <h5>date : {sseDate}</h5>
            </center>
        </div>
    );
}

export default SeeAlert;