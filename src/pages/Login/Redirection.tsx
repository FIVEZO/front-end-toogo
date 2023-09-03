import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/modules/loginSlice";
import Spinner from "../../components/Spinner";
import { getKakaoToken } from "../../api/userApi";

const Redirection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    getKakaoToken(code);
    alert("로그인을 완료하였습니다.");
    dispatch(logIn());
    navigate("/");
  }, []);
  return <Spinner />;
};

export default Redirection;
