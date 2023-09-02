import axios from "axios";
import { createChat } from "../types/posts";
import { instance } from "./instance";

// 채팅방 목록 가져오기
const fetchChatRooms = async () => {
  const response = await instance.get(`/api/rooms`);
  // console.log("채팅방 목록 조회", response)
  return response.data;
};
// 단일 채팅방 선택 조회
const fetchChatRoom = async (roomId: string) => {
  const response = await instance.get(`/api/room/${roomId}`);
  // console.log("단일 채팅방 선택 조회", response)
  return response.data;
};

// 채팅방 개설
const createChatRoom = async (item: createChat) => {
  const response = await instance.post(`/api/room`, item);
  // console.log("채팅방 개설", response)
  return response.data; // 생성된 채팅방 정보를 반환
};

// 채팅방 삭제하기
const deleteChatRoom = async (id: number) => {
  const response = await instance.delete(`/api/room/${id}`);
  // console.log("채팅방 삭제", response)
  return response.data; // 생성된 채팅방 정보를 반환
};

// 기존 대화 내역 조회
const fetchChatMessage = async (roomId: string) => {
  const response = await instance.get(`api/room/${roomId}/message`);
  // console.log("대화 내역 조회", response);
  return response.data;
};

export {
  fetchChatRooms,
  fetchChatRoom,
  createChatRoom,
  deleteChatRoom,
  fetchChatMessage,
};
