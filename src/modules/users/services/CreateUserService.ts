import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

interface IRequest {
	name: string;
	password: string;
	email: string;
}

class CreateUserService {
	public async execute({ name, email, password }: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository);

		const emailExists = await usersRepository.findByEmail(email);

		if (emailExists)
			throw new AppError('There is already a user with this email');

		const hashedPassword = await hash(password, 8);

		const user = usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		await usersRepository.save(user);

		return user;
	}
}

export default CreateUserService;
