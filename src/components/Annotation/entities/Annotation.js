const Joi = require('joi');

const ErrorHandler = require('../../../helpers/ErrorHandler');

const schema = Joi.object({
	id: [Joi.string(), Joi.number()],
	listId: [Joi.string(), Joi.number()],
	contents: Joi.string().max(30),
});

class Annotation {
	constructor(annotation) {
		this.id = annotation.annotationId;
		this.listId = annotation.listId;
		this.contents = annotation.contents;
	}

	async isValid() {
		try {
			await schema.validateAsync(this);
		} catch (err) {
			throw new ErrorHandler(err.message, 400);
		}
	}

	async returnsAValidQuery() {
		try {
			await this.isValid();

			const query = {};
			Object.entries(this).forEach(([key, value]) => {
				if (value && value !== '') query[key] = value;
			});
			return query;
		} catch (err) {
			throw new ErrorHandler(err.message, 400);
		}
	}
}

module.exports = Annotation;
