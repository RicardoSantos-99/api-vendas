import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
	id: string;
}

class ShowCustomerService {
	async execute({ id }: IRequest): Promise<Customer> {
		const customersRepository = getCustomRepository(CustomersRepository);
		const customer = await customersRepository.findById(id);

		if (!customer) throw new AppError('Customer not found');

		return customer;
	}
}

export default ShowCustomerService;
