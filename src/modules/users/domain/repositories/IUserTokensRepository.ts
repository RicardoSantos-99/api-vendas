import { IUserToken } from '@modules/users/domain/models/IUserToken';

export interface IUserTokensRepository {
	findByToken(token: string): Promise<IUserToken | undefined>;
	generate(user_id: string): Promise<IUserToken>;
}
