const logger = require('../../../helpers/logger');
const ModifyListRequestDTO = require('./ModifyListRequestDTO');
const ModifyListService = require('./ModifyListService');

class ModifyListController {
    constructor(modifyListRepository) {
        this.modifyListRepository = modifyListRepository;
    }

    async handler(request, response) {
        try {
            logger.info(
                `Usuário:${request.user.id} está tentando modificar a lista:${request.params.listId}.`,
            );
            const modifyListRequestDTO = new ModifyListRequestDTO({
                ...request.params,
                ...request.body,
            });
            const modifyListService = new ModifyListService(
                this.modifyListRepository,
            );
            await modifyListService.execute(modifyListRequestDTO);
            logger.info(
                `Usuário:${request.user.id} conseguiu modificar a lista:${request.params.listId}.`,
            );
            response.status(201).end();
        } catch (err) {
            if (!err.httpCode) err.httpCode = 500;
            logger.error(`${err.httpCode} - ${err.message}`);
            response.status(err.httpCode).send(err.message);
        }
    }
}

module.exports = ModifyListController;
