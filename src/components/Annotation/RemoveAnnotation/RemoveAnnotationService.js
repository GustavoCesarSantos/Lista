const Annotation = require('../entities/Annotation');
const NotFoundError = require('../../../helpers/errors/NotFoundError');

class RemoveAnnotationService {
	constructor(annotationRepository) {
		this.annotationRepository = annotationRepository;
	}

	async execute(removeAnnotationRequestDTO) {
		const annotation = new Annotation(removeAnnotationRequestDTO);
		const hasAnnotation = await this.annotationRepository.findOne(
			annotation.id,
		);
		if (!hasAnnotation) throw new NotFoundError(`${annotation.id}`);
		await this.annotationRepository.remove(annotation.id);
	}
}

module.exports = RemoveAnnotationService;
