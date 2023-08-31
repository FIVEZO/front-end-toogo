export type postFormValues = {
  title: string;
  contents: string;
  country: string;
  meetDate: string;
  people: string;
  latitude: number;
  longitude: number;
};

export type locationFormValues = {
  latitude: number;
  longitude: number;
};

export type cardItem = {
  id: number;
  category: number;
  nickname: string;
  title: string;
  country: string;
  contents: string;
  createdAt: string;
  meetDate: string;
  emoticon: string;
};

export type cardData = {
  item: cardItem[];
};

export type createChat = {
  receiver: string;
  postId: number;
};

export type NotificationFormValues = {
  id:number;
  category: number;
  sender: string;
  createdAt: string;
  readStatus: boolean;
  contents: string;
  message: string;
  emoticon: string;
  postId : number
  roomId : string
  postId: number;
};

export interface TabContentProps {
  activeTab: string;
  isLoading: boolean;
  isError: boolean;
  data: { data: cardItem[] };
}

