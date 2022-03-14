import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { IShowCustomer } from '@modules/customers/domain/models/IShowCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

@injectable()
class ShowCustomerService {
	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,
	) {}
	async execute({ id }: IShowCustomer): Promise<Customer> {
		const customer = await this.customersRepository.findById(id);

		if (!customer) throw new AppError('Customer not found');

		return customer;
	}
}

export default ShowCustomerService;
