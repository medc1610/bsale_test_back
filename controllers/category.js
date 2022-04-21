const Category = require("../models/category");


const getCategories = async(req, res) => {

    const category = await Category.findAll();

    res.json(category);
};



module.exports = {
    getCategories
}