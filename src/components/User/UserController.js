const tokenHelper = require('../../helpers/token')
const User = require('./requestsModel/UserModel')
const UserSerivce = require('./UserService')

class UserController {
  static async login (req, res) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para criar token opaco e token de acesso.'
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
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para invalidar token opaco e token de acesso.'
    try {
      const token = req.token
      await tokenHelper.invalidateToken(token)
      res.status(204).end()
    } catch (err) {
      res.status(500).send(err.message)
    }
  };

  static async verifiedEmail (req, res) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para validar e-mail de acesso.'
    // #swagger.parameters['token'] = { description: 'Token de acesso.' }
    try {
      const userData = req.user
      const user = new User(userData)
      await UserSerivce.updateUser(user.id, { verifiedEmail: user.verifiedEmail })
      res.status(204).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  static async getUsers (req, res) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para obter os usuários.'
    /* #swagger.parameters['email'] = {
      description: 'Obter usuário pela filtragem do e-mail.',
      type: 'string'
    } */
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
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para obter o usuário.'
    // #swagger.parameters['userId'] = { description: 'ID do usuário.' }
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
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para cadastrar o usuário.'
    /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Informações do usuário.',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/AddUser" }
    } */
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
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para atualizar infos do usuário.'
    // #swagger.parameters['userId'] = { description: 'ID do usuário.' }
    /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Informações do usuário.',
      required: true,
      type: 'object',
      schema: { $ref: "#/definitions/AddUser" }
    } */
    try {
      const userModel = new User({ ...req.params, ...req.body })
      const user = await userModel.returnsAValidQuery()
      await UserSerivce.updateUser(user)
      res.status(204).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  };

  static async deleteUser (req, res) {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint para deletar o usuário.'
    // #swagger.parameters['userId'] = { description: 'ID do usuário.' }
    try {
      const userModel = new User({ ...req.params })
      await userModel.isValid()
      await UserSerivce.deleteUser(userModel.id)
      res.status(204).end()
    } catch (err) {
      res.status(400).send(err.message)
    }
  };
}

module.exports = UserController
