import nodeMailer from 'nodemailer';
import aws from 'aws-sdk';
import HandlebarsMailTemplate from '@config/mail/HandlebarsMailTemplate';
import mailConfig from '@config/mail/mail';

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

export default class SESMail {
	static async sendMail({
		to,
		from,
		subject,
		templateData,
	}: ISendMail): Promise<void> {
		const mailTemplate = new HandlebarsMailTemplate();

		const transporter = nodeMailer.createTransport({
			SES: new aws.SES({
				apiVersion: '2010-12-01',
			}),
		});

		const { name, email } = mailConfig.defaults.from;

		const message = await transporter.sendMail({
			from: {
				name: from?.name || name,
				address: from?.email || email,
			},
			to: {
				name: to.name,
				address: to.email,
			},
			subject,
			html: await mailTemplate.parse(templateData),
		});
	}
}
