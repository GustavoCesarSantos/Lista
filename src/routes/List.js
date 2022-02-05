const adaptRoute = require('../infra/adapters/expressRoutesAdapter');
const authenticationToken = require('../middlewares/authenticationToken');
const ListControllerFactory = require('../components/List/factories/ListControllerFactory');

module.exports = app => {
	app.route('/lists').get(
		authenticationToken.bearer,
		adaptRoute(ListControllerFactory.makeReturnListsController()),
	);

	app.route('/users/:userId/lists').post(
		authenticationToken.bearer,
		adaptRoute(ListControllerFactory.makeCreateListController()),
	);

	app.route('/lists/:listId')
		.get(
			authenticationToken.bearer,
			adaptRoute(ListControllerFactory.makeReturnListController()),
		)
		.patch(
			authenticationToken.bearer,
			adaptRoute(ListControllerFactory.makeModifyListController()),
		)
		.delete(
			authenticationToken.bearer,
			adaptRoute(ListControllerFactory.makeRemoveListController()),
		);
};
