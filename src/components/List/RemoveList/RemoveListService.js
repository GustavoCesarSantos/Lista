const List = require('../entities/List');
const NotFoundError = require('../../../helpers/errors/NotFoundError');

class RemoveListService {
	constructor(listRepository) {
		this.listRepository = listRepository;
	}

	async execute(removeListRequestDTO) {
		const list = new List(removeListRequestDTO);
		const hasList = await this.listRepository.findOne(list.id);
		if (!hasList) throw new NotFoundError(`${list.id}`);
		await this.listRepository.remove(list.id);
	}
}

module.exports = RemoveListService;
