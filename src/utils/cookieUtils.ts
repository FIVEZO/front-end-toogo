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
