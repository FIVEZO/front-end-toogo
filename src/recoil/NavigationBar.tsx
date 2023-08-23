import { atom } from 'recoil';

export const selectedCountryState = atom({
  key: 'selectedCountryState',
  default: '', // 초기값 설정
});

export const selectedDateState = atom<string>({
  key: 'selectedDateState',
  default: '',
});