import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import CreateSessionsService from '@modules/users/services/CreateSessionsService';

let fakeHashProvider: FakeHashProvider;
let createSession: CreateSessionsService;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateSession', () => {
	beforeEach(() => {
		fakeHashProvider = new FakeHashProvider();
		fakeUsersRepository = new FakeUsersRepository();
		createSession = new CreateSessionsService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});
	it('should be able to authenticated', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'john@teste.com',
			password: '123456',
		});

		const session = await createSession.execute({
			email: 'john@teste.com',
			password: '123456',
		});

		expect(session).toHaveProperty('token');
		expect(session.user).toEqual(user);
	});

	it('should not be able to authenticated with non existing user email', async () => {
		expect(
			createSession.execute({
				email: 'john@teste.com2',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticated with wrong password', async () => {
		await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'john@trovolta.com',
			password: '123456',
		});

		expect(
			createSession.execute({
				email: 'john@trovolta.com',
				password: '1234567',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
