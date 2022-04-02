const UserServiceWithMySqlFactory = require('./UserServiceWithMySqlFactory');
const Login = require('../Login/LoginController');
const Logout = require('../Logout/LogoutController');
const VerifyEmailController = require('../VerifyEmail/VerifyEmailController');
const CreateUserController = require('../CreateUser/CreateUserController');
const ModifyUserController = require('../ModifyUser/ModifyUserController');
const RemoveUserController = require('../RemoveUser/RemoveUserController');
const ReturnUserController = require('../ReturnUser/ReturnUserController');
const ReturnUsersController = require('../ReturnUsers/ReturnUsersController');
const WinstonLog = require('../../../helpers/logs/WinstonLog');
const ParamTypeValidator = require('../../../helpers/ParamTypeValidator');

class UserControllerFactory {
	static makeLoginController() {
		return new Login(
			UserServiceWithMySqlFactory.loginService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeLogoutController() {
		return new Logout(
			UserServiceWithMySqlFactory.logoutService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeVerifyEmailController() {
		return new VerifyEmailController(
			UserServiceWithMySqlFactory.verifyEmailService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeCreateUserController() {
		return new CreateUserController(
			UserServiceWithMySqlFactory.createUserService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeModifyUserController() {
		return new ModifyUserController(
			UserServiceWithMySqlFactory.modifyUserService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeRemoveUserController() {
		return new RemoveUserController(
			UserServiceWithMySqlFactory.removeUserService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeReturnUserController() {
		return new ReturnUserController(
			UserServiceWithMySqlFactory.returnUserService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeReturnUsersController() {
		return new ReturnUsersController(
			UserServiceWithMySqlFactory.returnUsersService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}
}

module.exports = UserControllerFactory;
