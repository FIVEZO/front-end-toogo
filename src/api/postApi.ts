import { postFormValues } from "../types/posts";
import { instance } from "./instance";

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

//------------------------------알림 조회

export {
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
};
