class ParamTypeValidator {
	static isString(param) {
		return typeof param === 'string';
	}
}

module.exports = ParamTypeValidator;
