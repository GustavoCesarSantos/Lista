const ServerError = require('./Errors/ServerError');

class HttpResponse {
	static badRequest(error) {
		const statusCode = 400;
		const message = error.message;
		return { statusCode, message };
	}

	static serverError() {
		const statusCode = 500;
		const message = new ServerError().message;
		return { statusCode, message };
	}
}

module.exports = HttpResponse;
