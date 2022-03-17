import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { sign, Secret } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { ICreateSession } from '@modules/users/domain/models/ICreateSession';
import { IUserAuthenticated } from '@modules/users/domain/models/IUserAuthenticated';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';

@injectable()
class CreateSessionsService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({
		email,
		password,
	}: ICreateSession): Promise<IUserAuthenticated> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Incorrect email/password combination.', 401);
		}

		const passwordConfirmed = await this.hashProvider.compareHash(
			password,
			user.password,
		);

		if (!passwordConfirmed) {
			throw new AppError('Incorrect email/password combination.', 401);
		}

		const token = sign({}, authConfig.jwt.secret as Secret, {
			subject: user.id,
			expiresIn: authConfig.jwt.expiresIn,
		});

		return {
			user,
			token,
		};
	}
}

export default CreateSessionsService;
