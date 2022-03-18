import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
	beforeEach(() => {
		fakeCustomersRepository = new FakeCustomersRepository();
		createCustomer = new CreateCustomerService(fakeCustomersRepository);
	});
	it('should be able to create a new customer', async () => {
		const customer = await createCustomer.execute({
			name: 'John Doe',
			email: 'john@teste.com',
		});

		expect(customer).toHaveProperty('id');
		expect(customer.name).toBe('John Doe');
		expect(customer.email).toBe('john@teste.com');
	});

	it('should not be able to create two customer with the same email', async () => {
		await createCustomer.execute({
			name: 'John Doe',
			email: 'john@teste.com',
		});

		expect(
			createCustomer.execute({
				name: 'John Doe',
				email: 'john@teste.com',
			}),
		).rejects.toBeInstanceOf(AppError);

		expect(
			createCustomer.execute({
				name: 'John Doe',
				email: 'john@teste.com',
			}),
		).rejects.toHaveProperty('message', 'Email already exists');
	});
});
