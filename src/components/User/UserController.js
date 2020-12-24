const blocklistHelper = require('../../helpers/blocklist')
const jwtHelper = require('../../helpers/jwt')
const UserSerivce = require('./UserService')

class UserController {
  static async login (req, res) {
    try {
      const token = jwtHelper.createToken(req.user)
      res.set('Authorization', token)
      res.status(204).end()
    } catch (err) {
      res.status(500).send(err.message)
    }
  };

  static async logout (req, res) {
    try {
      const token = req.token
      await blocklistHelper.setToken(token)
      res.status(204).end()
    } catch (err) {
      res.status(500).send(err.message)
    }
  };

  static async getUsers (req, res) {
    try {
      const query = { ...req.query }
      const users = await UserSerivce.getUsers(query)
      res.status(200).send(users)
    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  static async getUser (req, res) {
    try {
      const { userId } = req.params
      const user = await UserSerivce.getUser(userId)
      res.status(200).send(user)
    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  static async setUser (req, res) {
    try {
      const userData = req.body
      await UserSerivce.setUser(userData)
      res.status(201).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  static async updateUser (req, res) {
    try {
      const { userId } = req.params
      const userData = req.body
      await UserSerivce.updateUser(userId, userData)
      res.status(204).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  static async deleteUser (req, res) {
    try {
      const { userId } = req.params
      await UserSerivce.deleteUser(userId)
      res.status(204).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  };
}

module.exports = UserController
