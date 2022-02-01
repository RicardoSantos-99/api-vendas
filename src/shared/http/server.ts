import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from './errors/AppError';

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

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

		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
		});
	},
);

app.listen(3333, () => {
	console.log('Server is running on port 3333');
});
