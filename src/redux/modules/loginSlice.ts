import { createSlice } from "@reduxjs/toolkit";
import { deleteAllCookies, getCookie } from "../../utils/cookieUtils";

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
      deleteAllCookies();
    },
  },
});

export const { logIn, logOff } = isLoginSlice.actions;
export default isLoginSlice.reducer;
