const logger = require('../../../helpers/logger');
const ReturnListRequestDTO = require('./ReturnListRequestDTO');
const ReturnListService = require('./ReturnListService');

class ReturnListController {
    constructor(returnListRepository) {
        this.returnListRepository = returnListRepository;
    }

    async handler(request, response) {
        try {
            logger.info(
                `Usuário:${request.user.id} está tentando retornar a lista:${request.params.listId}.`,
            );
            const returnListRequestDTO = new ReturnListRequestDTO({
                ...request.params,
            });
            const returnListService = new ReturnListService(
                this.returnListRepository,
            );
            const list = await returnListService.execute(returnListRequestDTO);
            logger.info(
                `Usuário:${request.user.id} conseguiu retornar a lista:${request.params.listId}.`,
            );
            response.status(200).json(list);
        } catch (error) {
            if (!error.httpCode) error.httpCode = 500;
            logger.error(`${error.httpCode} - ${error.message}`);
            response.status(error.httpCode).send(error.message);
        }
    }
}

module.exports = ReturnListController;
