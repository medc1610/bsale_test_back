const { Router } = require("express");
const { getCategories } = require("../controllers/category");

const ruta = Router()

ruta.get('/',  getCategories);


module.exports = ruta;