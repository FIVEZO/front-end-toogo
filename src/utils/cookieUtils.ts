export function getCookie(cookieName: string): string | null {
    if (document.cookie) {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === encodeURIComponent(cookieName)) {
          return decodeURIComponent(value);
        }
      }
    }
    return null;
  }