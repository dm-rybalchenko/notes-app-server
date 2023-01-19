import Router from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user-controller.js';


const userRouter = new Router();

userRouter.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 4, max: 32 }),
  userController.registration
);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.get('/refresh', userController.refresh);
userRouter.get('/activate/:link', userController.activate);

export default userRouter;
