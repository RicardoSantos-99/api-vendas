import AppError from '@shared/errors/AppError';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCustomerService {
	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,
	) {}

	public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
		const emailExists = await this.customersRepository.findByEmail(email);

		if (emailExists) throw new AppError('Email already exists');

		const customer = this.customersRepository.create({
			name,
			email,
		});

		return customer;
	}
}

export default CreateCustomerService;
