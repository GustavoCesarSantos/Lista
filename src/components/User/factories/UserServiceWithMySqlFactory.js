const AuthenticationRefreshToken = require('../../../middlewares/authenticationRefreshToken');
const AuthenticationVerificationEmail = require('../../../middlewares/authenticationVerificationEmail');
const bcryptHelper = require('../../../helpers/bcrypt');
const CreateUserService = require('../CreateUser/CreateUserService');
const LoginService = require('../Login/LoginService');
const LogoutService = require('../Logout/LogoutService');
const ModifyUserService = require('../ModifyUser/ModifyUserService');
const RemoveUserService = require('../RemoveUser/RemoveUserService');
const ReturnUserService = require('../ReturnUser/ReturnUserService');
const ReturnUsersService = require('../ReturnUsers/ReturnUsersService');
const tokenHelper = require('../../../helpers/token');
const { Users } = require('../../../database/models');
const UserRepositoryMySql = require('../repositories/UserRepositoryMySql');
const VerifyEmailService = require('../VerifyEmail/VerifyEmailService');

const userRepositoryMySql = new UserRepositoryMySql(Users);

class UserServiceWithMySqlFactory {
	static authenticationRefreshToken() {
		return new AuthenticationRefreshToken(userRepositoryMySql);
	}

	static authenticationVerificationEmail() {
		return new AuthenticationVerificationEmail(userRepositoryMySql);
	}

	static loginService() {
		return new LoginService(tokenHelper);
	}

	static logoutService() {
		return new LogoutService(tokenHelper);
	}

	static verifyEmailService() {
		return new VerifyEmailService(userRepositoryMySql);
	}

	static createUserService() {
		return new CreateUserService(userRepositoryMySql, bcryptHelper);
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
