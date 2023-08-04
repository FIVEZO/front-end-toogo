import axios from "axios";
import { LoginFormValues, SignupFormValues } from "../types/login";

import { useNavigate } from "react-router-dom";
import { postFormValues } from "../types/posts";

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

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(
  function (config) {
    // 쿠키에서 토큰 값 가져오기
    const accessToken = getCookie("access_token");
    const refreshToken = getCookie("refresh_token");

    // 토큰이 존재하면 헤더에 담아서 요청 보내기
    if (accessToken && refreshToken) {
      config.headers.accessToken = `${accessToken}`;
      config.headers.refreshToken = `${refreshToken}`;
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

    return response;
  },
  function (error) {
    console.log("응답 에러", error)
    return Promise.reject(error);
  }
);

export default instance;

// 회원가입
const addUsers = async (newUser: SignupFormValues) => {
    const response = await instance.post(`/api/auth/signup`, newUser)
    // console.log("회원가입", response)
    return response.data;
  }

// 로그인
  const login = async (loginInformation:LoginFormValues) => {
    const response = await instance.post(`/api/auth/login`, loginInformation)
    // console.log("로그인", response)
    return response.data;
  }

  // 이메일 중복확인
  const emailCheck = async (writtenEmail:string) => {

    const response = await instance.post(`/api/auth/email?email=${writtenEmail}`)
    // console.log("이메일 중복확인", response)
    return response.data;
  }
  
  // 닉네임 중복확인
  const nickCheck = async (writtenNickname:string) => {
    const response = await instance.post(`/api/auth/nickname?nickname=${writtenNickname}`)
    // console.log("닉네임 중복확인", response)
    return response.data;
  }

// 카카오 토큰 받아오기
  const getKakaoToken = async (code: string | null) => {
    try {
      const response = await instance.get(`/api/auth/kakao?code=${code}`)
    // console.log("카카오 토큰", response)
    document.cookie = `accessToken=${response.headers.accesstoken}; path=/;`;
    document.cookie = `refreshToken=${response.headers.refreshtoken}; path=/`;
    
    return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  // 로그아웃 엑세스,리프레쉬 토큰 보낸후 삭제해야함
  const logout = async () => {
    const response = await instance.post(`/api/auth/logout`)
    // console.log("로그아웃", response)
    return response.data;
  }

  // ------------------------------------------- 게시글

  //  전체 게시글 조회 - 메인페이지 - 최신글 순으로 12개
const getHomePosts = async () => {
  const response = await instance.get(`/api/homepost`);
  // console.log("전체 게시글 조회", response)
  return response.data;
}

  // 대륙별 게시글 전체조회 ex) api/post/1?page=1
const getCategoryPosts = async (category: number, pageNum: number ) => {
  const response = await instance.get(`api/post/${category}?page=${pageNum}`);
  // console.log("전체 게시글 조회", response)
  return response.data;
}

 // 게시글 상세페이지 조회
const getDetailPosts = async (category: number, postId: number ) => {
  const response = await instance.get(`api/post/${category}/${postId}`);
  // console.log("전체 게시글 조회", response)
  return response.data;
}

// 게시글 등록
const addPost = async (category: number, postData : postFormValues) => {
  const response = await instance.post(`/api/post/${category}`, postData)
  // console.log("게시글 등록", response)
  return response.data;
}

// 게시글 수정
const editPost = async (category: number, postId: number) => {
  const response = await instance.patch(`api/post/${category}/${postId}`)
  // console.log("게시글 수정", response)
  return response.data;
}

// 게시글 삭제
const deletePost = async (category: number, postId: number) => {
  const response = await instance.delete(`api/post/${category}/${postId}`)
  // console.log("게시글 삭제", response)
  return response.data;
}

// 게시글 스크렙
const postScrap = async (category: number, postId: number) => {
  const response = await instance.post(`api/post/scrap/${category}/${postId}`)
  // console.log("게시글 스크렙", response)
  return response.data;
}

// // 게시글 검색  ex) api/post/1/search/1?keyword=에펠탑
const getSearchPosts = async (category: number, pageNum: number, keyword : string) => {
  const response = await instance.get(`api/post/${category}/search/${pageNum}?keyword=${keyword}`);
  // console.log("게시글 검색", response)
  return response.data;
}

// 댓글 등록
const addComment = async (category: number, postId: number, comment : string) => {
  const response = await instance.post(`api/post/${category}/${postId}/comment`, comment)
  // console.log("댓글 등록", response)
  return response.data;
}

// 댓글 수정
const editComment = async (category: number, postId: number, commentId : number, comment : string) => {
  const response = await instance.patch(`api/post/${category}/${postId}/comment/${commentId}`, comment)
  // console.log("댓글 수정", response)
  return response.data;
}

// 댓글 삭제
const deleteComment = async (category: number, postId: number, commentId : number) => {
  const response = await instance.delete(`api/post/${category}/${postId}/comment/${commentId}`)
  // console.log("댓글 삭제", response)
  return response.data;
}

// --------------------------------------------------- 마이 페이지

// 마이페이지 화면구성 필요함 스크렙한




// 회원 탈퇴
const deleteUser = async () => {
  const response = await instance.delete(`api/mypage/delete`)
  // console.log("회원 탈퇴", response)
  return response.data;
}

// 내정보 수정
const editUser = async (userInformation : string) => {
  const response = await instance.patch(`api/mypage/update`, userInformation)
  // console.log("내정보 수정", response)
  return response.data;
}

 // 마이페이지 스크렙 게시글
 const getScrapPosts = async () => {
  const response = await instance.get(`api/mypage/scrap`);
  // console.log("스크렙한 게시글 조회", response)
  return response.data;
}

 // 마이페이지 내가받은 쪽지
 const getNote = async () => {
  const response = await instance.get(`api/mypage/note`);
  // console.log("내가받은 쪽지 조회", response)
  return response.data;
}





export { 
  // 로그인, 회원가입
  addUsers, login, getKakaoToken, emailCheck, nickCheck, logout, 
  // 게시글
  getHomePosts, getCategoryPosts, getDetailPosts, addPost, editPost, deletePost, postScrap, addComment, editComment, deleteComment, deleteUser, editUser
}  