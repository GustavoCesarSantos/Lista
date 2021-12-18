class ErrorHandler {
	constructor(message, httpCode) {
		Error.call(this);
		Error.captureStackTrace(this);
		this.message = message;
		this.httpCode = httpCode;
	}
}

module.exports = ErrorHandler;
