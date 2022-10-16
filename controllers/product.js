const Product = require("../models/product");
const { QueryTypes } = require('sequelize');
const db = require("../db/conection");


/**
 * Controlador para llamar a la base de datos los productos 
 */
const getProducts = async(req, res) => {

    const products = await Product.findAll();

    res.json(products);
};

/**
 * Controlador para llamar a la base de datos los productos por paginacion
 */
const getProductsPagination = async(req, res) => {

    const {page, size} = req.query;    

    const products = await Product.findAll({
        limit: Number(size),
        offset: Number(page * size),
    });

    res.json(products);
    
};


/**
 * Controlador para llamar a la base de datos los productos  por id
 */
const getProductsById = async(req, res) => {
    
    const { id } = req.params;
    
    const product = await Product.findByPk(id)

    res.json(product);
}

/**
 * Controlador para llamar a la base de datos un producto
 */
const getProduct = async(req, res) => {
    const { name } = req.params;
    
    const product = await db.query(
        'SELECT * FROM product WHERE product.name LIKE :search_name',
        {
          replacements: { search_name: `%${name}%` },
          type: QueryTypes.SELECT
        },
       
    );
    if(product.length === 0){
        res.json({
            msg:'Producto no encontrado'
        });
    }else{
        res.json({
            product
        });
    };
    
};

/**
 * Controlador para llamar a la base de datos un producto por su categoria
 */
const getProductByCategory = async(req, res) => {

    const {id} = req.params;
    const product = await db.query(
        'SELECT * FROM product WHERE product.category =:search_name',
        {
          replacements: { search_name: `${id}` },
          type: QueryTypes.SELECT
        },
        
    );

    if(product.length === 0){
        res.json({
            msg:'Categoria no encontrada'
        });
    }else{
        res.json({
            product
        });
    };    

};




module.exports = {

    getProducts,
    getProduct,
    getProductByCategory,
    getProductsById,
    getProductsPagination
}