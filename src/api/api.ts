import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { LoginFormValues, SignupFormValues } from "../types/login";
import { postFormValues } from "../types/posts";
import { editUserFromValue, changePasswordFormValue } from "../types/acount";
import { instance } from "./instance";

// 회원가입
const addUsers = async (newUser: SignupFormValues) => {
  const response = await instance.post(`/api/auth/signup`, newUser);
  // console.log("회원가입", response)
  return response.data;
};

// 로그인
const login = async (loginInformation: LoginFormValues) => {
  const response = await instance.post(`/api/auth/login`, loginInformation);
  document.cookie = `access_token=${response.headers.accesstoken}; path=/;`;
  document.cookie = `refresh_token=${response.headers.refreshtoken}; path=/`;
  document.cookie = `nickname=${response.data.nickname}; path=/`;
  document.cookie = `email=${response.data.email}; path=/`;
  document.cookie = `emoticon=${response.data.emoticon}; path=/`;

  // console.log("로그인", response)
  return response.data;
};

// 이메일 인증하기
const emailCheck = async (writtenEmail: string) => {
  const response = await instance.post(
    `/api/auth/email/code?email=${writtenEmail}`
  );
  // console.log("이메일 인증하기", response)
  return response.data;
};

// 인증코드 확인
const authCodeCheck = async (code: string) => {
  const response = await instance.post(`/api/auth/email/confirm?code=${code}`);
  // console.log("인증코드 확인", response)
  return response.data;
};

// 닉네임 중복확인
const nickCheck = async (writtenNickname: string) => {
  const response = await instance.post(
    `/api/auth/nickname?nickname=${writtenNickname}`
  );
  // console.log("닉네임 중복확인", response)
  return response.data;
};

// 비밀번호 찾기
const findPassword = async (writtenEmail: string) => {
  const response = await instance.post(
    `/api/auth/email/find/password?email=${writtenEmail}`
  );
  // console.log("비밀번호 찾기", response)
  return response.data;
};

