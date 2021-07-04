const truncate = require('../../utils/truncate')
const UserDao = require('../../../src/components/User/UserDao')

describe('List users unit test', () => {
  beforeAll(async () => {
    const mockUser = {
      email: 'testUnit@test.com',
      password: '12345678',
      verifiedEmail: true
    }

    await UserDao.setUser(mockUser)
  })

  afterAll(async () => await truncate())

  it('Should list all users', async () => {
    const users = await UserDao.getUsers()

    expect(users).not.toBe([])
  })
})
