import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({
		name,
		email,
		password,
	}: ICreateUser): Promise<IUser> {
		const emailExists = await this.usersRepository.findByEmail(email);

		if (emailExists) {
			throw new AppError('Email address already used.');
		}

		const hashedPassword = await this.hashProvider.generateHash(password);

		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		return user;
	}
}

export default CreateUserService;
