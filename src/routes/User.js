const adaptRoute = require('../infra/adapters/expressRoutesAdapter');
const authenticationToken = require('../middlewares/authenticationToken');
const authenticationUser = require('../middlewares/authenticationUser');
const UserControllerFactory = require('../components/User/factories/UserControllerFactory');
const UserServiceWithMySqlFactory = require('../components/User/factories/UserServiceWithMySqlFactory');

const authenticationRefreshToken =
	UserServiceWithMySqlFactory.authenticationRefreshToken();
const authenticationVerificationEmail =
	UserServiceWithMySqlFactory.authenticationVerificationEmail();

module.exports = app => {
	app.route('/login').post(
		authenticationUser.local,
		adaptRoute(UserControllerFactory.makeLogin()),
	);

	app.route('/logout').post(
		[
			authenticationRefreshToken.refresh.bind(authenticationRefreshToken),
			authenticationToken.bearer,
		],
		adaptRoute(UserControllerFactory.makeLogout()),
	);

	app.route('/users/:userId/tokens/refresh').post(
		authenticationRefreshToken.refresh.bind(authenticationRefreshToken),
		adaptRoute(UserControllerFactory.makeLogin()),
	);

	app.route('/users/:token/emails/verify').get(
		authenticationVerificationEmail.verify.bind(
			authenticationVerificationEmail,
		),
		adaptRoute(UserControllerFactory.makeVerifyEmail()),
	);

	app.route('/users')
		.get(
			authenticationToken.bearer,
			adaptRoute(UserControllerFactory.makeReturnUsers()),
		)
		.post(adaptRoute(UserControllerFactory.makeCreateUser()));

	app.route('/users/:userId')
		.get(
			authenticationToken.bearer,
			adaptRoute(UserControllerFactory.makeReturnUser()),
		)
		.patch(
			authenticationToken.bearer,
			adaptRoute(UserControllerFactory.makeModifyUser()),
		)
		.delete(
			authenticationToken.bearer,
			adaptRoute(UserControllerFactory.makeRemoveUser()),
		);
};
