import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';

class UsersController {
	public async index(
		request: Request,
		response: Response,
	): Promise<Response> {
		const listUser = new ListUserService();

		const users = await listUser.execute();

		return response.json(users);
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

		return response.json(user);
	}
}

export default UsersController;
