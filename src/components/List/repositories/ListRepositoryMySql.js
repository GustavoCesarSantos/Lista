const IListRepository = require('./IListRepository');

class ListRepositoryMySql extends IListRepository {
    constructor(listModel) {
        super();
        this.listModel = listModel;
    }

    async create(list) {
        await this.listModel.create(list);
    }

    async findOne(listId) {
        return await this.listModel.findByPk(listId, {
            include: { association: 'Annotations' },
        });
    }

    async findMany(query) {
        return await this.listModel.findAll({ where: query });
    }

    async modify(list) {
        await this.listModel.update(list, { where: { id: list.id } });
    }

    async remove(listId) {
        await this.listModel.destroy({ where: { id: listId } });
    }
}

module.exports = ListRepositoryMySql;
