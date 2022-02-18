import nodeMailer from 'nodemailer';

interface ISendMail {
	to: string;
	body: string;
}

export default class EtherealMail {
	static async sendMail({ to, body }: ISendMail): Promise<void> {
		const account = await nodeMailer.createTestAccount();

		const transporter = nodeMailer.createTransport({
			host: account.smtp.host,
			port: account.smtp.port,
			secure: account.smtp.secure,
			auth: {
				user: account.user,
				pass: account.pass,
			},
		});

		const message = await transporter.sendMail({
			from: 'ricardo@teste.com',
			to,
			subject: 'Reset Password',
			text: body,
		});

		console.log('Message sent: %s', message.messageId);
		console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(message));
	}
}
