const Annotation = require('../entities/Annotation');

class CreateAnnotationService {
	constructor(annotationRepository) {
		this.annotationRepository = annotationRepository;
	}

	async execute(createAnnotationRequestDTO) {
		const annotation = new Annotation(createAnnotationRequestDTO);
		await this.annotationRepository.create(annotation);
	}
}

module.exports = CreateAnnotationService;
