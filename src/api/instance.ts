import axios from "axios";
import { deleteAllCookies, getCookie } from "../utils/cookieUtils";
import { getAndDecryptTokenFromCookie } from "../utils/tokenUtils";
import { reissuingToken } from "./userApi";

// const refreshToken = getAndDecryptTokenFromCookie();

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  function (config) {
    // 쿠키에서 토큰 값 가져오기
    const accessToken = getCookie("access_token");
    const refreshToken = getAndDecryptTokenFromCookie();
    if (config.url == "/api/auth/token") {
      config.headers.refreshToken = `${refreshToken}`;
      // console.log("요청 완료", config);
      return config;
    }

    // 토큰이 존재하면 헤더에 담아서 요청 보내기
    if (accessToken) {
      config.headers.accessToken = `${accessToken}`;
      // config.headers.refreshToken = `${refreshToken}`;
    }

    // console.log("요청 완료", config);
    return config;
  },
  function (error) {
    // console.log("요청 에러", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // console.log("응답 완료", response);

    return response;
  },
  function (error) {
    const accessToken = getCookie("access_token");
    // console.log("응답 에러", error);
    // console.log("응답 에러 컨피그", { ...error.config });

    if (error.response.status === 403 && accessToken) {
      // console.log("403 에러");
      alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
      deleteAllCookies();
      window.location.href = "/login";
    }
    if (error.response.status == 418) {
      reissuingToken();
    }
    return Promise.reject(error);
  }
);
