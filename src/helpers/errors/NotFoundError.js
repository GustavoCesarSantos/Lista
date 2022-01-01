class NotFoundError extends Error {
	constructor(paramIdentification) {
		super(`Not found: ${paramIdentification}`);
		this.name = 'NotFoundError';
	}
}

module.exports = NotFoundError;
