const authenticationToken = require('../middlewares/authenticationToken');
const AnnotationServiceWithMySqlFactory = require('../components/Annotation/factories/AnnotationServiceWithMySqlFactory');
const CreateAnnotationController = require('../components/Annotation/CreateAnnotation/CreateAnnotationController');
const ModifyAnnotationController = require('../components/Annotation/ModifyAnnotation/ModifyAnnotationController');
const RemoveAnnotationController = require('../components/Annotation/RemoveAnnotation/RemoveAnnotationController');
const ReturnAnnotationController = require('../components/Annotation/ReturnAnnotation/ReturnAnnotationController');
const ReturnAnnotationsController = require('../components/Annotation/ReturnAnnotations/ReturnAnnotationsController');

const createAnnotationController = new CreateAnnotationController(
	AnnotationServiceWithMySqlFactory.createAnnotationService(),
);
const returnAnnotationController = new ReturnAnnotationController(
	AnnotationServiceWithMySqlFactory.returnAnnotationService(),
);
const returnAnnotationsController = new ReturnAnnotationsController(
	AnnotationServiceWithMySqlFactory.returnAnnotationsService(),
);
const modifyAnnotationController = new ModifyAnnotationController(
	AnnotationServiceWithMySqlFactory.modifyAnnotationService(),
);
const removeAnnotationController = new RemoveAnnotationController(
	AnnotationServiceWithMySqlFactory.removeAnnotationService(),
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
