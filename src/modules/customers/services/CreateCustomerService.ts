import { getCustomRepository } from 'typeorm';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
	name: string;
	email: string;
}

class CreateCustomerService {
	public async execute({ name, email }: IRequest): Promise<Customer> {
		const customersRepository = getCustomRepository(CustomersRepository);
		const emailExists = await customersRepository.findByEmail(email);

		if (emailExists) throw new AppError('Email already exists');

		const customer = customersRepository.create({
			name,
			email,
		});

		return customer;
	}
}

export default CreateCustomerService;
