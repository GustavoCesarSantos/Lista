class ListAnnotationResponseDTO {
	constructor(annotation) {
		this.id = annotation.id;
		this.contents = annotation.contents;
	}
}

module.exports = ListAnnotationResponseDTO;
