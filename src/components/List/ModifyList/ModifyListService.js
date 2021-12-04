const List = require("../Entities/List");
const ErrorHandler = require("../../../helpers/ErrorHandler");

class ModifyListService {
  constructor(listRepository) {
    this.listRepository = listRepository;
  }

  async execute(modifyListRequestDTO) {
    const list = new List(modifyListRequestDTO);
    await list.isValid();
    const hasList = await this.listRepository.findOne(list.id);
    if (!hasList) throw new ErrorHandler("Lista não encontrada", 404);
    await this.listRepository.modify(list);
  }
}

module.exports = ModifyListService;
