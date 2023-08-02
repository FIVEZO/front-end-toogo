import React, { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import instance, { getKakaoToken } from '../api/api';

const Redirection = () => {

  // const navigate = useNavigate();

const code = new URL(window.location.href).searchParams.get("code");

useEffect(() => {
  getKakaoToken(code)
  
}, []);

    console.log("code",code)
  return (
    <div>Redirection</div> 
  )
}

export default Redirection

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Redirection = () => {
// const code = new URL(window.location.toString()).searchParams.get("code");
// const navigate = useNavigate();
// useEffect(() => {
// axios.post(`${process.env.REACT_APP_SERVER}/api/auth/kakao?code=${code}`).then((r) => {
// document.cookie = `accessToken=${r.headers.authorization}; path=/;`;
// navigate("/");
// window.location.reload();
// });
// });

// return <div>로그인 중입니다.</div>;
// };

// export default Redirection;