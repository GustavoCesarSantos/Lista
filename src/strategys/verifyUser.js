const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')

const bcryptHelper = require('../helpers/bcrypt')
const UserDao = require('../components/User/UserDao')

const ErrorHandler = require('../helpers/ErrorHandler')

const returnUserFilteredByEmail = async (email) => {
  const user = await UserDao.getUsers({ email })
  if (user.length === 0) throw new ErrorHandler('Usuário não existe.', 404)
  return user[0]
}

const verifyIfIsAValidPassword = async (password, encryptedPassword) => {
  const validPassword = await bcryptHelper.comparePassword(password, encryptedPassword)
  if (!validPassword) throw new ErrorHandler('Senha invalida.', 500)
}

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  }, async (email, password, done) => {
    try {
      const user = await returnUserFilteredByEmail(email)
      await verifyIfIsAValidPassword(password, user.password)
      done(null, user)
    } catch (err) {
      done(err)
    }
  })
)
