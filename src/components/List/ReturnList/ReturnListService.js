const ErrorHandler = require('../../../helpers/ErrorHandler');
const List = require('../entities/List');
const ReturnListResponseDTO = require('./ReturnListResponseDTO');

class ReturnListService {
	constructor(listRepository) {
		this.listRepository = listRepository;
	}

	async execute(returnListRequestDTO) {
		const list = new List(returnListRequestDTO);
		await list.isValid();
		const listDb = await this.listRepository.findOne(list.id);
		if (!listDb) throw new ErrorHandler('Lista não encontrada', 404);
		return new ReturnListResponseDTO(listDb);
	}
}

module.exports = ReturnListService;
