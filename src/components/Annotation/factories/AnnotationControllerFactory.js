const AnnotationServiceWithMySqlFactory = require('./AnnotationServiceWithMySqlFactory');
const CreateAnnotationController = require('../CreateAnnotation/CreateAnnotationController');
const ModifyAnnotationController = require('../ModifyAnnotation/ModifyAnnotationController');
const RemoveAnnotationController = require('../RemoveAnnotation/RemoveAnnotationController');
const ReturnAnnotationController = require('../ReturnAnnotation/ReturnAnnotationController');
const ReturnAnnotationsController = require('../ReturnAnnotations/ReturnAnnotationsController');

class AnnotationControllerFactory {
	static makeCreateAnnotationController() {
		return new CreateAnnotationController(
			AnnotationServiceWithMySqlFactory.createAnnotationService(),
		);
	}

	static makeReturnAnnotationController() {
		return new ReturnAnnotationController(
			AnnotationServiceWithMySqlFactory.returnAnnotationService(),
		);
	}

	static makeReturnAnnotationsController() {
		return new ReturnAnnotationsController(
			AnnotationServiceWithMySqlFactory.returnAnnotationsService(),
		);
	}

	static makeModifyAnnotationController() {
		return new ModifyAnnotationController(
			AnnotationServiceWithMySqlFactory.modifyAnnotationService(),
		);
	}

	static makeRemoveAnnotationController() {
		return new RemoveAnnotationController(
			AnnotationServiceWithMySqlFactory.removeAnnotationService(),
		);
	}
}

module.exports = AnnotationControllerFactory;
