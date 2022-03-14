import AppError from '@shared/errors/AppError';
import { IDeleteCustomer } from '@modules/customers/domain/models/IDeleteCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteCustomerService {
	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,
	) {}
	public async execute({ id }: IDeleteCustomer): Promise<void> {
		const customer = await this.customersRepository.findById(id);

		if (!customer) throw new AppError('Customer not found');

		await this.customersRepository.remove(customer);
	}
}

export default DeleteCustomerService;
