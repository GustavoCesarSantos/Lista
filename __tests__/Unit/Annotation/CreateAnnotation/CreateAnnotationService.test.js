const CreateAnnotationService = require('../../../../src/components/Annotation/CreateAnnotation/CreateAnnotationService');
const expectExport = require('expect');

describe('CREATE ANNOTATION SERVICE UNIT TEST', () => {
    test('Should create a valid annotation', async () => {
        const annotation = {
            id: 1,
            listId: 1,
            contents: 'teste',
        };
        const AnnotationRepositoryFake = jest.fn().mockImplementation(() => {
            return {
                async create(data) {},
            };
        });
        const annotationRepositoryFake = new AnnotationRepositoryFake();
        const createAnnotationService = new CreateAnnotationService(
            annotationRepositoryFake,
        );
        await expectExport(
            createAnnotationService.execute(annotation),
        ).resolves.not.toThrow();
    });
});