// 카카오 토큰 받아오기
const getKakaoToken = async (code: string | null) => {
  try {
    const response = await instance.get(`/api/auth/kakao?code=${code}`);
    // console.log("카카오 토큰", response)
    document.cookie = `access_token=${response.headers.accesstoken}; path=/;`;
    document.cookie = `refresh_token=${response.headers.refreshtoken}; path=/`;
    document.cookie = `nickname=${response.data.nickname}; path=/`;
    document.cookie = `email=${response.data.email}; path=/`;
    document.cookie = `emoticon=${response.data.emoticon}; path=/`;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 로그아웃 엑세스,리프레쉬 토큰 보낸후 삭제해야함
const logout = async () => {
  const response = await instance.post(`/api/auth/logout`);
  // console.log("로그아웃", response)
  return response.data;
};

// ------------------------------------------- 게시글

//  전체 게시글 조회 - 메인페이지 - 최신글 순으로 12개
const getHomePosts = async () => {
  const response = await instance.get(`/api/homepost`);
  // console.log("전체 게시글 조회", response)
  return response.data;
};

//  대륙별 게시글 총 갯수
const getCountrySum = async () => {
  const response = await instance.get(`api/count`);
  // console.log("전체 게시글 조회", response)
  return response.data;
};

// 대륙별 게시글 전체조회 ex) api/post/1?page=1
const getCategoryPosts = async (category: number, pageNum: number) => {
  const response = await instance.get(`api/post/${category}?page=${pageNum}`);
  // console.log("전체 게시글 조회", response)

  return response.data;
};

// 대륙별 게시글 나라조회 ex) api/post/1/한국/list?page=1
const getCategoryCountryPosts = async (
  category: number,
  country: string,
  pageNum: number
) => {
  const response = await instance.get(
    `api/post/${category}/${country}/list?page=${pageNum}`
  );
  // console.log("전체 게시글 조회", response)
  return response.data.data;
};

// 게시글 상세페이지 조회
const getDetailPosts = async (category: number, postId: number) => {
  const response = await instance.get(`api/post/${category}/${postId}`);
  // console.log("전체 게시글 조회", response)
  return response.data;
};

// 게시글 등록
const addPost = async (category: number, postData: postFormValues) => {
  const response = await instance.post(`/api/post/${category}`, postData);
  // console.log("게시글 등록", response)
  return response.data;
};

// 게시글 수정
const editPost = async (
  category: number,
  postId: number,
  postData: postFormValues
) => {
  const response = await instance.patch(
    `api/post/${category}/${postId}`,
    postData
  );

  // console.log("게시글 수정", response)
  return response.data;
};

// 게시글 삭제
const deletePost = async (category: number, postId: number) => {
  const response = await instance.delete(`api/post/${category}/${postId}`);
  // console.log("게시글 삭제", response)
  return response.data;
};

// 게시글 스크렙
const postScrap = async (category: number, postId: number) => {
  const response = await instance.post(`api/post/scrap/${category}/${postId}`);
  // console.log("게시글 스크렙", response)
  return response.data;
};

// // 게시글 검색  ex) api/post/search/1?keyword=에펠탑
const getSearchPosts = async (pageNum: number, keyword: string) => {
  const response = await instance.get(
    `api/post/search/${pageNum}?keyword=${keyword}`
  );
  // console.log("게시글 검색", response)
  return response.data;
};

// 댓글 등록
const addComment = async (
  category: number,
  postId: number,
  comment: string
) => {
  const response = await instance.post(
    `api/post/${category}/${postId}/comment`,
    { comment }
  );
  // console.log("댓글 등록", response)
  return response.data;
};

// 댓글 수정
const editComment = async (
  category: number,
  postId: number,
  commentId: number,
  comment: string
) => {
  const response = await instance.patch(
    `api/post/${category}/${postId}/comment/${commentId}`,
    { comment }
  );
  // console.log("댓글 수정", response)
  return response.data;
};

// 댓글 삭제
const deleteComment = async (
  category: number,
  postId: number,
  commentId: number
) => {
  const response = await instance.delete(
    `api/post/${category}/${postId}/comment/${commentId}`
  );
  // console.log("댓글 삭제", response)
  return response.data;
};

// --------------------------------------------------- 마이 페이지

// 내가 작성한 게시글
const getMyPosts = async () => {
  const response = await instance.get(`api/mypage/post`);
  // console.log("전체 게시글 조회", response)
  return response.data;
};

// 회원 탈퇴
const deleteUser = async () => {
  const response = await instance.delete(`api/mypage/delete`);
  // console.log("회원 탈퇴", response)
  return response.data;
};

// 내정보 수정
const editUser = async (newUserInfomation: editUserFromValue) => {
  const response = await instance.patch(
    `api/mypage/edituser`,
    newUserInfomation
  );
  document.cookie = `nickname=${response.data.newNickname}; path=/`;
  document.cookie = `emoticon=${response.data.newEmoticon}; path=/`;
  // console.log("내정보 수정", response)
  return response.data;
};

// 비밀번호 변경
const changePassword = async (newPassword: changePasswordFormValue) => {
  const response = await instance.patch(`api/mypage/pwupdate`, newPassword);
  // console.log("비밀번호 변경", response)
  return response.data;
};

// 마이페이지 스크렙 게시글
const getScrapPosts = async (pageNum: number) => {
  const response = await instance.get(`api/mypage/scrap/${pageNum}`);
  // console.log("스크렙한 게시글 조회", response)
  return response.data;
};

// 마이페이지 내가받은 쪽지
const getNote = async () => {
  const response = await instance.get(`api/mypage/note`);
  // console.log("내가받은 쪽지 조회", response)
  return response.data;
};

//------------------------------알림 조회

// 알림 목록 조회
const getNotification = async () => {
  const response = await instance.get(`/api/notifications`);
  // console.log("내가받은 알림 조회", response);
  return response.data;
};

// 알림 삭제
const deleteAlert = async (id: number) => {
  const response = await instance.delete(`/api/notification/${id}`);
  // console.log("알림 삭제", response)
  return response.data;
};

export {
  // 로그인, 회원가입
  addUsers,
  login,
  getKakaoToken,
  emailCheck,
  authCodeCheck,
  nickCheck,
  logout,
  findPassword,
  // 게시글
  getHomePosts,
  getCategoryPosts,
  getCategoryCountryPosts,
  getDetailPosts,
  addPost,
  editPost,
  deletePost,
  postScrap,
  addComment,
  editComment,
  deleteComment,
  getSearchPosts,
  getCountrySum,
  // 마이페이지
  deleteUser,
  editUser,
  getScrapPosts,
  getNote,
  getMyPosts,
  changePassword,
  getNotification,
  deleteAlert,
};
