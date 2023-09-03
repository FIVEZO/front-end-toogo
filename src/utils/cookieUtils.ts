export function getCookie(cookieName: string): string | null {
  if (document.cookie) {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === encodeURIComponent(cookieName)) {
        return decodeURIComponent(value);
      }
    }
  }
  return null;
}

export function deleteCookie(name: string) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function deleteAllCookies() {
  deleteCookie("access_token"); // 엑세스 토큰 삭제
  deleteCookie("encryptedToken"); // 리프레쉬 토큰 삭제
  deleteCookie("nickname"); // 닉네임 삭제
  deleteCookie("emoticon"); // 이모티콘 삭제
  deleteCookie("email"); // 이메일 삭제
}
