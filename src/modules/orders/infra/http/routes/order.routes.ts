import { Router } from 'express';
import OrdersController from '@modules/orders/infra/http/controllers/OrdersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	ordersController.show,
);

ordersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			customer_id: Joi.string().uuid().required(),
			products: Joi.required(),
		},
	}),
	ordersController.create,
);

export default ordersRouter;
