const authenticationToken = require('../middlewares/authenticationToken');
const AnnotationServiceWithMySqlFactory = require('../components/Annotation/factories/AnnotationServiceWithMySqlFactory');
const CreateAnnotationController = require('../components/Annotation/CreateAnnotation/CreateAnnotationController');
const ModifyAnnotationController = require('../components/Annotation/ModifyAnnotation/ModifyAnnotationController');
const ParamTypeValidator = require('../helpers/ParamTypeValidator');
const RemoveAnnotationController = require('../components/Annotation/RemoveAnnotation/RemoveAnnotationController');
const ReturnAnnotationController = require('../components/Annotation/ReturnAnnotation/ReturnAnnotationController');
const ReturnAnnotationsController = require('../components/Annotation/ReturnAnnotations/ReturnAnnotationsController');
const WinstonLog = require('../helpers/logs/WinstonLog');

const createAnnotationController = new CreateAnnotationController(
	AnnotationServiceWithMySqlFactory.createAnnotationService(),
	WinstonLog,
	ParamTypeValidator,
);
const returnAnnotationController = new ReturnAnnotationController(
	AnnotationServiceWithMySqlFactory.returnAnnotationService(),
	WinstonLog,
	ParamTypeValidator,
);
const returnAnnotationsController = new ReturnAnnotationsController(
	AnnotationServiceWithMySqlFactory.returnAnnotationsService(),
	WinstonLog,
);
const modifyAnnotationController = new ModifyAnnotationController(
	AnnotationServiceWithMySqlFactory.modifyAnnotationService(),
	WinstonLog,
	ParamTypeValidator,
);
const removeAnnotationController = new RemoveAnnotationController(
	AnnotationServiceWithMySqlFactory.removeAnnotationService(),
	WinstonLog,
	ParamTypeValidator,
);

module.exports = app => {
	app.route('/annotations').get(
		authenticationToken.bearer,
		returnAnnotationsController.handle.bind(returnAnnotationsController),
	);

	app.route('/lists/:listId/annotations').post(
		authenticationToken.bearer,
		createAnnotationController.handle.bind(createAnnotationController),
	);

	app.route('/annotations/:annotationId')
		.get(
			authenticationToken.bearer,
			returnAnnotationController.handle.bind(returnAnnotationController),
		)
		.patch(
			authenticationToken.bearer,
			modifyAnnotationController.handle.bind(modifyAnnotationController),
		)
		.delete(
			authenticationToken.bearer,
			removeAnnotationController.handle.bind(removeAnnotationController),
		);
};
