import express, { Request, Response } from 'express';
import { PostsService } from '../services/Posts.service';
import { UserLogin } from '../interfaces/user/UserLogin.interface';
import { Message } from '../utils/Message';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const response = await PostsService.getPosts();
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.get('/news', async (req: Request, res: Response) => {
  try {
    const user = req.user as UserLogin;
    const response = await PostsService.getSubsPosts(user.email);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const user = req.user! as UserLogin;
    const response = await PostsService.createPost(req.body, user.email);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.get('/user/:uid', async (req: Request, res: Response) => {
  try {
    const userUid = req.params.uid;
    const response = await PostsService.getMyPosts(userUid);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.patch('/like/:uid', async (req: Request, res: Response) => {
  try {
    const user = req.user! as UserLogin;
    const response = await PostsService.LikePost(req.params.uid, user.email);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.get('/:uid');
router.patch('/', async (req: Request, res: Response) => {
  try {
    const user = req.user! as UserLogin;
    const response = await PostsService.updatePost(req.body);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.delete('/:uid');

export default router;
