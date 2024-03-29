class AnnotationRepositoryMySql {
	constructor(annotationModel) {
		this.annotationModel = annotationModel;
	}

	async create(annotation) {
		await this.annotationModel.create(annotation);
	}

	async findOne(annotationId) {
		return await this.annotationModel.findByPk(annotationId);
	}

	async findMany(query) {
		const annotationsDb = await this.annotationModel.findAll({
			where: query,
		});
		return annotationsDb;
	}

	async modify(annotation) {
		await this.annotationModel.update(annotation, {
			where: { id: annotation.id },
		});
	}

	async remove(annotationId) {
		await this.annotationModel.destroy({ where: { id: annotationId } });
	}
}

module.exports = AnnotationRepositoryMySql;
