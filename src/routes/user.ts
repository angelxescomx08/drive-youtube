import { Router } from 'express';
import { createUserController } from '../controllers/user/create-user';
import { deleteUserController } from '../controllers/user/delete-user';
import { getUsers } from '../controllers/user/list-users';
import { loginController } from '../controllers/user/login';
import { updateUserController } from '../controllers/user/update-user';
import { validRightUserMiddleware } from '../middlewares/auth/validate-right-user';
import { validateToken } from '../middlewares/auth/validate-token';

const userRouter = Router();

userRouter.get('/', [validateToken], getUsers);

userRouter.post('/', createUserController);

userRouter.post('/login', loginController);

userRouter.put(
	'/:id_user',
	[validateToken, validRightUserMiddleware],
	updateUserController,
);

userRouter.delete(
	'/:id_user',
	[validateToken, validRightUserMiddleware],
	deleteUserController,
);

export default userRouter;
