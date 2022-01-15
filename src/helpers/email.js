/* global process */

const nodemailer = require('nodemailer');

const WinstonLog = require('./logs/WinstonLog');

class Email {
	constructor() {
		this.productionEmailConfiguration = {
			host: process.env.EMAIL_HOST,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
			secure: true,
		};
	}

	async sendEmail() {
		const emailConfiguration = await this.createEmailConfiguration();
		const transporter = nodemailer.createTransport(emailConfiguration);
		const sendedEmail = await transporter.sendMail(this);

		if (`${process.env.NODE_ENV}` !== 'production') {
			return WinstonLog.info(
				`URL: ${nodemailer.getTestMessageUrl(sendedEmail)}`,
			);
		}

		return true;
	}

	testEmailConfiguration(testEmail) {
		return {
			host: 'smtp.ethereal.email',
			auth: testEmail,
		};
	}

	async createEmailConfiguration() {
		if (process.env.NODE_ENV === 'production') {
			return this.productionEmailConfiguration;
		}

		const testEmail = await nodemailer.createTestAccount();
		return this.testEmailConfiguration(testEmail);
	}
}

module.exports = Email;
