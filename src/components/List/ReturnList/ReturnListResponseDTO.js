class ReturnListResponseDTO {
  constructor (list) {
    this.id = list.id
    this.name = list.name
    this.annotations = list.Annotations
  }
}

module.exports = ReturnListResponseDTO
