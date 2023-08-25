import { useEffect, useRef, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

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

  
const SseAlert = () => {
    const [isStarted, setIsStarted] = useState(false);
    const sse = useRef<EventSource>();
    useEffect(() => {

        const accessToken = getCookie("access_token");
        const refreshToken = getCookie("refresh_token");

        const eventSourceInitDict: any = {
            headers: {
                accessToken: accessToken || "",
                refreshToken: refreshToken || "",
            },
        };
        const sse = new EventSourcePolyfill(`${process.env.REACT_APP_SERVER_URL}/api/notification/subscribe`, eventSourceInitDict);
        sse.onopen = (e) => {
            setIsStarted(true);
            console.log("[sse] open", { e });
        };
        sse.addEventListener("sse", (event: any) => {
            const result = JSON.parse(event.data);
            console.log("received:", result);
        });
        sse.onmessage = (event) => {
            console.log("[sse] message", { event });
            if (event.data === "finished") {
                sse?.close();
                return;
            }
        };
        sse.onerror = (err) => {
            console.log("[sse] error", { err });
        };
    });
};
export default SseAlert;