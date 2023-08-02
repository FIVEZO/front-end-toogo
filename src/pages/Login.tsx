// import React, { useState } from 'react';
// import { useMutation } from 'react-query';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../api/api';
// import { LoginFormValues } from '../types/login';
// import useInput from '../hooks/useInput';



const Login: React.FC = () => {
//   // const [formValues, setFormValues] = useState<LoginFormValues>({
//   //   id: '',
//   //   password: '',
//   // });

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     loginClickHandler()
//   };

//   // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   const { name, value } = event.target;
//   //   setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
//   // };

//   const [id, onChangeIdHandler] = useInput();
//   const [password, onChangePasswordHandler] = useInput();

//   const navigate = useNavigate();

//   const loginMutation = useMutation(login, {
//     onSuccess: () => {
//       alert("로그인 했슴!");
//       navigate('/')
//     }
//   });

 

//   const loginClickHandler = () => {
//     const loginInformation: LoginFormValues = {
//       id : id,
//       password : password,
//     }
//     loginMutation.mutate(loginInformation)
    
//   };

  return (<div></div>)
//     <div>
//       <h2>로그인</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="id"
//           value={id}
//           onChange={onChangeIdHandler}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="password"
//           value={password}
//           onChange={onChangePasswordHandler}
//           required
//         />
//         <button type="submit">로그인</button>
//       </form>
//     </div>
  
};

export default Login;
