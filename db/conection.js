const { Sequelize } = require('sequelize');

/**
 * metodo de conexion a la base de datos utilizando el host y dialecto
 */

const db  = new Sequelize('bsale_test', 'bsale_test', 'bsale_test', {
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    dialect:'mysql'
});

module.exports = db;
