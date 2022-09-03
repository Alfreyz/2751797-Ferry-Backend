const {Router} = require('express')
const response = require('../helpers/response')
const komentar = require('../modules/komentar.module')
const KomentarController = Router()

    /**
     * list Komentar
     */
     KomentarController.get('/', async (req, res, next) => {
        const list = await komentar.listKomen()
        response.sendResponse(res,list)
        })
        

    /**
     * @params {string} komentar
     * @params {number} id_user
     * @params {number} id_artikel
     * add komentar by user
     */
     KomentarController.post('/create', async (req, res) => {
        const addkomen = await komentar.addkomen(req.body)
        response.sendResponse(res, addkomen)
        })
module.exports = KomentarController