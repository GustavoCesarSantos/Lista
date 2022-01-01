const ReturnAnnotationsService = require('../../../../src/components/Annotation/ReturnAnnotations/ReturnAnnotationsService');

class AnnotationRepositoryFake {
	findMany(annotationId) {
		annotationId;
		return true;
	}
}

const makeSut = () => {
	const annotationRepositoryFake = new AnnotationRepositoryFake();
	const sut = new ReturnAnnotationsService(annotationRepositoryFake);
	return sut;
};

describe('RETURN ANNOTATIONS SERVICE UNIT TEST', () => {
	test('Should return 500 if no repository has no provided', async () => {
		const sut = new ReturnAnnotationsService();
		const annotation = {};
		const httpResponse = sut.execute(annotation);
		expect(httpResponse).rejects.toThrow();
	});

	test('Should return a valid annotations', async () => {
		const sut = makeSut();
		const annotation = {};
		expect(sut.execute(annotation)).resolves.not.toThrow();
	});
});
