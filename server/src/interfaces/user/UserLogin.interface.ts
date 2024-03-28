import { ResponseMessages } from '../../utils/enums/response-messages.enum';

export interface UserLogin {
  email: string;
  password: string;
}

export interface IMessage {
  message: ResponseMessages | string;
  status: number;
  payload?: any;
}
