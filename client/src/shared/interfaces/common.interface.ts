import { ResponseMessages } from '../enums/response-messages.enum';

export interface IMessage<T> {
  message: ResponseMessages | string;
  status: number;
  payload?: T;
}

export interface IPagination {
  page: number;
  size: number;
  total: number;
}
