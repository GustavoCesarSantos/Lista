const { Annotations } = require('../../../../src/database/models')
const AnnotationRepositorySqlite = require('../../../../src/components/Annotation/Repositories/AnnotationRepositorySqlite')
const CreateAnnotationService = require('../../../../src/components/Annotation/CreateAnnotation/CreateAnnotationService')

let createAnnotationService

describe('CREATE ANNOTATION SERVICE INTEGRATION TEST', () => {
  beforeEach(() => {
    const annotationRepositorySqlite = new AnnotationRepositorySqlite(Annotations)
    createAnnotationService = new CreateAnnotationService(annotationRepositorySqlite)
  })

  test('teste', async () => {
    const data = {
      listId: 1,
      contents: '1'
    }
    await expect(createAnnotationService.execute(data)).rejects.toThrow()
  })
})
