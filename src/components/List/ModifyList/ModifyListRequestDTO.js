class ModifyListRequestDTO {
    constructor(list) {
        this.listId = list.listId;
        this.name = list.name;
    }
}

module.exports = ModifyListRequestDTO;
