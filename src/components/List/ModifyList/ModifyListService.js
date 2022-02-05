const List = require('../entities/List');
const NotFoundError = require('../../../helpers/errors/NotFoundError');

class ModifyListService {
	constructor(listRepository) {
		this.listRepository = listRepository;
	}

	async execute(modifyListRequestDTO) {
		const list = new List(modifyListRequestDTO);
		const hasList = await this.listRepository.findOne(list.id);
		if (!hasList) return new NotFoundError('Lista não encontrada');
		await this.listRepository.modify(list);
	}
}

module.exports = ModifyListService;
