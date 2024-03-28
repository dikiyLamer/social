import express from 'express';
import authRouter from './Auth.controller';
import postsRouter from './Posts.controller';
import usersRouter from './Users.controller';
import subscriptionsRouter from './Subscription.controller';
import chatRouter from './Messages.controller';
import passport from 'passport';
const router = express.Router();

router.use('/auth', authRouter);
router.use('/posts', passport.authenticate('jwt', { session: false }), postsRouter);
router.use('/users', passport.authenticate('jwt', { session: false }), usersRouter);
router.use('/subs', passport.authenticate('jwt', { session: false }), subscriptionsRouter);
router.use('/chat', passport.authenticate('jwt', { session: false }), chatRouter);

export default router;
