const adaptRoute = require('../infra/adapters/expressRoutesAdapter');
const AnnotationControllerFactory = require('../components/Annotation/factories/AnnotationControllerFactory');
const authenticationToken = require('../middlewares/authenticationToken');

module.exports = app => {
	app.route('/annotations').get(
		authenticationToken.bearer,
		adaptRoute(
			AnnotationControllerFactory.makeReturnAnnotationsController(),
		),
	);

	app.route('/lists/:listId/annotations').post(
		authenticationToken.bearer,
		adaptRoute(
			AnnotationControllerFactory.makeCreateAnnotationController(),
		),
	);

	app.route('/annotations/:annotationId')
		.get(
			authenticationToken.bearer,
			adaptRoute(
				AnnotationControllerFactory.makeReturnAnnotationController(),
			),
		)
		.patch(
			authenticationToken.bearer,
			adaptRoute(
				AnnotationControllerFactory.makeModifyAnnotationController(),
			),
		)
		.delete(
			authenticationToken.bearer,
			adaptRoute(
				AnnotationControllerFactory.makeRemoveAnnotationController(),
			),
		);
};
