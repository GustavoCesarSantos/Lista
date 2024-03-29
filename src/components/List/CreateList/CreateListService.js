const List = require('../entities/List');

class CreateListService {
	constructor(listRepository) {
		this.listRepository = listRepository;
	}

	async execute(createListRequestDTO) {
		const list = new List(createListRequestDTO);
		await this.listRepository.create(list);
	}
}

module.exports = CreateListService;
