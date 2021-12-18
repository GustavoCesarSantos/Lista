const ListAnnotationsService = require('../../../../src/components/Annotation/ListAnnotations/ListAnnotationsService');

describe('LIST ANNOTATIONS SERVICE UNIT TEST', () => {
	test('Should return a valid annotations with out throw an erro', async () => {
		const annotation = {};
		const AnnotationRepositoryFake = jest.fn().mockImplementation(() => ({
			async findMany(data) {},
		}));
		const annotationRepositoryFake = new AnnotationRepositoryFake();
		const listAnnotationsService = new ListAnnotationsService(
			annotationRepositoryFake,
		);
		await expect(
			listAnnotationsService.execute(annotation),
		).resolves.not.toThrow();
	});
});
