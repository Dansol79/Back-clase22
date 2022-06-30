const {Router} = require('express');
const router = new Router();

const productos = require('../../utils/generarProductos')   

module.exports = (app) => {
    app.use('/api/productos', router)

    router.get('/', (req, res) => {
        res.json(productos)
    })
}