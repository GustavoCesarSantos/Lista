const truncate = require('../../utils/truncate')
const UserDao = require('../../../src/components/User/UserDao')

const mockUser = {
  id: 999,
  email: 'testUnitlist@test.com',
  password: '12345678',
  verifiedEmail: true
}

describe('List user unit test', () => {
  beforeAll(async () => await UserDao.setUser(mockUser))

  afterAll(async () => await truncate())

  it('Should list a specific user', async () => {
    const user = await UserDao.getUser('999')

    expect(user.email).toBe(mockUser.email)
  })
})
