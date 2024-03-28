import { ICurrentUser } from './auth.interface';

export interface IPost {
  userUid?: string;
  uid?: string;
  description: string;
  user?: ICurrentUser;
}
