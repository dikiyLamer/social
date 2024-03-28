import { CreateUserModel } from '../DTO/create-user.dto';
import { AppDataSource } from '../configs/dataSource';
import { User } from '../entities/User.entity';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IMessage, UserLogin } from '../interfaces/user/UserLogin.interface';
import { ILike } from 'typeorm';
import { Message } from '../utils/Message';
import { ResponseMessages } from '../utils/enums/response-messages.enum';

export namespace UsersService {
  const tokenTTL = 3600;
  const usersRepository = AppDataSource.getRepository(User);

  export async function getUsers(): Promise<IMessage> {
    const users = await usersRepository.find();
    return Message.create(ResponseMessages.Success, 200, users);
  }

  export async function getUserById(uid: string): Promise<IMessage> {
    const user = await usersRepository.findOne({ where: { uid } });
    return Message.create(ResponseMessages.Success, 200, user);
  }

  export async function getUserByEmail(email: string): Promise<IMessage> {
    const user = await usersRepository.findOne({ where: { email } });
    return Message.create(ResponseMessages.Success, 200, user);
  }

  export async function findUserByName(name: string): Promise<IMessage> {
    const users = await usersRepository.find({
      where: [{ firstName: ILike(`%${name}%`) }, { secondName: ILike(`%${name}%`) }],
    });

    return Message.create(ResponseMessages.Success, 200, users);
  }

  export async function register(user: CreateUserModel): Promise<IMessage> {
    const newUser = new User();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    newUser.email = user.email;
    newUser.firstName = user.firstName;
    newUser.password = hashedPassword;
    newUser.secondName = user.secondName;
    newUser.link = `@${user.email}`;

    await usersRepository.save(newUser);
    return Message.create(ResponseMessages.Registered, 201);
  }

  export async function login({ email, password }: UserLogin): Promise<IMessage> {
    const user = await usersRepository.findOne({ where: { email } });
    if (!user) {
      return Message.create(ResponseMessages.UserNotFound, 404);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return Message.create(ResponseMessages.WrongPassword, 403);
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: tokenTTL,
    });
    const claims = { token, tokenTTL: Date.now() + tokenTTL * 1000 };

    return Message.create(ResponseMessages.Success, 200, claims);
  }
}
