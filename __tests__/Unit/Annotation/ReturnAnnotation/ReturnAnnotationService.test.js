const NotFoundError = require('../../../../src/helpers/errors/NotFoundError');
const ReturnAnnotationService = require('../../../../src/components/Annotation/ReturnAnnotation/ReturnAnnotationService');

class AnnotationRepositoryFake {
	findOne(annotationId) {
		annotationId;
		return true;
	}
}

class AnnotationRepositoryWithErrorFake {
	findOne(annotationId) {
		annotationId;
		return false;
	}
}

const makeSut = () => {
	const annotationRepositoryFake = new AnnotationRepositoryFake();
	const sut = new ReturnAnnotationService(annotationRepositoryFake);
	return sut;
};

describe('RETURN ANNOTATION SERVICE UNIT TEST', () => {
	test('Should return 500 if no repository has no provided', async () => {
		const sut = new ReturnAnnotationService();
		const annotation = {
			id: 1,
			listId: 1,
			contents: 'teste',
		};
		const httpResponse = sut.execute(annotation);
		expect(httpResponse).rejects.toThrow();
	});

	test('Should return 404 if an annotation not founded', async () => {
		const annotationRepositoryWithErrorFake =
			new AnnotationRepositoryWithErrorFake();
		const sut = new ReturnAnnotationService(
			annotationRepositoryWithErrorFake,
		);
		const annotation = {
			annotationId: 1,
		};
		expect(sut.execute(annotation)).rejects.toThrow(
			new NotFoundError(`${annotation.annotationId}`),
		);
	});

	test('Should return a valid annotation', async () => {
		const sut = makeSut();
		const annotation = {
			annotationId: 1,
		};
		expect(sut.execute(annotation)).resolves.not.toThrow();
	});
});
