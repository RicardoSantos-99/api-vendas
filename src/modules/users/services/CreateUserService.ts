import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
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

		const hashedPassword = await hash(password, 8);

		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		return user;
	}
}

export default CreateUserService;
