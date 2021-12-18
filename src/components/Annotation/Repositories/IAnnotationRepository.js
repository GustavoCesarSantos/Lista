/* eslint-disable no-unused-vars */

class IAnnotationRepository {
	static create(annotation) {
		throw new Error('Método não implementado.');
	}

	static findOne(annotationId) {
		throw new Error('Método não implementado.');
	}

	static findMany(query) {
		throw new Error('Método não implementado.');
	}

	static modify(annotation) {
		throw new Error('Método não implementado.');
	}

	static remove(annotationId) {
		throw new Error('Método não implementado.');
	}
}

module.exports = IAnnotationRepository;
