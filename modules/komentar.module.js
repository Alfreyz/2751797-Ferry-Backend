const mysql = require('../helpers/database')
const Joi = require('joi')
class _komentar{

listKomen = async () => {
    try{
        const list = await mysql.query(
            'SELECT * FROM d_komentar',
            []
        )
        return {
            status: true,
            data: list
        }
    }catch(e){
        console.error('Komentar List Todo  Failed', e)
        return {
            status: false,
            error: e
        }
    }
}

addkomen = async (body) => {
    try{
        const schema = Joi.object({
            komentar: Joi.string().required(),
            id_user: Joi.number().required(),
            id_artikel: Joi.number().required(),
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
        const addkomen = await mysql.query(
            'INSERT INTO d_komentar (komentar, id_user, id_artikel) VALUES (?, ?, ?)',
            [body.komentar, body.id_user, body.id_artikel]
        )
        return {
            status: true,
            data: addkomen
        }
    }catch (e){
        console.error('Add Komentar todo module error',e)
        return{
            status: false,
            error: e
        }
}
}
}

module.exports = new _komentar()