const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const bcryptHelper = require('../helpers/bcryptHelper')
const UserDao = require('../components/User/UserDao')

const returnUserFilteredByEmail = async (email) => {
  const user = await UserDao.getUsers({ email })
  if (user.length === 0) throw new Error('Usuário não existe.')
  return user
}

const verifyIfIsAValidPassword = async (password, encryptedPassword) => {
  const validPassword = await bcryptHelper.comparePassword(password, encryptedPassword)
  if (!validPassword) throw new Error('Senha invalida.')
}

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  }, (email, password, done) => {
    try {
      const user = returnUserFilteredByEmail(email)
      verifyIfIsAValidPassword(password, user.password)
      done(null, user)
    } catch (err) {
      done(err)
    }
  })
)
