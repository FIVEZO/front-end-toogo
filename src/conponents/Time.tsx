export function formatTimeAgo(createdDate: string): string {
    const serverTime = new Date(createdDate); // 서버에서 받아온 시간을 Date 객체로 변환
  
    const currentDate = new Date(); // 현재 시간
    const diffInMilliseconds = currentDate.getTime() - serverTime.getTime(); // 현재 시간과 서버에서 받아온 시간의 차이 (밀리초)
  
    // 시간 간격 계산
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000); // 초 단위
    const diffInMinutes = Math.floor(diffInSeconds / 60); // 분 단위
    const diffInHours = Math.floor(diffInMinutes / 60); // 시간 단위
    const diffInDays = Math.floor(diffInHours / 24); // 일 단위
  
    if (diffInDays >= 1) {
      return `${diffInDays}일 전`;
    } else if (diffInHours >= 1) {
      return `${diffInHours}시간 전`;
    } else {
      return `${diffInMinutes}분 전`;
    }
  }

  export function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}월 ${day}일`;
  }
  