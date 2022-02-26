import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UsersAvatarController';
import { celebrate, Segments, Joi } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import uploadConfig from '@config/upload';
import multer from 'multer';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, usersController.index);
usersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	usersController.create,
);

usersRouter.patch(
	'/avatar',
	isAuthenticated,
	upload.single('avatar'),
	usersAvatarController.update,
);

export default usersRouter;
