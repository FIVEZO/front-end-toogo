import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: false,
});

export const showButtonState = atom({
  key: 'showButtonState',
  default: false, // true로 변경하면 버튼을 보여주고, false로 변경하면 버튼을 숨깁니다.
});