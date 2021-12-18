const Email = require('./email');

class VerificationEmail extends Email {
	constructor(user) {
		super();
		this.address = `${process.env.BASE_URL}/users/${user.id}/email/verify`;
		this.from = '"Teste" <gustavocs789@gmail.com>';
		this.to = user.email;
		this.subject = 'teste de email';
		this.text = `Verifique seu e-mail aqui: ${this.address}`;
		this.html = `Verifique seu e-mail aqui: <a href="${this.address}">${this.address}</a>`;
	}
}

module.exports = VerificationEmail;
