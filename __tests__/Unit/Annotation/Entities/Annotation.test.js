const Annotation = require('../../../../src/components/Annotation/Entities/Annotation')

describe('ENTITY ANNOTATION UNIT TEST', () => {
  test('Should not create a annotation object when passed a integer value in contents property', () => {
    const data = {
      listId: 1,
      contents: 1
    }
    const annotation = new Annotation(data)
    annotation.isValid().catch(error => expect(error.message).toBe('"contents" must be a string'))
  })

  test('Should not create a query', () => {
    const data = {}
    const annotation = new Annotation(data)
    expect(annotation.returnsAValidQuery()).resolves.toEqual({})
  })

  test('Should create a valid annotation object', () => {
    const data = {
      annotationId: 1,
      listId: 1,
      contents: 'asdf'
    }
    const annotation = new Annotation(data)
    expect(annotation).toEqual({ id: 1, listId: 1, contents: 'asdf' })
  })

  test('Should create a valid query', () => {
    const data = { contents: 'teste' }
    const annotation = new Annotation(data)
    expect(annotation.returnsAValidQuery()).resolves.toEqual(data)
  })
})
