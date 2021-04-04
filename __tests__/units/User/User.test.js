const truncate = require('../../utils/truncate')
const UserDao = require('../../../src/components/User/UserDao')

describe('User Test Unit', () => {
  beforeEach(async () => await truncate())

  it('Should persist in base a valid user when pass a valid email and password', async () => {
    await UserDao.setUser({
      email: 'testUnit@test.com',
      password: '12345678'
    })
    const [{ dataValues }] = await UserDao.getUsers({ email: 'testUnit@test.com' })
    expect('testUnit@test.com').toBe(dataValues.email)
  })
})
