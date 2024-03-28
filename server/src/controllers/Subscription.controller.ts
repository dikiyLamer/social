import express, { Request, Response } from 'express';
import { SubscriptionService } from '../services/Subscription.service';
import { Message } from '../utils/Message';

const router = express.Router();

router.get('/subscribes/:uid', async (req: Request, res: Response) => {
  try {
    const response = await SubscriptionService.getSubscribes(req.params.uid);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.get('/subscribers/:uid', async (req: Request, res: Response) => {
  try {
    const response = await SubscriptionService.getSubscribers(req.params.uid);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.get('/issubscribed', async (req: Request, res: Response) => {
  try {
    const me = req.query.me;
    const user = req.query.user;

    const response = await SubscriptionService.isSubscribed(me as string, user as string);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.post('/subscribe', async (req: Request, res: Response) => {
  try {
    const me = req.query.me;
    const user = req.query.user;

    const response = await SubscriptionService.subscribe(me as string, user as string);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

router.delete('/unsubscribe', async (req: Request, res: Response) => {
  try {
    const me = req.query.me;
    const user = req.query.user;

    const response = await SubscriptionService.unsubscribe(me as string, user as string);
    res.status(response.status).json(response);
  } catch (e: any) {
    res.status(404).send(Message.create(e.message, 404));
  }
});

export default router;
