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
        const listDb = await this.listModel.findByPk(listId, {
            include: { association: 'Annotations' },
        });
        return listDb;
    }

    async findMany(query) {
        const listsDb = await this.listModel.findAll({ where: query });
        return listsDb;
    }

    async modify(list) {
        await this.listModel.update(list, { where: { id: list.id } });
    }

    async remove(listId) {
        await this.listModel.destroy({ where: { id: listId } });
    }
}

module.exports = ListRepositoryMySql;
