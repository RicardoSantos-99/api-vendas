import { Router } from 'express';
import productsRouter from '@modules/products/routes/product.routes';
import usersRouter from '@modules/users/routes/user.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
