class ListAnnotationsRequestDTO {
    constructor(annotation) {
        this.listId = annotation.listId;
        this.contents = annotation.contents;
    }
}

module.exports = ListAnnotationsRequestDTO;
