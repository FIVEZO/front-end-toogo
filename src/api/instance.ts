import axios from "axios";
import { deleteCookie, getCookie } from "../utils/cookieUtils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOff } from "../redux/modules/loginSlice";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  function (config) {
    // 쿠키에서 토큰 값 가져오기
    const accessToken = getCookie("access_token");
    const refreshToken = getCookie("refresh_token");

    // 토큰이 존재하면 헤더에 담아서 요청 보내기
    if (accessToken && refreshToken) {
      config.headers.accessToken = `${accessToken}`;
      config.headers.refreshToken = `${refreshToken}`;
    }

    console.log("요청 완료", config);
    return config;
  },
  function (error) {
    console.log("요청 에러", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log("응답 완료", response);

    return response;
  },
  function (error) {
    console.log("응답 에러", error);
    if (error.response.status == 403) {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
      dispatch(logOff());
      navigate("/");
      // deleteCookie("access_token"); // 엑세스 토큰 삭제
      // deleteCookie("refresh_token"); // 리프레쉬 토큰 삭제
      // deleteCookie("nickname"); // 닉네임 삭제
      // deleteCookie("emoticon"); // 이모티콘 삭제
      // deleteCookie("email"); // 이메일 삭제
    }
    if (error.message == "Request failed with status code 418") {
      document.cookie = `access_token=${error.response.headers.accesstoken}; path=/;`;
      document.cookie = `refresh_token=${error.response.headers.refreshtoken}; path=/`;
    }
    return Promise.reject(error);
  }
);
