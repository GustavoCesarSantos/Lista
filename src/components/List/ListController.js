const ListService = require('./ListService');

class ListController {
  static async setList(req, res) {
    try {
      const listData = req.body;
      await ListService.setList(listData);
      res.status(201).send(listData);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  static async getList(req,res) {
    try {
      const { listId } = req.params;
      const annotations = await ListService.getList(listId);
      res.status(200).send(annotations);
    } catch (err) {
      res.status(404).send(err.message);
    }
  }
}

module.exports = ListController;