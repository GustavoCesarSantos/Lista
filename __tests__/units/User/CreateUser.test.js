const truncate = require('../../utils/truncate')
const UserDao = require('../../../src/components/User/UserDao')

describe('Create user unit test', () => {
  beforeEach(async () => await truncate())

  afterAll(async () => await truncate())

  it('Should persist in base a valid user when pass a valid email and password', async () => {
    const mockUser = {
      email: 'testUnit1@test.com',
      password: '12345678'
    }

    await UserDao.setUser(mockUser)

    const [{ dataValues }] = await UserDao.getUsers({ email: mockUser.email })

    expect(dataValues.email).toBe(mockUser.email)
  })
})
