import { IMessage } from '../interfaces/user/UserLogin.interface';
import { ResponseMessages } from './enums/response-messages.enum';

export class Message {
  static create(message: ResponseMessages | string, status: number, payload?: any): IMessage {
    return { message, status, payload };
  }
}
