const ListAnnotationsController = require('../../../../src/components/Annotation/ListAnnotations/ListAnnotationsController')
const logger = require('../../../../src/helpers/logger')

describe('LIST ANNOTATIONS CONTROLLER UNIT TEST', () => {
  beforeEach(() => {
    jest.spyOn(logger, 'info')
      .mockImplementation()

    jest.spyOn(logger, 'error')
      .mockImplementation()
  })

  test('Should catch an error with default http status code', async () => {
    const request = {
      query: { }
    }
    const response = {
      status (statusCode) { return statusCode },
      send (message) { return message }
    }
    const ListAnnotationsServiceFake = jest.fn().mockImplementation(() => {
      return {
        async execute (data) { throw new Error('Teste') }
      }
    })
    const spy = jest.spyOn(response, 'status')
    const listAnnotationsServiceFake = new ListAnnotationsServiceFake()
    const listAnnotationsController = new ListAnnotationsController(listAnnotationsServiceFake)
    await listAnnotationsController.handler(request, response)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(500)
  })

  test('Should catch an error with custom http status code', async () => {
    const request = {
      query: {}
    }
    const response = {
      status (statusCode) { return statusCode },
      send (message) { return message }
    }
    const ListAnnotationsServiceFake = jest.fn().mockImplementation(() => {
      return {
        async execute (data) {
          const error = new Error('Teste')
          error.httpCode = 404
          throw error
        }
      }
    })
    const spy = jest.spyOn(response, 'status')
    const listAnnotationsServiceFake = new ListAnnotationsServiceFake()
    const listAnnotationsController = new ListAnnotationsController(listAnnotationsServiceFake)
    await listAnnotationsController.handler(request, response)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(404)
  })

  test('Should pass with http status code 200', async () => {
    const request = {
      query: { }
    }
    const response = {
      status (statusCode) { return statusCode },
      json (data) { return data }
    }
    const spy = jest.spyOn(response, 'status')
    const ListAnnotationsServiceFake = jest.fn().mockImplementation(() => {
      return {
        execute: data => { return data }
      }
    })
    const listAnnotationsServiceFake = new ListAnnotationsServiceFake()
    const listAnnotationsController = new ListAnnotationsController(listAnnotationsServiceFake)
    await listAnnotationsController.handler(request, response)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(200)
  })

  test('Should return a valid content', async () => {
    const request = {
      query: { }
    }
    const response = {
      status (statusCode) { return statusCode },
      json (data) { return data }
    }
    const spy = jest.spyOn(response, 'json')
    const ListAnnotationsServiceFake = jest.fn().mockImplementation(() => {
      return {
        execute: data => { return { contents: 'Teste' } }
      }
    })
    const listAnnotationsServiceFake = new ListAnnotationsServiceFake()
    const listAnnotationsController = new ListAnnotationsController(listAnnotationsServiceFake)
    await listAnnotationsController.handler(request, response)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({ contents: 'Teste' })
  })
})
