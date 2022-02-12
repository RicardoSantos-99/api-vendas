import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
	name: string;
	password: string;
	email: string;
}

class CreateUserService {
	public async execute({ name, email, password }: IRequest): Promise<User> {
		const userRepository = getCustomRepository(UserRepository);

		const emailExists = await userRepository.findByEmail(email);

		if (emailExists)
			throw new AppError('There is already a user with this email');

		const user = userRepository.create({
			name,
			email,
			password,
		});

		await userRepository.save(user);

		return user;
	}
}

export default CreateUserService;
