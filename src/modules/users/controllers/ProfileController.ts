import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

class ProfileController {
	public async show(request: Request, response: Response): Promise<Response> {
		const showProfile = new ShowProfileService();
		const user_id = request.user.id;

		const users = await showProfile.execute({ user_id });

		return response.json(users);
	}

	public async update(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { name, email, password, old_password } = request.body;
		const user_id = request.user.id;

		const updateProfileService = new UpdateProfileService();

		const user = await updateProfileService.execute({
			user_id,
			name,
			email,
			password,
			old_password,
		});

		return response.json(user);
	}
}

export default ProfileController;
