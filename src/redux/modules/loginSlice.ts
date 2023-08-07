import { createSlice } from "@reduxjs/toolkit";

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

  function deleteCookie(name: string) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  const accessToken = getCookie("access_token");
  const refreshToken = getCookie("refresh_token");


const initialState = {
  isLogin: !!accessToken,
};

const isLoginSlice = createSlice({
  name: "isLogin",
  initialState,
  reducers: {
    logIn: (state, action) => {
        state.isLogin = true;
    },
    logOut: (state, action) => {
        state.isLogin = false;
        deleteCookie("access_token"); // 엑세스 토큰 삭제
        deleteCookie("refresh_token"); // 리프레쉬 토큰 삭제
    },
  },
});

export const { logIn, logOut } = isLoginSlice.actions;
export default isLoginSlice.reducer;