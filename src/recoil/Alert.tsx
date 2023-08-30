import { atom } from 'recoil';
import { NotificationFormValues } from '../types/posts';

export const eventDataListState = atom<NotificationFormValues[]>({
  key: 'eventDataListState',
  default: [],
});