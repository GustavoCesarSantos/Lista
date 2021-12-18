const { Annotations } = require('../../../database/models');
const AnnotationRepositoryMySql = require('../repositories/AnnotationRepositoryMySql');
const CreateAnnotationService = require('../CreateAnnotation/CreateAnnotationService');
const IAnnotationServiceFactory = require('./IAnnotationServiceFactory');
const ListAnnotationService = require('../ListAnnotation/ListAnnotationService');
const ListAnnotationsService = require('../ListAnnotations/ListAnnotationsService');
const ModifyAnnotationService = require('../ModifyAnnotation/ModifyAnnotationService');
const RemoveAnnotationService = require('../RemoveAnnotation/RemoveAnnotationService');

const annotationRepositoryMySql = new AnnotationRepositoryMySql(Annotations);

class AnnotationServiceWithMySqlFactory extends IAnnotationServiceFactory {
	static createAnnotationService() {
		return new CreateAnnotationService(annotationRepositoryMySql);
	}

	static listAnnotationService() {
		return new ListAnnotationService(annotationRepositoryMySql);
	}

	static listAnnotationsService() {
		return new ListAnnotationsService(annotationRepositoryMySql);
	}

	static modifyAnnotationService() {
		return new ModifyAnnotationService(annotationRepositoryMySql);
	}

	static removeAnnotationService() {
		return new RemoveAnnotationService(annotationRepositoryMySql);
	}
}

module.exports = AnnotationServiceWithMySqlFactory;
