const { DataTypes } = require('sequelize');
const db = require('../db/conection');

/**
 * Se define el tipo de variables que contiene la base de datos en la categoria 'category' con sus nombres
 */

const Categoria = db.define('category', {
    name: {
        type: DataTypes.STRING
    }
},{ freezeTableName: true,
    timestamps: false,});


module.exports = Categoria;