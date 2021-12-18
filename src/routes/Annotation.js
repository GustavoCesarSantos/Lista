const authenticationToken = require('../middlewares/authenticationToken');
const AnnotationServiceWithMySqlFactory = require('../components/Annotation/factories/AnnotationServiceWithMySqlFactory');
const CreateAnnotationController = require('../components/Annotation/CreateAnnotation/CreateAnnotationController');
const ListAnnotationController = require('../components/Annotation/ListAnnotation/ListAnnotationController');
const ListAnnotationsController = require('../components/Annotation/ListAnnotations/ListAnnotationsController');
const ModifyAnnotationController = require('../components/Annotation/ModifyAnnotation/ModifyAnnotationController');
const RemoveAnnotationController = require('../components/Annotation/RemoveAnnotation/RemoveAnnotationController');

const annotationServiceWithMySqlFactory =
	new AnnotationServiceWithMySqlFactory();

const createAnnotationController = new CreateAnnotationController(
	annotationServiceWithMySqlFactory.createAnnotationService(),
);
const listAnnotationController = new ListAnnotationController(
	annotationServiceWithMySqlFactory.listAnnotationService(),
);
const listAnnotationsController = new ListAnnotationsController(
	annotationServiceWithMySqlFactory.listAnnotationsService(),
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
		listAnnotationsController.handler.bind(listAnnotationsController),
	);

	app.route('/lists/:listId/annotations').post(
		authenticationToken.bearer,
		createAnnotationController.handler.bind(createAnnotationController),
	);

	app.route('/annotations/:annotationId')
		.get(
			authenticationToken.bearer,
			listAnnotationController.handler.bind(listAnnotationController),
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
