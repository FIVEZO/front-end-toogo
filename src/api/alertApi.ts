import { instance } from "./instance";

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

export { getNotification, deleteAlert };
