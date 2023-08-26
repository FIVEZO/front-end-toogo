import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/cookieUtils";

  function deleteCookie(name: string) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

const accessToken = getCookie("access_token");


const initialState = {
  isLogin: !!accessToken,
};

const isLoginSlice = createSlice({
  name: "isLogin",
  initialState,
  reducers: {
    logIn: (state) => {
        state.isLogin = true;
    },
    logOff: (state) => {
        state.isLogin = false;
        deleteCookie("access_token"); // 엑세스 토큰 삭제
        deleteCookie("refresh_token"); // 리프레쉬 토큰 삭제
        deleteCookie("nickname"); // 닉네임 삭제
        deleteCookie("emoticon"); // 이모티콘 삭제
        deleteCookie("email"); // 이메일 삭제

    },
  },
});

export const { logIn, logOff } = isLoginSlice.actions;
export default isLoginSlice.reducer;