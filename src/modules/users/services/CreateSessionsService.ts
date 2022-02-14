import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
	password: string;
	email: string;
}

interface IResponse {
	user: User;
	token: string;
}

class CreateSessionService {
	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const usersRepository = getCustomRepository(UsersRepository);

		const user = await usersRepository.findByEmail(email);

		if (!user) throw new AppError('Incorrect email/password combination');

		const passwordConfirmed = await compare(password, user.password);

		if (!passwordConfirmed)
			throw new AppError('Incorrect email/password combination');

		const token = sign({}, authConfig.jwt.secret, {
			subject: user.id,
			expiresIn: authConfig.jwt.expiresIn,
		});

		return { user, token };
	}
}

export default CreateSessionService;
