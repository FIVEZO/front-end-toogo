import axios from "axios";
import { LoginFormValues, SignupFormValues } from "../types/login";

import { useNavigate } from "react-router-dom";

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

    console.log("요청 완료", config)
    return config;
  },
  function (error) {
    console.log("요청 에러", error)
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log("응답 완료", response)

    return response;
  },
  function (error) {
    console.log("응답 에러", error)
    return Promise.reject(error);
  }
);

export default instance;

// 회원가입
const addUsers = async (newUser: SignupFormValues) => {
    const response = await instance.post(`/api/auth/signup`, newUser)
    // console.log("회원가입", response)
    return response.data;
  }

// 로그인
  const login = async (loginInformation:LoginFormValues) => {
    const response = await instance.post(`/api/auth/login`, loginInformation)
    // console.log("로그인", response)
    return response.data;
  }

// 이메일 중복확인
  const emailCheck = async (writtenEmail:string) => {
    const response = await instance.post(`/api/auth/email`, writtenEmail)
    // console.log("이메일 중복확인", response)
    return response.data;
  }

// 닉네임 중복확인
  const nickCheck = async (writtenNickname:string) => {
    const response = await instance.post(`/api/auth/nickname`, writtenNickname)
    // console.log("닉네임 중복확인", response)
    return response.data;
  }

// 카카오 토큰 받아오기
  const getKakaoToken = async (code: string | null) => {
    try {
      const response = await instance.get(`/api/auth/kakao?code=${code}`)
    // console.log("카카오 토큰", response)
    document.cookie = `accessToken=${response.headers.accesstoken}; path=/;`;
    document.cookie = `refreshToken=${response.headers.refreshtoken}; path=/`;
    
    return response.data;
    } catch (error) {
      console.error(error);
    }
  }

export { 
  // 로그인, 회원가입
  addUsers, 
  login, 
  getKakaoToken, 
  emailCheck, 
  nickCheck }  