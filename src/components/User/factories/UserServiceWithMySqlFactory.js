const AuthenticationRefreshToken = require('../../../middlewares/authenticationRefreshToken');
const AuthenticationVerificationEmail = require('../../../middlewares/authenticationVerificationEmail');
const CreateUserService = require('../CreateUser/CreateUserService');
const IUserServiceFactory = require('./IUserServiceFactory');
const LoginService = require('../Login/LoginService');
const LogoutService = require('../Logout/LogoutService');
const ModifyUserService = require('../ModifyUser/ModifyUserService');
const RemoveUserService = require('../RemoveUser/RemoveUserService');
const ReturnUserService = require('../ReturnUser/ReturnUserService');
const ReturnUsersService = require('../ReturnUsers/ReturnUsersService');
const { User } = require('../../../database/models');
const UserRepositoryMySql = require('../repositories/UserRepositoryMySql');
const VerifyEmailService = require('../VerifyEmail/VerifyEmailService');

const userRepositoryMySql = new UserRepositoryMySql(User);

class UserServiceWithMySqlFactory extends IUserServiceFactory {
	static authenticationRefreshToken() {
		return new AuthenticationRefreshToken(userRepositoryMySql);
	}

	static authenticationVerificationEmail() {
		return new AuthenticationVerificationEmail(userRepositoryMySql);
	}

	static loginService() {
		return new LoginService();
	}

	static logoutService() {
		return new LogoutService();
	}

	static verifyEmailService() {
		return new VerifyEmailService(userRepositoryMySql);
	}

	static createUserService() {
		return new CreateUserService(userRepositoryMySql);
	}

	static returnUserService() {
		return new ReturnUserService(userRepositoryMySql);
	}

	static returnUsersService() {
		return new ReturnUsersService(userRepositoryMySql);
	}

	static modifyUserService() {
		return new ModifyUserService(userRepositoryMySql);
	}

	static removeUserService() {
		return new RemoveUserService(userRepositoryMySql);
	}
}

module.exports = UserServiceWithMySqlFactory;
