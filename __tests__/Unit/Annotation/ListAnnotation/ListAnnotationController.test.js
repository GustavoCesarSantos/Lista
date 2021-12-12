const ListAnnotationController = require('../../../../src/components/Annotation/ListAnnotation/ListAnnotationController');
const logger = require('../../../../src/helpers/logger');

describe('LIST ANNOTATION CONTROLLER UNIT TEST', () => {
    beforeEach(() => {
        jest.spyOn(logger, 'info').mockImplementation();

        jest.spyOn(logger, 'error').mockImplementation();
    });

    test('Should catch an error with default http status code', async () => {
        const request = {
            user: { id: 1 },
            params: { annotationId: 1 },
        };
        const response = {
            status(statusCode) {
                return statusCode;
            },
            send(message) {
                return message;
            },
        };
        const ListAnnotationServiceFake = jest.fn().mockImplementation(() => ({
            async execute(data) {
                throw new Error('Teste');
            },
        }));
        const spy = jest.spyOn(response, 'status');
        const listAnnotationServiceFake = new ListAnnotationServiceFake();
        const listAnnotationController = new ListAnnotationController(
            listAnnotationServiceFake,
        );
        await listAnnotationController.handler(request, response);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(500);
    });

    test('Should catch an error with custom http status code', async () => {
        const request = {
            user: { id: 1 },
            params: { annotationId: 1 },
        };
        const response = {
            status(statusCode) {
                return statusCode;
            },
            send(message) {
                return message;
            },
        };
        const ListAnnotationServiceFake = jest.fn().mockImplementation(() => ({
            async execute(data) {
                const error = new Error('Teste');
                error.httpCode = 401;
                throw error;
            },
        }));
        const spy = jest.spyOn(response, 'status');
        const listAnnotationServiceFake = new ListAnnotationServiceFake();
        const listAnnotationController = new ListAnnotationController(
            listAnnotationServiceFake,
        );
        await listAnnotationController.handler(request, response);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(401);
    });

    test('Should pass with http status code 200', async () => {
        const request = {
            user: { id: 1 },
            params: { annotationId: 1 },
        };
        const response = {
            status(statusCode) {
                return statusCode;
            },
            json(data) {
                return data;
            },
        };
        const spy = jest.spyOn(response, 'status');
        const ListAnnotationServiceFake = jest.fn().mockImplementation(() => ({
            execute: data => data,
        }));
        const listAnnotationServiceFake = new ListAnnotationServiceFake();
        const listAnnotationController = new ListAnnotationController(
            listAnnotationServiceFake,
        );
        await listAnnotationController.handler(request, response);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(200);
    });

    test('Should return a valid content', async () => {
        const request = {
            user: { id: 1 },
            params: { annotationId: 1 },
        };
        const response = {
            status(statusCode) {
                return statusCode;
            },
            json(data) {
                return data;
            },
        };
        const spy = jest.spyOn(response, 'json');
        const ListAnnotationServiceFake = jest.fn().mockImplementation(() => ({
            execute: data => ({ contents: 'Teste' }),
        }));
        const listAnnotationServiceFake = new ListAnnotationServiceFake();
        const listAnnotationController = new ListAnnotationController(
            listAnnotationServiceFake,
        );
        await listAnnotationController.handler(request, response);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ contents: 'Teste' });
    });
});
