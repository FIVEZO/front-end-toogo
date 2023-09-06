import { atom, useRecoilState } from 'recoil';

// Recoil 상태 정의
export const goToMainState = atom({
  key: 'goToMainState', // 고유한 (글로벌) 키입니다 (잘 정의해야 합니다).
  default: false, // 초기값
});