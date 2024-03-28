import { IPagination } from './common.interface';

export interface IChatMessageData {
  data: IChatMessage[];
  pagination: IPagination;
}

export interface IChatMessage {
  id: number;
  text: string;
  userId: number;
  chatId: number;
  created: string;
}

export interface IChat {
  uid: string;
  created: Date;
  updated: Date;
}

export interface ICreateMessageReq {
  chatId: string;
  text: string;
  userId: string;
}
