const List = require('../entities/List');

class ReturnListsService {
    constructor(listRepository) {
        this.listRepository = listRepository;
    }

    async execute(returnListsRequestDTO) {
        const list = new List(returnListsRequestDTO);
        await list.returnsAValidQuery();
        const listsDb = await this.listRepository.findMany(list);
        return listsDb;
    }
}

module.exports = ReturnListsService;
