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
      const listModel = new List({ ...req.params })
      await listModel.isValid()
      const list = await ListService.getList(listModel.id)
      res.status(200).send(list)
    } catch (err) {
      res.status(404).send(err.message)
    }
  };

  static async setList (req, res) {
    try {
      const listModel = new List({ ...req.params, ...req.body })
      await listModel.isValid()
      await ListService.setList(listModel)
      res.status(201).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  static async updateList (req, res) {
    try {
      const listModel = new List({ ...req.params, ...req.body })
      await listModel.isValid()
      await ListService.updateList(listModel)
      res.status(204).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  static async deleteList (req, res) {
    try {
      const listModel = new List({ ...req.params })
      await listModel.isValid()
      await ListService.deleteList(listModel)
      res.status(204).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  };
}

module.exports = ListController
