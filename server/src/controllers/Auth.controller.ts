import express, { Request, Response } from 'express';
import { UsersService } from '../services/Users.service';
import { UserLogin } from '../interfaces/user/UserLogin.interface';
import { CreateUserModel } from '../DTO/create-user.dto';
import passport from 'passport';
import { Message } from '../utils/Message';
import { ResponseMessages } from '../utils/enums/response-messages.enum';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const userData: UserLogin = req.body;
    const response = await UsersService.login(userData);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});
router.post('/register', async (req: Request, res: Response) => {
  try {
    const userData: CreateUserModel = req.body;
    const response = await UsersService.register(userData);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response) => {
    try {
      res.status(200).json(Message.create(ResponseMessages.Success, 200, req.user));
    } catch (e: any) {
      res.status(404).send(Message.create(e.message, 404));
    }
  }
);

export default router;
