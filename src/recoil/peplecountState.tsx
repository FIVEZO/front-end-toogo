import { atom, useRecoilState } from 'recoil';

export const peplecountState = atom<number>({
  key: 'peplecountState',
  default: 0,
});