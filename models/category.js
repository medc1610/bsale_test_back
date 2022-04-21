const { DataTypes } = require('sequelize');
const db = require('../db/conection');

const Categoria = db.define('category', {
    name: {
        type: DataTypes.STRING
    }
},{ freezeTableName: true,
    timestamps: false,});


module.exports = Categoria;