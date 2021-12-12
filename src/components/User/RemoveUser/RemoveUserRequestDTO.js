class RemoveUserRequestDTO {
    constructor(user) {
        this.id = user.userId;
    }
}

module.exports = RemoveUserRequestDTO;
