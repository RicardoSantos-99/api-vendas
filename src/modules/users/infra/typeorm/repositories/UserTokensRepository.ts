import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
	private ormRepository: Repository<UserToken>;

	constructor() {
		this.ormRepository = getRepository(UserToken);
	}

	public async findByToken(token: string): Promise<UserToken | undefined> {
		return await this.ormRepository.findOne({
			where: {
				token,
			},
		});
	}

	public async generate(user_id: string): Promise<UserToken> {
		const userToken = this.ormRepository.create({
			user_id,
		});

		await this.ormRepository.save(userToken);

		return userToken;
	}
}

export default UserTokensRepository;
