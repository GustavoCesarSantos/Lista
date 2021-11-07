class CreateListRequestDTO {
  constructor (list) {
    this.userId = list.userId
    this.name = list.name
  }
}

module.exports = CreateListRequestDTO
