import { useEffect, useRef, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { getCookie } from "../utils/cookieUtils";

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