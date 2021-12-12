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
    authenticationRefreshToken() {
        return new AuthenticationRefreshToken(userRepositoryMySql);
    }

    authenticationVerificationEmail() {
        return new AuthenticationVerificationEmail(userRepositoryMySql);
    }

    loginService() {
        return new LoginService();
    }

    logoutService() {
        return new LogoutService();
    }

    verifyEmailService() {
        return new VerifyEmailService(userRepositoryMySql);
    }

    createUserService() {
        return new CreateUserService(userRepositoryMySql);
    }

    returnUserService() {
        return new ReturnUserService(userRepositoryMySql);
    }

    returnUsersService() {
        return new ReturnUsersService(userRepositoryMySql);
    }

    modifyUserService() {
        return new ModifyUserService(userRepositoryMySql);
    }

    removeUserService() {
        return new RemoveUserService(userRepositoryMySql);
    }
}

module.exports = UserServiceWithMySqlFactory;
