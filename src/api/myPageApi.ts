import { instance } from "./instance";
import { changePasswordFormValue, editUserFromValue } from "../types/acount";

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

// 내가 작성한 게시글
const getMyPosts = async () => {
  const response = await instance.get(`api/mypage/post`);
  // console.log("전체 게시글 조회", response)
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

export {
  deleteUser,
  editUser,
  changePassword,
  getScrapPosts,
  getNote,
  getMyPosts,
};
