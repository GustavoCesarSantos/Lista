const NotFoundError = require('../../../../src/helpers/errors/NotFoundError');
const RemoveAnnotationService = require('../../../../src/components/Annotation/RemoveAnnotation/RemoveAnnotationService');

class AnnotationRepositoryFake {
	findOne(annotationId) {
		annotationId;
		return true;
	}

	remove() {}
}

class AnnotationRepositoryWithErrorFake {
	findOne(annotationId) {
		annotationId;
		return false;
	}

	remove() {}
}

const makeSut = () => {
	const annotationRepositoryFake = new AnnotationRepositoryFake();
	const sut = new RemoveAnnotationService(annotationRepositoryFake);
	return sut;
};

describe('REMOVE ANNOTATION SERVICE UNIT TEST', () => {
	test('Should return 500 if no repository has no provided', async () => {
		const sut = new RemoveAnnotationService();
		const annotation = {
			annotationId: 1,
		};
		const httpResponse = sut.execute(annotation);
		expect(httpResponse).rejects.toThrow();
	});

	test('Should return 404 if an annotation not founded', async () => {
		const annotationRepositoryWithErrorFake =
			new AnnotationRepositoryWithErrorFake();
		const sut = new RemoveAnnotationService(
			annotationRepositoryWithErrorFake,
		);
		const annotation = {
			annotationId: 1,
		};
		expect(sut.execute(annotation)).rejects.toThrow(
			new NotFoundError(`${annotation.annotationId}`),
		);
	});

	test('Should remove an annotation', async () => {
		const sut = makeSut();
		const annotation = {
			annotationId: 1,
		};
		expect(sut.execute(annotation)).resolves.not.toThrow();
	});
});
