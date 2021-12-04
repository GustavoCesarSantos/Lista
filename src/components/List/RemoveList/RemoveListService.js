const List = require("../Entities/List");
const ErrorHandler = require("../../../helpers/ErrorHandler");

class RemoveListService {
  constructor(listRepository) {
    this.listRepository = listRepository;
  }

  async execute(removeListRequestDTO) {
    const list = new List(removeListRequestDTO);
    await list.isValid();
    const hasList = await this.listRepository.findOne(list.id);
    if (!hasList) throw new ErrorHandler("Lista não encontrada", 404);
    await this.listRepository.remove(list.id);
  }
}

module.exports = RemoveListService;
