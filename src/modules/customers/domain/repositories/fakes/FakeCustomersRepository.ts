import { v4 as uuidv4 } from 'uuid';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';

class FakeCustomersRepository implements ICustomersRepository {
	private customers: Customer[] = [];

	public async create({ name, email }: ICreateCustomer): Promise<Customer> {
		const customer = new Customer();

		customer.id = uuidv4();
		customer.name = name;
		customer.email = email;

		this.customers.push(customer);

		return customer;
	}

	public async save(customer: Customer): Promise<Customer> {
		Object.assign(this.customers, customer);
		return customer;
	}

	public async remove(customer: Customer): Promise<void> {
		const customerIndex = this.customers.findIndex(
			findCustomer => findCustomer.id === customer.id,
		);

		this.customers.splice(customerIndex, 1);
	}

	public async findAll(): Promise<Customer[]> {
		return this.customers;
	}

	public async findByName(name: string): Promise<Customer | undefined> {
		const customer = this.customers.find(
			findCustomer => findCustomer.name === name,
		);

		return customer;
	}

	public async findById(id: string): Promise<Customer | undefined> {
		const customer = this.customers.find(
			findCustomer => findCustomer.id === id,
		);

		return customer;
	}

	public async findByEmail(email: string): Promise<Customer | undefined> {
		const customer = this.customers.find(
			findCustomer => findCustomer.email === email,
		);

		return customer;
	}
}

export default FakeCustomersRepository;
