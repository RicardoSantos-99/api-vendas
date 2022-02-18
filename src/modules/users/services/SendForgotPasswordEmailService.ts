import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EmailService from '@config/mail/EtherealMail';

interface IRequest {
	email: string;
}

class SendForgotPasswordEmailService {
	public async execute({ email }: IRequest): Promise<void> {
		const usersRepository = getCustomRepository(UsersRepository);
		const userTokensRepository = getCustomRepository(UserTokensRepository);

		const user = await usersRepository.findByEmail(email);

		if (!user) throw new AppError('User does not exists.');

		const userToken = await userTokensRepository.generate(user.id);

		await EmailService.sendMail({
			to: email,
			body: `<p>You requested a password reset. Click here to reset your password: <a href="http://localhost:3000/password/reset?token=${userToken?.token}">Reset Password</a></p>`,
		});
	}
}

export default SendForgotPasswordEmailService;
