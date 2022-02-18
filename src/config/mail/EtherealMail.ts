import nodeMailer from 'nodemailer';
import HandlebarsMailTemplate from '@config/mail/HandlebarsMailTemplate';

interface IMailContact {
	name: string;
	email: string;
}

interface ITemplateVariables {
	[key: string]: string | number;
}

interface IParseMailTemplate {
	file: string;
	variables: ITemplateVariables;
}

interface ISendMail {
	to: IMailContact;
	from?: IMailContact;
	subject: string;
	templateData: IParseMailTemplate;
}

export default class EtherealMail {
	static async sendMail({
		to,
		from,
		subject,
		templateData,
	}: ISendMail): Promise<void> {
		const account = await nodeMailer.createTestAccount();

		const mailTemplate = new HandlebarsMailTemplate();

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
			from: {
				name: from?.name || 'Equipe API',
				address: from?.email || 'equipe@apivendas.com.br',
			},
			to: {
				name: to.name,
				address: to.email,
			},
			subject,
			html: await mailTemplate.parse(templateData),
		});

		console.log('Message sent: %s', message.messageId);
		console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(message));
	}
}
