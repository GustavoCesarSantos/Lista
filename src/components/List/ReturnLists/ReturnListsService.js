const List = require("../Entities/List");

class ReturnListsService {
  constructor(listRepository) {
    this.listRepository = listRepository;
  }

  async execute(returnListsRequestDTO) {
    const list = new List(returnListsRequestDTO);
    await list.returnsAValidQuery();
    return await this.listRepository.findMany(list);
  }
}

module.exports = ReturnListsService;
