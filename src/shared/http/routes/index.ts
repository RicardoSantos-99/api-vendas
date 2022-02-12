import { Router } from 'express';
import productsRouter from '@modules/products/routes/product.routes';
import usersRouter from '@modules/users/routes/user.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/products', productsRouter);

export default routes;
