const mysql = require('../helpers/database')
const Joi = require('joi')
const bcrypt = require('bcrypt')

class _users{
    listUser = async () => {
        try{
            const list = await mysql.query(
                'SELECT * FROM auth_user',
                []
            )
            return {
                status: true,
                data: list
            }
        }catch(e){
            console.error('List Todo  Failed', e)
            return {
                status: false,
                error: e    
            }
        }
    }
    addUser = async (body) => {
        try{
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required()
            })
            const validation = schema.validate(body)

            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
                return {
                    status: false,
                    error: errorDetails.join(', '),
                    code: 442
                }
            }
            body.password = bcrypt.hashSync(body.password,15)
            const adduser = await mysql.query(
                'INSERT INTO auth_user (username, password) VALUES (?, ?)',
                [body.username, body.password]
            )
            return {
                status: true,
                data: adduser
            }
        }catch (e){
            console.error('Add USERS todo module error',e)
            return{
                status: false,
                error: e
            }
    }
}

}

module.exports = new _users()