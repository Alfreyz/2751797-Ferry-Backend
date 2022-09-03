const {Router} = require('express')
const response = require('../helpers/response')
const user = require('../modules/user.module')
const UserController = Router()

/**
 * list Users
 */
UserController.get('/', async (req, res, next) => {
const list = await user.listUser()
response.sendResponse(res,list)
})

/**
 * @params {string} username
 * @params {string} password
 * create   a new User
 */
UserController.post('/create', async (req, res, next) => {
const adduser = await user.addUser(req.body)
response.sendResponse(res, adduser)
})


module.exports = UserController