class IListRepository {
    create(list) {
        throw new Error('Método não implementado.');
    }
    findOne(listId) {
        throw new Error('Método não implementado.');
    }
    findMany(query) {
        throw new Error('Método não implementado.');
    }
    modify(list) {
        throw new Error('Método não implementado.');
    }
    remove(listId) {
        throw new Error('Método não implementado.');
    }
}

module.exports = IListRepository;
