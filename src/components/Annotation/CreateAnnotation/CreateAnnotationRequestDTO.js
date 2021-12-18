class CreateAnnotationRequestDTO {
	constructor(annotation) {
		this.contents = annotation.contents;
		this.listId = annotation.listId;
	}
}

module.exports = CreateAnnotationRequestDTO;
