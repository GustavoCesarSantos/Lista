const { Annotations } = require('../../../database/models');
const AnnotationRepositoryMySql = require('../repositories/AnnotationRepositoryMySql');
const CreateAnnotationService = require('../CreateAnnotation/CreateAnnotationService');
const ModifyAnnotationService = require('../ModifyAnnotation/ModifyAnnotationService');
const RemoveAnnotationService = require('../RemoveAnnotation/RemoveAnnotationService');
const ReturnAnnotationService = require('../ReturnAnnotation/ReturnAnnotationService');
const ReturnAnnotationsService = require('../ReturnAnnotations/ReturnAnnotationsService');

const annotationRepositoryMySql = new AnnotationRepositoryMySql(Annotations);

class AnnotationServiceWithMySqlFactory {
	static createAnnotationService() {
		return new CreateAnnotationService(annotationRepositoryMySql);
	}

	static returnAnnotationService() {
		return new ReturnAnnotationService(annotationRepositoryMySql);
	}

	static returnAnnotationsService() {
		return new ReturnAnnotationsService(annotationRepositoryMySql);
	}

	static modifyAnnotationService() {
		return new ModifyAnnotationService(annotationRepositoryMySql);
	}

	static removeAnnotationService() {
		return new RemoveAnnotationService(annotationRepositoryMySql);
	}
}

module.exports = AnnotationServiceWithMySqlFactory;
