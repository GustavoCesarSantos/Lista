const Annotation = require('../entities/Annotation');
const NotFoundError = require('../../../helpers/errors/NotFoundError');

class ModifyAnnotationService {
	constructor(annotationRepository) {
		this.annotationRepository = annotationRepository;
	}

	async execute(modifyAnnotationRequestDTO) {
		const annotation = new Annotation(modifyAnnotationRequestDTO);
		const hasAnnotation = await this.annotationRepository.findOne(
			annotation.id,
		);
		if (!hasAnnotation) throw new NotFoundError(`${annotation.id}`);
		await this.annotationRepository.modify(annotation);
	}
}

module.exports = ModifyAnnotationService;
