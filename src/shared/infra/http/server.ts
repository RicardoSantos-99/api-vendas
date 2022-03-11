import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';

import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);
app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);
app.use(errors());

app.use(
	(
		error: Error,
		request: Request,
		response: Response,
		next: NextFunction,
	) => {
		if (error instanceof AppError) {
			return response.status(error.statusCode).json({
				status: 'error',
				message: error.message,
			});
		}

		console.log('-> ~ error', error);

		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
		});
	},
);

app.listen(3333, () => {
	console.log('Server is running on port 3333');
});
