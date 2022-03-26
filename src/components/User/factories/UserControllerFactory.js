const UserServiceWithMySqlFactory = require('./UserServiceWithMySqlFactory');
const Login = require('../Login/LoginController');
const Logout = require('../Logout/LogoutController');
const VerifyEmail = require('../VerifyEmail/VerifyEmailController');
const CreateUser = require('../CreateUser/CreateUserController');
const ModifyUser = require('../ModifyUser/ModifyUserController');
const RemoveUser = require('../RemoveUser/RemoveUserController');
const ReturnUser = require('../ReturnUser/ReturnUserController');
const ReturnUsers = require('../ReturnUsers/ReturnUsersController');
const WinstonLog = require('../../../helpers/logs/WinstonLog');
const ParamTypeValidator = require('../../../helpers/ParamTypeValidator');

class UserControllerFactory {
	static makeLogin() {
		return new Login(
			UserServiceWithMySqlFactory.loginService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeLogout() {
		return new Logout(
			UserServiceWithMySqlFactory.logoutService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeVerifyEmail() {
		return new VerifyEmail(
			UserServiceWithMySqlFactory.verifyEmailService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeCreateUser() {
		return new CreateUser(
			UserServiceWithMySqlFactory.createUserService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeModifyUser() {
		return new ModifyUser(
			UserServiceWithMySqlFactory.modifyUserService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeRemoveUser() {
		return new RemoveUser(
			UserServiceWithMySqlFactory.removeUserService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeReturnUser() {
		return new ReturnUser(
			UserServiceWithMySqlFactory.returnUserService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}

	static makeReturnUsers() {
		return new ReturnUsers(
			UserServiceWithMySqlFactory.returnUsersService(),
			WinstonLog,
			ParamTypeValidator,
		);
	}
}

module.exports = UserControllerFactory;
