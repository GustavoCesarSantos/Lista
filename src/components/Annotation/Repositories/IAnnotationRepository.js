class IAnnotationRepository {
  create (annotation) { throw new Error('Método não implementado.') }
  findOne (annotationId) { throw new Error('Método não implementado.') }
  findMany (query) { throw new Error('Método não implementado.') }
  modify (annotation) { throw new Error('Método não implementado.') }
  remove (annotationId) { throw new Error('Método não implementado.') }
}

module.exports = IAnnotationRepository
