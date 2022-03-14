import { getRepository, Repository } from 'typeorm';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
class CustomersRepository implements ICustomersRepository {
	private ormRepository: Repository<Customer>;

	constructor() {
		this.ormRepository = getRepository(Customer);
	}

	public async create({ name, email }: ICreateCustomer): Promise<Customer> {
		const customer = this.ormRepository.create({ name, email });

		await this.ormRepository.save(customer);

		return customer;
	}

	public async save(customer: Customer): Promise<Customer> {
		await this.ormRepository.save(customer);

		return customer;
	}

	public async remove(customer: Customer): Promise<void> {
		await this.ormRepository.remove(customer);
	}

	public async findAll(): Promise<Customer[]> {
		return await this.ormRepository.find();
	}

	public async findByName(name: string): Promise<Customer | undefined> {
		return await this.ormRepository.findOne({ where: { name } });
	}

	public async findById(id: string): Promise<Customer | undefined> {
		return await this.ormRepository.findOne({ where: { id } });
	}

	public async findByEmail(email: string): Promise<Customer | undefined> {
		return await this.ormRepository.findOne({ where: { email } });
	}
}

export default CustomersRepository;
