const NotFoundError = require('./errors/NotFoundError');
const ServerError = require('./errors/ServerError');

class HttpResponse {
	static ok(body) {
		return {
			statusCode: 200,
			body,
		};
	}

	static okWithoutBody() {
		return {
			statusCode: 201,
		};
	}

	static badRequest(error) {
		const statusCode = 400;
		const message = error.message;
		return { statusCode, message };
	}

	static notFound(paramIdentification) {
		const statusCode = 404;
		const message = new NotFoundError(paramIdentification).message;
		return { statusCode, message };
	}

	static serverError() {
		const statusCode = 500;
		const message = new ServerError().message;
		return { statusCode, message };
	}
}

module.exports = HttpResponse;
