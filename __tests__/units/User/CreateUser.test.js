const truncate = require('../../utils/truncate')
const UserDao = require('../../../src/components/User/UserDao')

describe('Create user', () => {
  beforeEach(async () => await truncate())

  afterAll(async () => await truncate())

  const mockUser = {
    email: 'testUnit1@test.com',
    password: '12345678'
  }

  it('Should not persist in base a user when this user already exists', async () => {
    await UserDao.setUser(mockUser)

    await expect(UserDao.setUser(mockUser)).rejects.toThrow()
  })

  it('Should persist in base a valid user when pass a valid email and password', async () => {
    await UserDao.setUser(mockUser)

    const [{ dataValues }] = await UserDao.getUsers({ email: mockUser.email })

    expect(dataValues.email).toBe(mockUser.email)
  })
})
