const mysql = require('../helpers/database')
const Joi = require('joi')

class _artikel{
    listArtikel = async () => {
        try{
            const list = await mysql.query(
                'SELECT * FROM d_artikel',
                []
            )
            return {
                status: true,
                data: list
            }
        }catch(e){
            console.error('Artikel List Todo  Failed', e)
            return {
                status: false,
                error: e
            }
        }
    }
    
    addartikel = async (body) => {
        try{
            const schema = Joi.object({
                nama_artikel: Joi.string().required(),
                id_user: Joi.number().required(),
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
            const addartikel = await mysql.query(
                'INSERT INTO d_artikel (nama_artikel, id_user) VALUES (?, ?)',
                [body.nama_artikel, body.id_user]
            )
            return {
                status: true,
                data: addartikel
            }
        }catch (e){
            console.error('Add Artikel todo module error',e)
            return{
                status: false,
                error: e
            }
    }
}

updateArtikel = async (body) => {
    try{
        const schema = Joi.object({
            id_artikel: Joi.number().required(),
            nama_artikel: Joi.string(),
            id_user: Joi.number().required()
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
        const updateartikel = await mysql.query(
        'UPDATE d_artikel SET nama_artikel = ? ,id_user = ? WHERE id_artikel = ?',
        [ body.nama_artikel, body.id_user, body.id_artikel  ]
        )
        return{
            status: true,
            data: updateartikel
        }
    }catch(e){
        console.error('Update Artikel todo module error',e)
        return{
            status: false,
            error: e
        }
    }
}
deleteArtikel = async (id_artikel) => {
    try {
        const body = { id_artikel }
        const schema = Joi.object({
            id_artikel: Joi.number().required()
        })

        const validation = schema.validate(body)

        if (validation.error) {
            const errorDetails = validation.error.details.map(detail => detail.message)

            return {
                status: false,
                code: 422,
                error: errorDetails.join(', ')
            }
        }

        const del = await mysql.query(
            'DELETE FROM d_artikel WHERE id_artikel = ?',
            [id_artikel]
        )

        return {
            status: true,
            data: del
        }
    } catch (error) {
        console.error('Delete Artikel todo module Error: ', error)

        return {
            status: false,
            error
        }
    }
}
}
module.exports = new _artikel()