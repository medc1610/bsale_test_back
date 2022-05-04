const express = require('express');
const cors = require('cors');
const db = require('../db/conection');

class Server {

    constructor(){        
        this.app = express();
        this.port = process.env.PORT;
        this.productsPath = '/api/products';
        this.categoriesPath = '/api/category';

        this.midlewares();
                
        this.dbConnection();
         
        this.routes();
    };

    async dbConnection(){

        try {

            await db.authenticate();
            console.log('Base de datos online');

        } catch (error) {

           throw new Error(error);

    }}

    midlewares(){
        this.app.use(cors())
        this.app.use(express.static('public'));        
    };

    routes(){        
        this.app.use(this.productsPath, require('../routes/product'))
        this.app.use(this.categoriesPath, require('../routes/category'))
    };

    listen(){        
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', this.port)
        })
    };


}


module.exports = Server;