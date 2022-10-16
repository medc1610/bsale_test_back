const Category = require("../models/category");

/**
 * Controlador para llamar a la base de datos las categorias
 */
const getCategories = async(req, res) => {

    const category = await Category.findAll();

    res.json(category);
};



module.exports = {
    getCategories
}