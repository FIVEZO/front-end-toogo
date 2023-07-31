import React, { useState } from 'react';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    username: '',
    password: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formValues);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="id"
          value={formValues.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formValues.password}
          onChange={handleChange}
          required
        />
        <button>로그인</button>
      </form>
    </div>
  );
};

export default Login;
