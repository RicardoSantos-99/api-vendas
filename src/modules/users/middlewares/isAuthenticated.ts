import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface TokenPayload {
	iat: number;
	exp: number;
	sub: string;
}

function isAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction,
) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		return response.status(401).json({ error: 'JWT token is missing.' });
	}

	const [, token] = authHeader.split(' ');

	try {
		const decodedToken = verify(token, authConfig.jwt.secret);

		const { sub } = decodedToken as TokenPayload;

		request.user = {
			id: sub,
		};

		return next();
	} catch (err) {
		return response.status(401).json({ error: 'Invalid JWT token.' });
	}
}

export default isAuthenticated;
