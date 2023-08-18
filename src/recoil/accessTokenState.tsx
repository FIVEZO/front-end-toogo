import { atom } from 'recoil';

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '', // 기본값은 빈 문자열, 로그인 상태에서는 실제 토큰 값으로
});