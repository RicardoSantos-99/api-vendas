import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EmailService from '@config/mail/EtherealMail';
import path from 'path';

interface IRequest {
	email: string;
}

class SendForgotPasswordEmailService {
	public async execute({ email }: IRequest): Promise<void> {
		const usersRepository = getCustomRepository(UsersRepository);
		const userTokensRepository = getCustomRepository(UserTokensRepository);

		const user = await usersRepository.findByEmail(email);

		if (!user) throw new AppError('User does not exists.');

		const { token } = await userTokensRepository.generate(user.id);

		const forgotPasswordTemplate = path.resolve(
			__dirname,
			'..',
			'views',
			'forgot_password.hbs',
		);

		await EmailService.sendMail({
			to: {
				name: user.name,
				email: user.email,
			},
			subject: '[API Vendas] Recuperação de senha',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: user.name,
					link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
				},
			},
		});
	}
}

export default SendForgotPasswordEmailService;
