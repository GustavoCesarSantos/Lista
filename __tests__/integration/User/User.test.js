const request = require('supertest')

const app = require('../../../src/config/server/express')
const truncate = require('../../utils/truncate')

describe('User Test Integration', () => {
  beforeEach(async () => await truncate())

  it('Should create a valid user when pass a valid email and password in request body', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'testIntegration@test.com',
        password: '12345678'
      })
    expect(response.status).toBe(201)
  })
})
