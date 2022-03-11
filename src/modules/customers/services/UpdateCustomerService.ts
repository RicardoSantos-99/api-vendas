import { getCustomRepository } from 'typeorm';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
	id: string;
	name: string;
	email: string;
}

class UpdateCustomerService {
	public async execute({ email, id, name }: IRequest): Promise<Customer> {
		const customersRepository = getCustomRepository(CustomersRepository);
		const customer = await customersRepository.findById(id);

		if (!customer) throw new AppError('Customer not found');

		const customerExists = await customersRepository.findByEmail(email);

		if (customerExists && email !== customer.email) {
			throw new AppError('Email already exists');
		}

		customer.name = name;
		customer.email = email;

		await customersRepository.save(customer);
		return customer;
	}
}

export default UpdateCustomerService;
