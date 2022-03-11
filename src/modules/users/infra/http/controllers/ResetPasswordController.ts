import { Request, Response } from 'express';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class ResetPasswordController {
	public async create(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { password, token } = request.body;

		const resetPasswordService = new ResetPasswordService();

		await resetPasswordService.execute({ password, token });

		return response.status(204).json();
	}
}

export default ResetPasswordController;
