const request = require('supertest')
const app = require('../../src/config/server/express')

const UserDao = require('../../src/components/User/UserDao')

describe('Sample Test', () => {
  it('should test that true === true', async () => {
    await UserDao.setUser({
      email: 'test@test.com',
      password: '12345678'
    })

    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: '12345678'
      })

    expect(response.status).toBe(200)
  })
})
