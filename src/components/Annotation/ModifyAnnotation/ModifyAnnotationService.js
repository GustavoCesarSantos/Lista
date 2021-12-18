const Annotation = require('../entities/Annotation');
const ErrorHandler = require('../../../helpers/ErrorHandler');

class ModifyAnnotationService {
	constructor(annotationRepository) {
		this.annotationRepository = annotationRepository;
	}

	async execute(modifyAnnotationRequestDTO) {
		const annotation = new Annotation(modifyAnnotationRequestDTO);
		await annotation.isValid();
		const hasAnnotation = await this.annotationRepository.findOne(
			annotation.id,
		);
		if (!hasAnnotation)
			throw new ErrorHandler('Anotação não encontrada', 404);
		await this.annotationRepository.modify(annotation);
	}
}

module.exports = ModifyAnnotationService;
