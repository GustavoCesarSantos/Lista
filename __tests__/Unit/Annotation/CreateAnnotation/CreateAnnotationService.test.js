const CreateAnnotationService = require('../../../../src/components/Annotation/CreateAnnotation/CreateAnnotationService');

class AnnotationRepositoryDummy {
	create() {}
}

const makeSut = () => {
	const annotationRepositoryDummy = new AnnotationRepositoryDummy();
	const sut = new CreateAnnotationService(annotationRepositoryDummy);
	return sut;
};

describe('CREATE ANNOTATION SERVICE UNIT TEST', () => {
	test('Should return 500 if no repository has no provided', async () => {
		const sut = new CreateAnnotationService();
		const annotation = {
			id: 1,
			listId: 1,
			contents: 'teste',
		};
		const httpResponse = sut.execute(annotation);
		expect(httpResponse).rejects.toThrow();
	});

	test('Should create a valid annotation', async () => {
		const sut = makeSut();
		const annotation = {
			id: 1,
			listId: 1,
			contents: 'teste',
		};
		expect(sut.execute(annotation)).resolves.not.toThrow();
	});
});
