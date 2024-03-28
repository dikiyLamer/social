import { AppDataSource } from '../configs/dataSource';
import { User } from '../entities/User.entity';
import { IMessage } from '../interfaces/user/UserLogin.interface';
import { Message } from '../utils/Message';
import { ResponseMessages } from '../utils/enums/response-messages.enum';

export namespace SubscriptionService {
  const usersRepository = AppDataSource.getRepository(User);

  export async function getSubscribes(uid: string): Promise<IMessage> {
    const user = await usersRepository.findOne({
      where: { uid },
      relations: { subscribes: true },
    });
    const subscribes = user?.subscribes;
    return Message.create(ResponseMessages.Success, 200, subscribes);
  }

  export async function getSubscribers(uid: string): Promise<IMessage> {
    const user = await usersRepository.findOne({
      where: { uid },
      relations: { subscribers: true },
    });
    const subscribers = user?.subscribers;
    return Message.create(ResponseMessages.Success, 200, subscribers);
  }

  export async function isSubscribed(myUid: string, userUid: string): Promise<IMessage> {
    const result = await usersRepository.findOne({
      where: { uid: myUid, subscribes: { uid: userUid } },
      relations: { subscribes: true },
    });
    return Message.create(ResponseMessages.Success, 200, !!result);
  }

  export async function subscribe(myUid: string, userUid: string): Promise<IMessage> {
    const me = await usersRepository.findOne({
      where: { uid: myUid },
      relations: { subscribes: true },
    });
    const user = await usersRepository.findOne({
      where: { uid: userUid },
      relations: { subscribers: true },
    });

    if (me && user) {
      if (me.subscribes) {
        me.subscribes.push(user);
      } else {
        me.subscribes = [user];
      }
      if (user.subscribers) {
        user.subscribers.push(me);
      } else {
        user.subscribers = [me];
      }
      await usersRepository.save(user);
      await usersRepository.save(me);
      return Message.create(ResponseMessages.Success, 200);
    }
    return Message.create(ResponseMessages.UserNotFound, 400);
  }

  export async function unsubscribe(myUid: string, userUid: string): Promise<IMessage> {
    const me = await usersRepository.findOne({ where: { uid: myUid } });
    const user = await usersRepository.findOne({ where: { uid: userUid } });

    if (me && user) {
      me.subscribes.filter((subscribe) => subscribe.uid !== userUid);
      user.subscribers.filter((subscriber) => subscriber.uid !== myUid);
      await usersRepository.save(me);
      await usersRepository.save(user);
      return Message.create(ResponseMessages.Success, 400);
    }
    return Message.create(ResponseMessages.UserNotFound, 400);
  }
}
