import React from 'react'
import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { SignupFormValues } from './namgyutype';
import { login } from '../api/api';

const NamgyuLogin: React.FC = () =>{

  const [idValue, handleIdChange] = useInput();
  const [passwordValue, handlePasswordChange] = useInput();

  const navigate = useNavigate();

  const loginMutation = useMutation(login, {
    onSuccess: () => {
      alert("로그인을 완료하였습니다.");
      navigate('/')
    }
  });


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    const loginInformation: SignupFormValues = {
      id : idValue,
      password : passwordValue,
    }
    loginMutation.mutate(loginInformation)
  };

  const REST_API_KEY = '564f00b46533ce881c7fe7c870c83458';
  const REDIRECT_URI = 'http://localhost:8080/api/auth/kakao';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };



  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text" value={idValue} onChange={handleIdChange}/>
        <input
          type="password" value={passwordValue} onChange={handlePasswordChange}/>
        <button type="submit">로그인</button>
        <button type='button' onClick={loginHandler}>카톡으로 로그인 하기</button>
      </form>
    </div>
    )
}

export default NamgyuLogin

