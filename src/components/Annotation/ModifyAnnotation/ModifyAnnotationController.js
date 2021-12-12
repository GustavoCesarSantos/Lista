const logger = require('../../../helpers/logger');
const ModifyAnnotationRequestDTO = require('./ModifyAnnotationRequestDTO');

class ModifyAnnotationController {
    constructor(modifyAnnotationService) {
        this.modifyAnnotationService = modifyAnnotationService;
    }

    async handler(request, response) {
        try {
            logger.info(
                `Usuário:${request.user.id} está tentando modificar a anotação:${request.params.annotationId}.`,
            );
            const modifyAnnotationRequestDTO = new ModifyAnnotationRequestDTO({
                ...request.params,
                ...request.body,
            });
            await this.modifyAnnotationService.execute(
                modifyAnnotationRequestDTO,
            );
            logger.info(
                `Usuário:${request.user.id} conseguiu modificar a anotação:${request.params.annotationId}.`,
            );
            response.status(201);
            response.end();
        } catch (err) {
            if (!err.httpCode) err.httpCode = 500;
            logger.error(`${err.httpCode} - ${err.message}`);
            response.status(err.httpCode);
            response.send(err.message);
        }
    }
}

module.exports = ModifyAnnotationController;
