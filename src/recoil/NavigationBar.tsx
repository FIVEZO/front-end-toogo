import { atom } from 'recoil';

export const selectedCountryState = atom({
  key: 'selectedCountryState',
  default: '', 
});

export const selectedDateState = atom<string>({
  key: 'selectedDateState',
  default: '',
});

export const sliderValueState = atom<string>({
  key: 'sliderValueState',
  default: '', 
});