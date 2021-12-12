const ModifyAnnotationController = require('../../../../src/components/Annotation/ModifyAnnotation/ModifyAnnotationController');
const logger = require('../../../../src/helpers/logger');

describe('MODIFY ANNOTATION CONTROLLER UNIT TEST', () => {
    beforeEach(() => {
        jest.spyOn(logger, 'info').mockImplementation();

        jest.spyOn(logger, 'error').mockImplementation();
    });

    test('Should catch an error with default http status code', async () => {
        const request = {
            user: { id: 1 },
            params: {},
            body: {},
        };
        const response = {
            status(statusCode) {
                return statusCode;
            },
            send(message) {
                return message;
            },
        };
        const ModifyAnnotationServiceFake = jest.fn().mockImplementation(() => {
            return {
                async execute(data) {
                    throw new Error('Teste');
                },
            };
        });
        const spy = jest.spyOn(response, 'status');
        const listAnnotationsServiceFake = new ModifyAnnotationServiceFake();
        const listAnnotationsController = new ModifyAnnotationController(
            listAnnotationsServiceFake,
        );
        await listAnnotationsController.handler(request, response);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(500);
    });

    test('Should catch an error with custom http status code', async () => {
        const request = {
            user: { id: 1 },
            params: {},
            body: {},
        };
        const response = {
            status(statusCode) {
                return statusCode;
            },
            send(message) {
                return message;
            },
        };
        const ModifyAnnotationServiceFake = jest.fn().mockImplementation(() => {
            return {
                async execute(data) {
                    const error = new Error('Teste');
                    error.httpCode = 404;
                    throw error;
                },
            };
        });
        const spy = jest.spyOn(response, 'status');
        const listAnnotationsServiceFake = new ModifyAnnotationServiceFake();
        const listAnnotationsController = new ModifyAnnotationController(
            listAnnotationsServiceFake,
        );
        await listAnnotationsController.handler(request, response);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(404);
    });

    test('Should pass with http status code 201', async () => {
        const request = {
            user: { id: 1 },
            params: {},
            body: {},
        };
        const response = {
            status(statusCode) {
                return statusCode;
            },
            end() {},
        };
        const spy = jest.spyOn(response, 'status');
        const ModifyAnnotationServiceFake = jest.fn().mockImplementation(() => {
            return {
                execute: data => {},
            };
        });
        const listAnnotationsServiceFake = new ModifyAnnotationServiceFake();
        const listAnnotationsController = new ModifyAnnotationController(
            listAnnotationsServiceFake,
        );
        await listAnnotationsController.handler(request, response);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(201);
    });
});
