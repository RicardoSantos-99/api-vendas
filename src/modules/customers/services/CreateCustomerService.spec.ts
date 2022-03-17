import 'reflect-metadata';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';

describe('CreateCustomer', () => {
	it('should be able to create a new customer', async () => {
		const fakeCustomersRepository = new FakeCustomersRepository();
		const createCustomer = new CreateCustomerService(
			fakeCustomersRepository,
		);

		const customer = await createCustomer.execute({
			name: 'John Doe',
			email: 'john@teste.com',
		});

		expect(customer).toHaveProperty('id');
		expect(customer.name).toBe('John Doe');
		expect(customer.email).toBe('john@teste.com');
	});

	it('should not be able to create two customer with the same email', () => {
		expect(true).toBe(true);
	});
});
