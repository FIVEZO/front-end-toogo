import { LoginFormValues, SignupFormValues } from "../types/login";
import { getCookie } from "../utils/cookieUtils";
import {
  getAndDecryptTokenFromCookie,
  setEncryptedTokenInCookie,
} from "../utils/tokenUtils";
import { instance } from "./instance";

// 회원가입
const addUsers = async (newUser: SignupFormValues) => {
  const response = await instance.post(`/api/auth/signup`, newUser);
  // console.log("회원가입", response)
  return response.data;
};

// 로그인
const login = async (loginInformation: LoginFormValues) => {
  const response = await instance.post(`/api/auth/login`, loginInformation);
  document.cookie = `access_token=${response.headers.accesstoken}; path=/;`;
  // document.cookie = `refresh_token=${response.headers.refreshtoken}; path=/;`;
  setEncryptedTokenInCookie(response.headers.refreshtoken);
  document.cookie = `nickname=${response.data.nickname}; path=/`;
  document.cookie = `email=${response.data.email}; path=/`;
  document.cookie = `emoticon=${response.data.emoticon}; path=/`;

  // console.log("로그인", response)
  return response.data;
};

// 이메일 인증하기
const emailCheck = async (writtenEmail: string) => {
  const response = await instance.post(
    `/api/auth/email/code?email=${writtenEmail}`
  );
  // console.log("이메일 인증하기", response)
  return response.data;
};

// 인증코드 확인
const authCodeCheck = async (code: string) => {
  const response = await instance.post(`/api/auth/email/confirm?code=${code}`);
  // console.log("인증코드 확인", response)
  return response.data;
};

// 닉네임 중복확인
const nickCheck = async (writtenNickname: string) => {
  const response = await instance.post(
    `/api/auth/nickname?nickname=${writtenNickname}`
  );
  // console.log("닉네임 중복확인", response)
  return response.data;
};

// 비밀번호 찾기
const findPassword = async (writtenEmail: string) => {
  const response = await instance.post(
    `/api/auth/email/find/password?email=${writtenEmail}`
  );
  // console.log("비밀번호 찾기", response)
  return response.data;
};

// 카카오 토큰 받아오기
const getKakaoToken = async (code: string | null) => {
  try {
    const response = await instance.get(`/api/auth/kakao?code=${code}`);
    // console.log("카카오 토큰", response)
    document.cookie = `access_token=${response.headers.accesstoken}; path=/;`;
    // document.cookie = `refresh_token=${response.headers.refreshtoken}; path=/;`;
    setEncryptedTokenInCookie(response.headers.refreshtoken);
    document.cookie = `nickname=${response.data.nickname}; path=/`;
    document.cookie = `email=${response.data.email}; path=/`;
    document.cookie = `emoticon=${response.data.emoticon}; path=/`;
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 로그아웃 엑세스,리프레쉬 토큰 보낸후 삭제해야함
const logout = async () => {
  const response = await instance.post(`/api/auth/logout`);
  // console.log("로그아웃", response)
  return response.data;
};

// 토큰 재발급
const reissuingToken = async () => {
  const response = await instance.post(`/api/auth/token`, {
    accessToken: getCookie("access_token"),
  });
  document.cookie = `access_token=${response.headers.accesstoken}; path=/;`;
  setEncryptedTokenInCookie(response.headers.refreshtoken);
  // console.log("토큰 재발급", response);
  return response.data;
};

export {
  // 로그인, 회원가입
  addUsers,
  login,
  getKakaoToken,
  emailCheck,
  authCodeCheck,
  nickCheck,
  logout,
  findPassword,
  reissuingToken,
};

// // ---------------------------------------토큰 재발급
// const reissuingMutation = useMutation(reissuingToken, {
//   onSuccess: (data) => {
//     console.log("reissuingMutation", data);
//   },
// });

// const reissuingHandler = (event: FormEvent<Element>) => {
//   event.preventDefault();
//   reissuingMutation.mutate();
// };
