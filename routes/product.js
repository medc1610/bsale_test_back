const {Router} = require('express');
const { getProducts,
        getProduct, 
        getProductByCategory,
        getProductsById,
        getProductsPagination} = require('../controllers/product');

const routes = Router()

routes.get('/',  getProducts);

routes.get('/pagination',  getProductsPagination);

routes.get('/:name', getProduct);

routes.get('/id/:id', getProductsById);

routes.get('/category/:id', getProductByCategory);

module.exports = routes;