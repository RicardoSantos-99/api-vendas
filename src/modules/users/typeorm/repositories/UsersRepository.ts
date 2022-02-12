import User from '../entities/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
	public async findByName(name: string): Promise<User | undefined> {
		return await this.findOne({ where: { name } });
	}

	public async findById(id: string): Promise<User | undefined> {
		return await this.findOne({ where: { id } });
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		return await this.findOne({ where: { email } });
	}
}

export default UsersRepository;
