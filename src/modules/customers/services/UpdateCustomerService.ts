import { injectable, inject } from 'tsyringe';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';
import { IUpdateCustomer } from '@modules/customers/domain/models/IUpdateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

@injectable()
class UpdateCustomerService {
	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,
	) {}

	public async execute({
		id,
		name,
		email,
	}: IUpdateCustomer): Promise<Customer> {
		const customer = await this.customersRepository.findById(id);

		if (!customer) {
			throw new AppError('Customer not found.');
		}

		const customerExists = await this.customersRepository.findByEmail(
			email,
		);

		if (customerExists && email !== customer.email) {
			throw new AppError(
				'There is already one customer with this email.',
			);
		}

		customer.name = name;
		customer.email = email;

		await this.customersRepository.save(customer);

		return customer;
	}
}

export default UpdateCustomerService;
