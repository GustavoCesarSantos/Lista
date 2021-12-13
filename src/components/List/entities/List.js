const Joi = require('joi');

const ErrorHandler = require('../../../helpers/ErrorHandler');

const schema = Joi.object({
    id: [Joi.string(), Joi.number()],
    userId: [Joi.string(), Joi.number()],
    name: Joi.string().max(30),
});

class List {
    constructor(list) {
        this.id = list.listId;
        this.userId = list.userId;
        this.name = list.name;
    }

    async isValid() {
        try {
            await schema.validateAsync(this);
        } catch (err) {
            throw new ErrorHandler(err.message, 500);
        }
    }

    async returnsAValidQuery() {
        try {
            await this.isValid();

            const query = {};
            Object.entries(this).forEach((key, value) => {
                if (value && value !== '') query[key] = value;
            });
            return query;
        } catch (err) {
            throw new ErrorHandler(err.message, 500);
        }
    }
}

module.exports = List;
