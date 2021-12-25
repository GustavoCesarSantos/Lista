class ParamTypeValidator {
	isString(param) {
		return typeof param === 'string';
	}
}

module.exports = ParamTypeValidator;
