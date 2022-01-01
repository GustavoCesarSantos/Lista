const ModifyAnnotationService = require('../../../../src/components/Annotation/ModifyAnnotation/ModifyAnnotationService');
const NotFoundError = require('../../../../src/helpers/errors/NotFoundError');

class AnnotationRepositoryFake {
	findOne(annotationId) {
		annotationId;
		return true;
	}

	modify() {}
}

class AnnotationRepositoryWithErrorFake {
	findOne(annotationId) {
		annotationId;
		return false;
	}
}

const makeSut = () => {
	const annotationRepositoryFake = new AnnotationRepositoryFake();
	const sut = new ModifyAnnotationService(annotationRepositoryFake);
	return sut;
};

describe('MODIFY ANNOTATION SERVICE UNIT TEST', () => {
	test('Should return 500 if no repository has no provided', async () => {
		const sut = new ModifyAnnotationService();
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
		const sut = new ModifyAnnotationService(
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
