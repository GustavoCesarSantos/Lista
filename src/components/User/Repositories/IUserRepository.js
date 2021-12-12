class IUserRepository {
    create(user) {
        throw new Error('Método não implementado.');
    }

    findOne(userId) {
        throw new Error('Método não implementado.');
    }

    findMany(query) {
        throw new Error('Método não implementado.');
    }

    modify(user) {
        throw new Error('Método não implementado.');
    }

    remove(userId) {
        throw new Error('Método não implementado.');
    }
}

module.exports = IUserRepository;
