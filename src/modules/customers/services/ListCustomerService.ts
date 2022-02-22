import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class ListCustomerService {
	public async execute(): Promise<Customer[]> {
		const customersRepository = getCustomRepository(CustomersRepository);
		return await customersRepository.find();
	}
}

export default ListCustomerService;
