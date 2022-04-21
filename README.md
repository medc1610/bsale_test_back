# Bsale_test Prueba tecnica

_Prueba tecnica, la cual consiste en construir una tienda online que despliegue productos agrupados por la categoría a la que pertenecen, generando por separado backend y frontend y utilizando la base de datos que se disponibiliza para su desarrollo._


### Pre-requisitos 📋

```
[Node.js](https://nodejs.org/en/) (v14.x or higher)
```

### Instalación 🔧

_Primero descargar el proyecto, instalar NodeJS e instalar instancias requeridas_

```
npm install
npm start
```

## Ejecutando las pruebas ⚙️

_GET Obtencion de productos_

```
const getProductsById = async(req, res) => {
    
    const { id } = req.params;
    
    const product = await Product.findByPk(id)

    res.json(product);
}
```
##### Respuesta
_Producto_
```
{id: 5, name: "ENERGETICA MR BIG",…}
category: 1
discount: 20
id: 5
name: "ENERGETICA MR BIG"
price: 1490
url_image: "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg"
```
_GET Obtencion de productos por nombre_

```
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

```

####Respuesta

```
id: 7, name: "ENERGETICA SCORE",
category: 1
discount: 0
id: 7
name: "ENERGETICA SCORE"
price: 1290
url_image: "https://dojiw2m9tvv09.cloudfront.net/11132/product/logo7698.png"
```
## Despliegue 📦

_para hacer deploy de se deben seguir los siguientes comandos_

```
git init
git add .
git commit -m "nombre de commit"
git push
git push heroku main
```