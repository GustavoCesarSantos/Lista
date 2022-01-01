const authenticationToken = require('../middlewares/authenticationToken');
const AnnotationServiceWithMySqlFactory = require('../components/Annotation/factories/AnnotationServiceWithMySqlFactory');
const CreateAnnotationController = require('../components/Annotation/CreateAnnotation/CreateAnnotationController');
const ModifyAnnotationController = require('../components/Annotation/ModifyAnnotation/ModifyAnnotationController');
const RemoveAnnotationController = require('../components/Annotation/RemoveAnnotation/RemoveAnnotationController');
const ReturnAnnotationController = require('../components/Annotation/ReturnAnnotation/ReturnAnnotationController');
const ReturnAnnotationsController = require('../components/Annotation/ReturnAnnotations/ReturnAnnotationsController');

const annotationServiceWithMySqlFactory =
	new AnnotationServiceWithMySqlFactory();

const createAnnotationController = new CreateAnnotationController(
	annotationServiceWithMySqlFactory.createAnnotationService(),
);
const returnAnnotationController = new ReturnAnnotationController(
	annotationServiceWithMySqlFactory.returnAnnotationService(),
);
const returnAnnotationsController = new ReturnAnnotationsController(
	annotationServiceWithMySqlFactory.returnAnnotationsService(),
);
const modifyAnnotationController = new ModifyAnnotationController(
	annotationServiceWithMySqlFactory.modifyAnnotationService(),
);
const removeAnnotationController = new RemoveAnnotationController(
	annotationServiceWithMySqlFactory.removeAnnotationService(),
);

module.exports = app => {
	app.route('/annotations').get(
		authenticationToken.bearer,
		returnAnnotationsController.handler.bind(returnAnnotationsController),
	);

	app.route('/lists/:listId/annotations').post(
		authenticationToken.bearer,
		createAnnotationController.handler.bind(createAnnotationController),
	);

	app.route('/annotations/:annotationId')
		.get(
			authenticationToken.bearer,
			returnAnnotationController.handler.bind(returnAnnotationController),
		)
		.patch(
			authenticationToken.bearer,
			modifyAnnotationController.handler.bind(modifyAnnotationController),
		)
		.delete(
			authenticationToken.bearer,
			removeAnnotationController.handler.bind(removeAnnotationController),
		);
};
