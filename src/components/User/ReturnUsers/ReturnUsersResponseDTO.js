class ReturnUsersResponseDTO {
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
    }
}

module.exports = ReturnUsersResponseDTO;
