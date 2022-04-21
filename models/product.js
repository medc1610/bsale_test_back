const { DataTypes } = require('sequelize');
const db = require('../db/conection');

const Product = db.define('product', {
    name: {
        type: DataTypes.STRING
    },
    url_image: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT
    },

    discount: {
        type: DataTypes.INTEGER
    },

    category: {
        type: DataTypes.INTEGER
    },
},{ freezeTableName: true,
    timestamps: false,});


module.exports = Product;