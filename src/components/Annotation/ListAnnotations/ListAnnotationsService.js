const Annotation = require('../entities/Annotation');

class ListAnnotationsService {
    constructor(annotationRepository) {
        this.annotationRepository = annotationRepository;
    }

    async execute(listAnnotationsRequestDTO) {
        const annotation = new Annotation(listAnnotationsRequestDTO);
        await annotation.returnsAValidQuery();
        await this.annotationRepository.findMany(annotation);
    }
}

module.exports = ListAnnotationsService;
