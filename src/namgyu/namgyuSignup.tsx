import React from 'react'
import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { addUsers } from '../api/api';
import { SignupFormValues } from './namgyutype';

const NamgyuSignup: React.FC = () => {

  const [idValue, handleIdChange] = useInput();
  const [passwordValue, handlePasswordChange] = useInput();

  const navigate = useNavigate();

 

  const signupMutation = useMutation(addUsers, {
    onSuccess: () => {
      alert("회원가입을 완료하였습니다.");
      navigate('/namgyulogin')
    }
  });


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    const signupInformation: SignupFormValues = {
      id : idValue,
      password : passwordValue,
    }
    signupMutation.mutate(signupInformation)
  };


  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text" value={idValue} onChange={handleIdChange}/>
        <input
          type="password" value={passwordValue} onChange={handlePasswordChange}/>
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}

export default NamgyuSignup
