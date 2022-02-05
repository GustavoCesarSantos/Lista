const List = require('../entities/List');
const NotFoundError = require('../../../helpers/errors/NotFoundError');
const ReturnListResponseDTO = require('./ReturnListResponseDTO');

class ReturnListService {
	constructor(listRepository) {
		this.listRepository = listRepository;
	}

	async execute(returnListRequestDTO) {
		const list = new List(returnListRequestDTO);
		const hasList = await this.listRepository.findOne(list.id);
		if (!hasList) throw new NotFoundError(`${list.id}`);
		return new ReturnListResponseDTO(hasList);
	}
}

module.exports = ReturnListService;
