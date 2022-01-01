const Annotation = require('../entities/Annotation');
const NotFoundError = require('../../../helpers/errors/NotFoundError');
const ReturnAnnotationResponseDTO = require('./ReturnAnnotationResponseDTO');

class ReturnAnnotationService {
	constructor(annotationRepository) {
		this.annotationRepository = annotationRepository;
	}

	async execute(returnAnnotationRequestDTO) {
		const annotation = new Annotation(returnAnnotationRequestDTO);
		const annotationDb = await this.annotationRepository.findOne(
			annotation.id,
		);
		if (!annotationDb) throw new NotFoundError(`${annotation.id}`);
		return new ReturnAnnotationResponseDTO(annotationDb);
	}
}

module.exports = ReturnAnnotationService;
