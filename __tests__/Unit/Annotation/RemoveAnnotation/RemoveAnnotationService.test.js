const RemoveAnnotationService = require('../../../../src/components/Annotation/RemoveAnnotation/RemoveAnnotationService');

describe('REMOVE ANNOTATION SERVICE UNIT TEST', () => {
	test('Should throw  an error when not found an annotation', async () => {
		const annotation = { id: 1 };
		const AnnotationRepositoryFake = jest.fn().mockImplementation(() => ({
			async findOne(data) {
				return false;
			},
		}));
		const annotationRepositoryFake = new AnnotationRepositoryFake();
		const removeAnnotationService = new RemoveAnnotationService(
			annotationRepositoryFake,
		);
		await removeAnnotationService
			.execute(annotation)
			.catch(error =>
				expect(error.message).toBe('Anotação não encontrada'),
			);
	});

	test('Should remove an annotation', async () => {
		const annotation = { id: 1 };
		const AnnotationRepositoryFake = jest.fn().mockImplementation(() => ({
			async findOne(data) {
				return true;
			},
			async remove(data) {},
		}));
		const annotationRepositoryFake = new AnnotationRepositoryFake();
		const removeAnnotationService = new RemoveAnnotationService(
			annotationRepositoryFake,
		);
		await expect(
			removeAnnotationService.execute(annotation),
		).resolves.not.toThrow();
	});
});
