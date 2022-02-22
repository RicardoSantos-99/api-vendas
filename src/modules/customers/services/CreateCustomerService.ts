import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
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
		await customersRepository.save(customer);
		return customer;
	}
}

export default CreateCustomerService;
