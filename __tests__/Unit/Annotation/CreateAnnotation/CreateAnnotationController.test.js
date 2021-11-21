const logger = require('../../../../src/helpers/logger')
const CreateAnnotationController = require('../../../../src/components/Annotation/CreateAnnotation/CreateAnnotationController')

describe('CREATE ANNOTATION CONTROLLER UNIT TEST', () => {
  beforeEach(() => {
    jest.spyOn(logger, 'info')
      .mockImplementation()

    jest.spyOn(logger, 'error')
      .mockImplementation()
  })

  test('Should catch a error with default http status code', async () => {
    const request = {
      params: { listId: 1 },
      body: { contents: 'text' }
    }
    const response = {
      status (statusCode) { return statusCode },
      send (message) { return message }
    }
    const CreateAnnotationServiceFake = jest.fn().mockImplementation(() => {
      return {
        async execute (data) { throw new Error('Teste') }
      }
    })
    const spy = jest.spyOn(response, 'status')
    const createAnnotationServiceFake = new CreateAnnotationServiceFake()
    const createAnnotationController = new CreateAnnotationController(createAnnotationServiceFake)
    await createAnnotationController.handler(request, response)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(500)
  })

  test('Should catch a error with custom http status code', async () => {
    const request = {
      params: { listId: 1 },
      body: { contents: 'text' }
    }
    const response = {
      status (statusCode) { return statusCode },
      send (message) { return message }
    }
    const CreateAnnotationServiceFake = jest.fn().mockImplementation(() => {
      return {
        async execute (data) {
          const error = new Error('Teste')
          error.httpCode = 401
          throw error
        }
      }
    })
    const spy = jest.spyOn(response, 'status')
    const createAnnotationServiceFake = new CreateAnnotationServiceFake()
    const createAnnotationController = new CreateAnnotationController(createAnnotationServiceFake)
    await createAnnotationController.handler(request, response)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(401)
  })

  test('Should pass', async () => {
    const request = {
      params: { listId: 1 },
      body: { contents: 'text' }
    }
    const response = {
      status (statusCode) { return statusCode },
      end () { }
    }
    const spy = jest.spyOn(response, 'status')
    const CreateAnnotationServiceFake = jest.fn().mockImplementation(() => {
      return {
        execute: data => { return true }
      }
    })
    const createAnnotationServiceFake = new CreateAnnotationServiceFake()
    const createAnnotationController = new CreateAnnotationController(createAnnotationServiceFake)
    await createAnnotationController.handler(request, response)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(201)
  })
})
