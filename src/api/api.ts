import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  function (config) {
    // 로컬 스토리지에서 토큰 값 가져오기
    const token = localStorage.getItem("token");

    // 토큰이 존재하면 헤더에 담아서 요청 보내기
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    console.log("요청 완료", config)
    return config;
  },
  function (error) {
    console.log("요청 에러", error)
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log("응답 완료", response)
    // const token = response.headers.authorization

    return response;
  },
  function (error) {
    console.log("응답 에러", error)
    return Promise.reject(error);
  }
);

export default instance;


interface FormValues {
    id: string;
    password: string;
  }

const addUsers = async (newUser: FormValues) => {
    const response = await instance.post(`/register`, newUser)
    // console.log("회원가입", response)
    return response.data;
  }

  const login = async (loginInformation:FormValues) => {
    const response = await instance.post(`/login`, loginInformation)
    const token = response.headers.authorization
    localStorage.setItem('token', token);
    return response.data;
  }

export { addUsers, login } 