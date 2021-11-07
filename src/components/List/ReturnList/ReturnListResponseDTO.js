class ReturnListResponseDTO {
  constructor (list) {
    this.id = list.id
    this.contents = list.contents
    this.annotations = list.annotations
  }
}

module.exports = ReturnListResponseDTO
