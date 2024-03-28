import express, { Request, Response } from 'express';
import { UsersService } from '../services/Users.service';
import { Message } from '../utils/Message';

const router = express.Router();

router.get('/');
router.get('/find/:data', async (req: Request, res: Response) => {
  try {
    const data = req.params.data;
    const response = await UsersService.findUserByName(data);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});
router.get('/:uid', async (req: Request, res: Response) => {
  try {
    const uid = req.params.uid;
    const response = await UsersService.getUserById(uid);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.patch('/');
router.post('/');
router.delete('/:uid');

export default router;
