import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IShowUser } from '@modules/users/domain/models/IShowUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUser } from '@modules/users/domain/models/IUser';

@injectable()
class ShowProfileService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ user_id }: IShowUser): Promise<IUser> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found.');
		}

		return user;
	}
}

export default ShowProfileService;
