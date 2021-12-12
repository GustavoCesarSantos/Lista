const BearerStrategy = require('passport-http-bearer');
const passport = require('passport');

const tokenHelper = require('../helpers/token');
const { Users } = require('../database/models');
const UserRepositoryMySql = require('../components/User/repositories/UserRepositoryMySql');

const userRepositoryMySql = new UserRepositoryMySql(Users);

passport.use(
    new BearerStrategy(async (token, done) => {
        try {
            const userId = await tokenHelper.verifyToken(token);
            const user = await userRepositoryMySql.findOne(userId);
            done(null, user, { token });
        } catch (err) {
            done(err);
        }
    }),
);
