import express, { Request, Response } from 'express';
import { UserLogin } from '../interfaces/user/UserLogin.interface';
import { Message } from '../utils/Message';
import { MessageService } from '../services/Messages.service';

const router = express.Router();

router.get('/chats', async (req: Request, res: Response) => {
  try {
    const user = req.user as UserLogin;
    const response = await MessageService.getChats(user.email);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.get('/messages', async (req: Request, res: Response) => {
  try {
    const params = req.query;
    const response = await MessageService.getMessages(
      params.chatId as string,
      params.size as number | string
    );
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.post('/chats', async (req: Request, res: Response) => {
  try {
    const users = req.body.userUids;
    const response = await MessageService.createChat(users);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.post('/messages', async (req: Request, res: Response) => {
  try {
    const users = req.body;
    const response = await MessageService.createMessage(users.chatId, users.text, users.userId);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

export default router;
