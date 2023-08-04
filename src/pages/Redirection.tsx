import React, { useEffect } from 'react'

import { getKakaoToken } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Redirection = () => {

  const navigate = useNavigate();

const code = new URL(window.location.href).searchParams.get("code");

useEffect(() => {
  
  getKakaoToken(code)
  alert("로그인을 완료하였습니다.")

  navigate('/')

  
}, []);
  return (
    <div>Redirection</div> 
  )
}

export default Redirection