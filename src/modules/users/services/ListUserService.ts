import { inject, injectable } from 'tsyringe';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
class ListUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute(): Promise<IUser[]> {
		const users = this.usersRepository.findAll();

		return users;
	}
}

export default ListUserService;
