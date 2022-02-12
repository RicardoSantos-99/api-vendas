import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
	password: string;
	email: string;
}

class CreateSessionService {
	public async execute({ email, password }: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository);

		const user = await usersRepository.findByEmail(email);

		if (!user) throw new AppError('Incorrect email/password combination');

		const passwordConfirmed = await compare(password, user.password);

		if (!passwordConfirmed)
			throw new AppError('Incorrect email/password combination');

		return user;
	}
}

export default CreateSessionService;
