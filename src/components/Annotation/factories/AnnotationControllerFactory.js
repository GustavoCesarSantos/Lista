const AnnotationServiceWithMySqlFactory = require('./AnnotationServiceWithMySqlFactory');
const CreateAnnotationController = require('../CreateAnnotation/CreateAnnotationController');
const ModifyAnnotationController = require('../ModifyAnnotation/ModifyAnnotationController');
const RemoveAnnotationController = require('../RemoveAnnotation/RemoveAnnotationController');
const ReturnAnnotationController = require('../ReturnAnnotation/ReturnAnnotationController');
const ReturnAnnotationsController = require('../ReturnAnnotations/ReturnAnnotationsController');
const WinstonLog = require('../../../helpers/logs/WinstonLog');
const ParamTypeValidator = require('../../../helpers/ParamTypeValidator');

class AnnotationControllerFactory {
	static makeCreateAnnotationController() {
		return new CreateAnnotationController(
			AnnotationServiceWithMySqlFactory.createAnnotationService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeReturnAnnotationController() {
		return new ReturnAnnotationController(
			AnnotationServiceWithMySqlFactory.returnAnnotationService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeReturnAnnotationsController() {
		return new ReturnAnnotationsController(
			AnnotationServiceWithMySqlFactory.returnAnnotationsService(),
			WinstonLog,
		);
	}

	static makeModifyAnnotationController() {
		return new ModifyAnnotationController(
			AnnotationServiceWithMySqlFactory.modifyAnnotationService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeRemoveAnnotationController() {
		return new RemoveAnnotationController(
			AnnotationServiceWithMySqlFactory.removeAnnotationService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}
}

module.exports = AnnotationControllerFactory;
