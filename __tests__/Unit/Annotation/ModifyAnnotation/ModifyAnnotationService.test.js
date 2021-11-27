const ModifyAnnotationService = require('../../../../src/components/Annotation/ModifyAnnotation/ModifyAnnotationService')

describe('MODIFY ANNOTATION SERVICE UNIT TEST', () => {
  test('Should throw  an error when not found an annotation', async () => {
    const annotation = { id: 1 }
    const AnnotationRepositoryFake = jest.fn().mockImplementation(() => {
      return {
        async findOne (data) { return false }
      }
    })
    const annotationRepositoryFake = new AnnotationRepositoryFake()
    const listAnnotationService = new ModifyAnnotationService(annotationRepositoryFake)
    await listAnnotationService.execute(annotation).catch(error => expect(error.message).toBe('Anotação não encontrada'))
  })

  test('Should return an annotation', async () => {
    const annotation = { id: 1 }
    const AnnotationRepositoryFake = jest.fn().mockImplementation(() => {
      return {
        async findOne (data) { return true },
        async modify (data) { }
      }
    })
    const annotationRepositoryFake = new AnnotationRepositoryFake()
    const listAnnotationService = new ModifyAnnotationService(annotationRepositoryFake)
    await expect(listAnnotationService.execute(annotation)).resolves.not.toThrow()
  })
})
