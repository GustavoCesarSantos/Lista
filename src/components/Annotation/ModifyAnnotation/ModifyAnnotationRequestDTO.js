class ModifyAnnotationRequestDTO {
	constructor(annotation) {
		this.annotationId = annotation.annotationId;
		this.listId = annotation.listId;
		this.contents = annotation.contents;
	}
}

module.exports = ModifyAnnotationRequestDTO;
