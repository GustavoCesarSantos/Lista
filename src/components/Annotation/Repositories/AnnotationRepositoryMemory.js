const IAnnotationRepository = require('./IAnnotationRepository')

class AnnotationRepositoryMemory extends IAnnotationRepository {
  constructor () {
    super()
    this.annotations = [
      {
        id: 1,
        listId: 1,
        contents: 'teste'
      }
    ]
  }

  create (annotation) {
    this.annotations.push(annotation)
  }

  findOne (annotationId) {
    return this.annotations.find(annotation => annotation.id === annotationId)
  }

  async findMany (query) {
    return this.annotations
  }

  async modify (annotationQuery) {
    const index = this.annotations.finIndex(annotation => annotation.id === annotationQuery.id)
    this.annotations[index] = annotationQuery
  }

  async remove (annotationId) {
    const index = this.annotations.finIndex(annotation => annotation.id === annotationId)
    this.annotations.splice(index, 1)
  }
}

module.exports = AnnotationRepositoryMemory
