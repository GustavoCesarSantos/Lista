const Annotation = require('../entities/Annotation');
const ErrorHandler = require('../../../helpers/ErrorHandler');

class RemoveAnnotationService {
	constructor(annotationRepository) {
		this.annotationRepository = annotationRepository;
	}

	async execute(removeAnnotationRequestDTO) {
		const annotation = new Annotation(removeAnnotationRequestDTO);
		await annotation.isValid();
		const hasAnnotation = await this.annotationRepository.findOne(
			annotation.id,
		);
		if (!hasAnnotation)
			throw new ErrorHandler('Anotação não encontrada', 404);
		await this.annotationRepository.remove(annotation.id);
	}
}

module.exports = RemoveAnnotationService;
