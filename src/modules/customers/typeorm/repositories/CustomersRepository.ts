import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer> {
	public async findByName(name: string): Promise<Customer | undefined> {
		return await this.findOne({ where: { name } });
	}

	public async findById(id: string): Promise<Customer | undefined> {
		return await this.findOne({ where: { id } });
	}

	public async findByEmail(email: string): Promise<Customer | undefined> {
		return await this.findOne({ where: { email } });
	}
}

export default CustomersRepository;
