import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';

export interface IUsersRepository {
	findAll(): Promise<IUser[]>;
	findByName(name: string): Promise<IUser | undefined>;
	findById(id: string): Promise<IUser | undefined>;
	findByEmail(email: string): Promise<IUser | undefined>;
	create(data: ICreateUser): Promise<IUser>;
	save(user: IUser): Promise<IUser>;
}
