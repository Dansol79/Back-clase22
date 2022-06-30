const productTestController = require('../componentes/productTest/ProductTestController');

module.exports = (app) => {
  
  productTestController(app);

  app.get('*', (req, res) =>
    res.status(404).json({
      error: -2,
      description: 'Página no encontrada',
    })
  );
};
