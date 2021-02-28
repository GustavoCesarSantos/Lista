const tokenHelper = require('../../helpers/token')
const User = require('./requestsModel/UserModel')
const UserSerivce = require('./UserService')

class UserController {
  static async login (req, res) {
    try {
      const accessToken = tokenHelper.createToken(req.user)
      const refreshToken = await tokenHelper.createOpaqueToken(req.user)
      res.set('Authorization', accessToken)
      res.status(200).json({ refreshToken })
    } catch (err) {
      res.status(500).send(err.message)
    }
  };

  static async logout (req, res) {
    try {
      const token = req.token
      await tokenHelper.invalidateToken(token)
      res.status(204).end()
    } catch (err) {
      res.status(500).send(err.message)
    }
  };

  static async verifiedEmail (req, res) {
    try {
      const userData = req.user
      const user = new User(userData)
      await UserSerivce.updateUser({ id: user.id, verifiedEmail: user.verifiedEmail })
      res.status(204).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  static async getUsers (req, res) {
    try {
      const userModel = new User({ ...req.query })
      const query = await userModel.returnsAValidQuery()
      const users = await UserSerivce.getUsers(query)
      res.status(200).send(users)
    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  static async getUser (req, res) {
    try {
      const userModel = new User({ ...req.params })
      await userModel.isValid()
      const user = await UserSerivce.getUser(userModel.id)
      res.status(200).send(user)
    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  static async setUser (req, res) {
    try {
      const user = new User({ ...req.body })
      await user.isValid()
      await UserSerivce.setUser(user)
      res.status(201).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  static async updateUser (req, res) {
    try {
      const userModel = new User({ ...req.params, ...req.body })
      await userModel.isValid()
      await UserSerivce.updateUser(userModel)
      res.status(204).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  static async deleteUser (req, res) {
    try {
      const userModel = new User({ ...req.params })
      await userModel.isValid()
      await UserSerivce.deleteUser(userModel)
      res.status(204).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  };
}

module.exports = UserController
