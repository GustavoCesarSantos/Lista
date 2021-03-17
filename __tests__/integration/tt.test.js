const UserDao = require('../../src/components/User/UserDao')

describe('Sample Test', () => {
  it('should test that true === true', async () => {
    await UserDao.setUser({
      email: 'test2@test.com',
      password: '12345678'
    })

    const user = await UserDao.getUsers()
    console.log(user)

    expect(1 + 1).toBe(2)
  })
})
