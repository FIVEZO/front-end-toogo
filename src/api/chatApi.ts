import axios from "axios";

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
      console.log("응답 완료", response)
  
      return response;
    },
    function (error) {
      console.log("응답 에러", error)
      return Promise.reject(error);
    }
  );
  
  export default chatInstance;

  // 채팅방 목록 가져오기
const fetchChatRooms = async () => {
    const response = await chatInstance.get(`/api/rooms`);
    // console.log("채팅방 목록 조회", response)
  return response.data;
  }
  
  
  // 채팅방 개설
  const createChatRoom = async (receiver:string) => {
      const response = await chatInstance.post(`/api/room`, {receiver});
      // console.log("채팅방 개설", response)
      return response.data; // 생성된 채팅방 정보를 반환
  };

  // 채팅방 삭제하기
  const deleteChatRoom = async (id:number) => {
    const response = await chatInstance.delete(`/api/room/${id}`);
    // console.log("채팅방 삭제", response)
    return response.data; // 생성된 채팅방 정보를 반환
};

  export { fetchChatRooms, createChatRoom, deleteChatRoom
  }  