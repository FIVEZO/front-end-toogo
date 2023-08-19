import { atom, useRecoilState } from 'recoil';

export const peplecountState = atom({
  key: 'peplecountState',
  default: 0,
});