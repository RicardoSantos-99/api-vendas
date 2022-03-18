import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';

let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateUser', () => {
	beforeEach(() => {
		fakeHashProvider = new FakeHashProvider();
		fakeUsersRepository = new FakeUsersRepository();
		createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});
	it('should be able to create a new user', async () => {
		const user = await createUser.execute({
			name: 'John Doe',
			email: 'john@teste.com',
			password: '123456',
		});

		expect(user).toHaveProperty('id');
		expect(user.name).toBe('John Doe');
		expect(user.email).toBe('john@teste.com');
		expect(user.password).toBe('123456');
	});

	it('should not be able to create two users with the same email', async () => {
		await createUser.execute({
			name: 'John Doe',
			email: 'john@teste.com',
			password: '123456',
		});

		expect(
			createUser.execute({
				name: 'John Doe',
				email: 'john@teste.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);

		expect(
			createUser.execute({
				name: 'John Doe',
				email: 'john@teste.com',
				password: '123456',
			}),
		).rejects.toHaveProperty('message', 'Email address already used.');
	});
});
