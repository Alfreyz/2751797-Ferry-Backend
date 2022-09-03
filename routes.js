const AuthController = require("./controller/AuthController");
const UserController = require("./controller/UserController");
const ArtikelController = require("./controller/ArtikelController");
const KomentarController = require("./controller/KomentarController");

const _routes = [
    ['', AuthController],
    ['/users', UserController],
    ['/artikel', ArtikelController],
    ['/komentar', KomentarController],
]

const routes = (app) => {
    _routes.forEach((route) => {
        const [ url, controller ] = route
        app.use(`/api${url}`, controller)
    })
}

module.exports =  routes