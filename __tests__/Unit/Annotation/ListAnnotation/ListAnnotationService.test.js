const ListAnnotationService = require('../../../../src/components/Annotation/ListAnnotation/ListAnnotationService');

describe('LIST ANNOTATION SERVICE UNIT TEST', () => {
    test('Should throw  an error when not found an annotation', async () => {
        const annotation = {
            id: 1,
            listId: 1,
            contents: 'Teste',
        };
        const AnnotationRepositoryFake = jest.fn().mockImplementation(() => ({
            async findOne(data) {
                return false;
            },
        }));
        const annotationRepositoryFake = new AnnotationRepositoryFake();
        const listAnnotationService = new ListAnnotationService(
            annotationRepositoryFake,
        );
        await listAnnotationService
            .execute(annotation)
            .catch(error => expect(error.message).toBe('Anotação não encontrada'),
            );
    });

    test('Should return an annotation', async () => {
        const annotation = {
            id: 1,
            listId: 1,
            contents: 'Teste',
        };
        const annotationResponseDTO = {
            id: 1,
            contents: 'Teste',
        };
        const AnnotationRepositoryFake = jest.fn().mockImplementation(() => ({
            async findOne(data) {
                return annotation;
            },
        }));
        const annotationRepositoryFake = new AnnotationRepositoryFake();
        const listAnnotationService = new ListAnnotationService(
            annotationRepositoryFake,
        );
        const response = await listAnnotationService.execute(annotation);
        expect(response).toEqual(annotationResponseDTO);
    });
});
