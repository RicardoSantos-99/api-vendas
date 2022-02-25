import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';
import { instanceToInstance } from 'class-transformer';

class UsersController {
	public async index(
		request: Request,
		response: Response,
	): Promise<Response> {
		const listUser = new ListUserService();

		const users = await listUser.execute();

		return response.json(instanceToInstance(users));
	}

	public async create(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { name, email, password } = request.body;
		const createUser = new CreateUserService();

		const user = await createUser.execute({
			name,
			email,
			password,
		});

		return response.json(instanceToInstance(user));
	}
}

export default UsersController;
