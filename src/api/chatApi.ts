import axios from "axios";
import { createChat } from "../types/posts";

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

  
  export const chatInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
  });
  
  chatInstance.interceptors.request.use(
    function (config) {
      // 쿠키에서 토큰 값 가져오기
      const accessToken = getCookie("access_token");
      const refreshToken = getCookie("refresh_token");
  
      // 토큰이 존재하면 헤더에 담아서 요청 보내기
      if (accessToken && refreshToken) {
        config.headers.accessToken = `${accessToken}`;
        config.headers.refreshToken = `${refreshToken}`;
      }
  
      console.log("요청 완료", config)
      return config;
    },
    function (error) {
      console.log("요청 에러", error)
      return Promise.reject(error);
    }
  );
  
  chatInstance.interceptors.response.use(
    function (response) {
      // console.log("응답 완료", response)
  
      return response;
    },
    function (error) {
      console.log("응답 에러", error)
      if(error.message=="Request failed with status code 401"){
        document.cookie = `access_token=${error.response.headers.accesstoken}; path=/;`;
        document.cookie = `refresh_token=${error.response.headers.refreshtoken}; path=/`;
      }
      return Promise.reject(error);
    }
  );
  
  export default chatInstance;

  // 채팅방 목록 가져오기
const fetchChatRooms = async () => {
    const response = await chatInstance.get(`/api/rooms`);
    console.log("채팅방 목록 조회", response)
  return response.data;
  }
  // 단일 채팅방 선택 조회
const fetchChatRoom = async (roomId:string) => {
    const response = await chatInstance.get(`/api/room/${roomId}`);
    console.log("단일 채팅방 선택 조회", response)
  return response.data;
  }
  
  
  // 채팅방 개설
  const createChatRoom = async (item:createChat) => {
      const response = await chatInstance.post(`/api/room`, item);
      // console.log("채팅방 개설", response)
      return response.data; // 생성된 채팅방 정보를 반환
  };

  // 채팅방 삭제하기
  const deleteChatRoom = async (id:number) => {
    const response = await chatInstance.delete(`/api/room/${id}`);
    // console.log("채팅방 삭제", response)
    return response.data; // 생성된 채팅방 정보를 반환
};

// 기존 대화 내역 조회
const fetchChatMessage = async (roomId:string) => {
  const response = await chatInstance.get(`api/room/${roomId}/message`);
  console.log("대화 내역 조회", response)
return response.data;
}

  export { fetchChatRooms,fetchChatRoom, createChatRoom, deleteChatRoom, fetchChatMessage
  }  