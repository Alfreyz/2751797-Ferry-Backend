const {Router} = require('express')
const response = require('../helpers/response')
const artikel = require('../modules/artikel.module')
const session = require('../helpers/middleware')
const ArtikelController = Router()

    /**
     * list Artikel
     */
     ArtikelController.get('/', session, async (req, res, next) => {
        const list = await artikel.listArtikel()
        response.sendResponse(res,list)
    })
    
    /**
     * add artikel by user
     * @params {String} nama_artikel
     * @params {number} id_user
     */
    
     ArtikelController.post('/create', session, async (req, res) => {
        const addartikel = await artikel.addartikel(req.body)
        response.sendResponse(res, addartikel)
    })
    
    /**
     * @params {number} id_artikel
     * @params {string} nama_artikel
     * @params {number} id_user
     * Update a  Artikel
     */
     ArtikelController.put('/update', session, async (req, res) => {
        const updateartikel = await artikel.updateArtikel(req.body)
        response.sendResponse(res, updateartikel)
    })
    
    /**
     * Delete Artikel
     * @params [number] id
     */
     ArtikelController.delete('/delete/:id_artikel', session, async (req, res, next) => {
        const del = await artikel.deleteArtikel(req.params.id_artikel)
        response.sendResponse(res,del)   
    })

    module.exports = ArtikelController