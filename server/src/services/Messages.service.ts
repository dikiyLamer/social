import { In } from 'typeorm';
import { AppDataSource } from '../configs/dataSource';
import { Chat } from '../entities/Chat.entity';
import { ChatMessage } from '../entities/Message.entity';
import { User } from '../entities/User.entity';
import { ResponseMessages } from '../utils/enums/response-messages.enum';
import { Message } from '../utils/Message';

export namespace MessageService {
  const usersRepository = AppDataSource.getRepository(User);
  const chatsRepository = AppDataSource.getRepository(Chat);
  const messagesRepository = AppDataSource.getRepository(ChatMessage);

  export const createChat = async (usersUids: string[]) => {
    const chat = new Chat();
    const users = await usersRepository.find({ where: { uid: In(usersUids) } });
    chat.users = users;
    await chatsRepository.save(chat);
    return Message.create(ResponseMessages.Success, 200);
  };

  export const createMessage = async (chatId: string, text: string, userId: string) => {
    const chat = await chatsRepository.findOne({ where: { uid: chatId } });
    const user = await usersRepository.findOne({ where: { uid: userId } });
    if (chat && user) {
      const message = new ChatMessage();
      message.chat = chat;
      message.text = text;
      await messagesRepository.save(message);
      return Message.create(ResponseMessages.Success, 200);
    }
    return Message.create(ResponseMessages.UserNotFound, 404);
  };

  export const getChats = async (email: string) => {
    const user = await usersRepository.findOne({ where: { email } });

    if (user) {
      const chats = await chatsRepository.find({
        where: { users: { email } },
        relations: { users: true },
      });
      return Message.create(ResponseMessages.Success, 200, chats);
    }
    return Message.create(ResponseMessages.UserNotFound, 404);
  };

  export const getMessages = async (chatId: string, size: number | string) => {
    const totalMessages = await messagesRepository.find({
      where: { chat: { uid: chatId } },
      relations: { chat: true },
    });
    console.log(totalMessages);

    const messages = await messagesRepository.find({
      where: { chat: { uid: chatId } },
      take: +size,
      relations: { chat: true },
    });
    const result = {
      data: messages,
      pagination: { total: totalMessages.length, size, page: +size / 10 },
    };
    return Message.create(ResponseMessages.Success, 200, result);
  };
}
