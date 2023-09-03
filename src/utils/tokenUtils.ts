import * as CryptoJS from "crypto-js";

// 암호화 키
const secretKey = process.env.REACT_APP_CRYPTO_KEY || "";

// 토큰 생성 및 암호화
export function encryptToken(token: string): string {
  const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
  return encryptedToken;
}

// 암호화된 토큰 복호화
export function decryptToken(encryptedToken: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedToken;
}

// 쿠키에 토큰 저장 함수 (expires 설정은 선택 사항)
export function setEncryptedTokenInCookie(token: string): void {
  const encryptedToken: string = encryptToken(token);
  document.cookie = `encryptedToken=${encryptedToken}; path=/`;
}

// 쿠키에서 토큰 가져오고 복호화하여 사용하는 함수
export function getAndDecryptTokenFromCookie(): string | undefined {
  const cookie: string = document.cookie;
  const cookieArray: string[] = cookie.split(";");
  let encryptedToken: string = "";

  for (const item of cookieArray) {
    const [key, value]: string[] = item.trim().split("=");
    if (key === "encryptedToken") {
      encryptedToken = value;
      break;
    }
  }

  if (encryptedToken) {
    return decryptToken(encryptedToken);
  } else {
    return undefined;
  }
}

// ------------------- 사용법

// 쿠키에 암호화된 토큰 저장
// setEncryptedTokenInCookie(tokenToEncrypt);

// 쿠키에서 암호화된 토큰 가져오고 복호화하여 사용
// const decryptedToken: string | undefined = getAndDecryptTokenFromCookie();
// if (decryptedToken) {
//   console.log('Decrypted Token:', decryptedToken);
// }
