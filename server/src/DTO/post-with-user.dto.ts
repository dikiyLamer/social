import { UpdateUserModel } from './update-user.dto';

export class PostWithUser {
  uid: string;
  description: string;
  likes: number;
  created: Date;
  likedUsers: UpdateUserModel[];
  user: UpdateUserModel;
}
