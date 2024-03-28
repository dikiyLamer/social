import { In } from 'typeorm';
import { CreatePostModel } from '../DTO/create-post.dto';
import { UpdatePostModel } from '../DTO/update-post.dto';
import { AppDataSource } from '../configs/dataSource';
import { Post } from '../entities/Post.entity';
import { User } from '../entities/User.entity';
import { IMessage } from '../interfaces/user/UserLogin.interface';
import { Message } from '../utils/Message';
import { ResponseMessages } from '../utils/enums/response-messages.enum';

export namespace PostsService {
  const postsRepository = AppDataSource.getRepository(Post);
  const usersRepository = AppDataSource.getRepository(User);

  export async function getPosts(): Promise<IMessage> {
    const posts = await postsRepository.find({ relations: { user: true } });
    return Message.create(ResponseMessages.Success, 200, posts);
  }

  export async function getMyPosts(uid: string): Promise<IMessage> {
    const user = await usersRepository.findOne({ where: { uid } });
    if (user) {
      const posts = await postsRepository.find({
        where: { user: user },
        relations: { user: true },
      });
      return Message.create(ResponseMessages.Success, 200, posts);
    }
    return Message.create(ResponseMessages.UserNotFound, 400);
  }

  export async function getPost(uid: string): Promise<IMessage> {
    const post = postsRepository.findOne({ where: { uid }, relations: { user: true } });
    return Message.create(ResponseMessages.Success, 200, post);
  }

  export async function getSubsPosts(email: string) {
    const user = await usersRepository.findOne({
      where: { email },
      relations: { subscribes: true },
    });
    const subscribes = user?.subscribes.map((sub) => sub.uid);
    const posts = await postsRepository.find({
      where: { user: { uid: In(subscribes!) } },
      relations: { user: true },
      order: { created: 'DESC' },
    });

    return Message.create(ResponseMessages.Success, 200, posts);
  }

  export async function createPost(
    { description }: CreatePostModel,
    email: string
  ): Promise<IMessage> {
    const user = await usersRepository.findOne({ where: { email } });
    const newPost = new Post();
    newPost.description = description;
    newPost.user = user!;
    await postsRepository.save(newPost);
    return Message.create(ResponseMessages.PostCreated, 201);
  }

  export async function updatePost({ uid, description }: UpdatePostModel): Promise<IMessage> {
    const post = await postsRepository.findOne({ where: { uid } });
    post!.description = description;
    await postsRepository.save(post!);
    return Message.create(ResponseMessages.Success, 201);
  }

  export async function deletePost(uid: string): Promise<IMessage> {
    await postsRepository.delete(uid);
    return Message.create(ResponseMessages.Success, 200);
  }

  export async function LikePost(uid: string, email: string): Promise<IMessage> {
    const post = await postsRepository.findOne({ where: { uid } });
    const user = await usersRepository.findOne({ where: { email } });

    if (post && user) {
      post.likes = post.likes++;
      post.likedUsers.push(user);
      await postsRepository.save(post);
      return Message.create(ResponseMessages.Success, 201);
    }
    return Message.create(ResponseMessages.UserNotFound, 404);
  }
}
