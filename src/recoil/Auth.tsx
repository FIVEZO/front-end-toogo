import { atom, useRecoilState } from 'recoil';
import { getCookie } from '../utils/cookieUtils';


// 리덕스에서 사용했던 deleteCookie 함수를 그대로 사용합니다.
function deleteCookie(name: string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// access_token 쿠키를 가져옵니다.
const accessToken = getCookie('access_token');

// Recoil 아톰(atom)을 사용하여 상태를 정의합니다.
export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: !!accessToken, // 기본값은 access_token 쿠키가 있을 경우 true, 없을 경우 false
});

// 리듀서 대신 Recoil 상태를 사용합니다.
export function useLoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logOff = () => {
    setIsLoggedIn(false);
    // 쿠키 삭제 등의 작업을 수행합니다.
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    deleteCookie('nickname');
    deleteCookie('emoticon');
    deleteCookie('email');
  };

  return { isLoggedIn, logIn, logOff };
}
