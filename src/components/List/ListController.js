const List = require('./requestsModel/ListModel')
const ListService = require('./ListService')

class ListController {
  static async getLists (req, res) {
    try {
      const listModel = new List({ ...req.query })
      const query = await listModel.returnsAValidQuery()
      const lists = await ListService.getLists(query)
      res.status(200).send(lists)
    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  static async getList (req, res) {
    try {
      const { listId } = req.params
      const list = await ListService.getList(listId)
      res.status(200).send(list)
    } catch (err) {
      res.status(404).send(err.message)
    }
  };

  static async setList (req, res) {
    try {
      const { userId } = req.params
      const listData = req.body
      listData.userId = userId
      await ListService.setList(listData)
      res.status(201).send(listData)
    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  static async updateList (req, res) {
    try {
      const { listId } = req.params
      const listData = req.body
      await ListService.updateList(listId, listData)
      res.status(204).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  static async deleteList (req, res) {
    try {
      const { listId } = req.params
      await ListService.deleteList(listId)
      res.status(204).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  };
}

module.exports = ListController
