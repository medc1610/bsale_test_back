

const path = 'https://bsaletestcart.herokuapp.com'
let page = 0
let shopCart = [] 

if(localStorage.getItem('product')){
    shopCart = JSON.parse(localStorage.getItem('product'))
}

const validarInput = () => {
  document.getElementById("btnValidar").disabled = !document.getElementById("InputSearch").value.length;
}

const validarInput2 = () => {
  document.getElementById("btnValidar2").disabled = !document.getElementById("InputSearch2").value.length;
}

const showProductsTemplate = (param) => {  
  let product = param
  
  let html = ''
  for(let i in product){
    html += "<div>" +              
              "<div class=product-card-content>" +
              "<img class=productImage src='"+ (product[i].url_image ? product[i].url_image : "./assets/img/404.png") +"'/>" + 
              "<div class=product-name>" +
                product[i].name +
              "</div>" +
              "<div class=product-card-footer>" +
                "<div>" +
                  "<div class=product-price>" +
                    "<span>" +
                      (product[i].discount === 0 ? (product[i].price + ' CLP' + "<br>" + "<br>")
                                                 : ( "<del>" + product[i].price + ' CLP' + "</del>" + 
                                                 (product[i].price - (product[i].price *(product[i].discount / 100))) + ' CLP')) +
                    "</span>" +
                  "</div>" +
                  "<div class=product-discount>" +
                    (product[i].discount === 0 ? '' : product[i].discount + '% OFF') +
                  "</div>" +
                "</div>" +
                "<div class=button-cart>" +
                  "<button class=btn id=addCart onclick=getProductById('"+ product[i].id +"')>" +
                    "Add to cart" +
                  "</button>" +
                "</div>" +
              "</div>" +
              "</div>" +      
              "</div>"; + ''    
  }
  
  document.getElementById('productCard').innerHTML = html
  
}



const showCartTemplate = (param) => {

  let product = JSON.parse(param)
  let html = ''

  for(let i in product){
    product[i].qty? product[i].qty : product[i].qty = 1
   
    html += "<tr>" +
              "<td>" +
                product[i].name +
              "</td>" +
              "<td>" +
              (product[i].discount === 0 ? (product[i].price + ' CLP' + "<br>" + "<br>")
                                         : ( "<del>" + product[i].price + ' CLP' + "</del>" + 
              (product[i].price - (product[i].price *(product[i].discount / 100))) + ' CLP')) +
              "</td>" +
              "<td>" +
                (product[i].discount === 0 ? '' : product[i].discount + '% OFF') +
              "</td>" + 
              "<td>" +
                "<button class=btn id=btnAdd onclick=add('"+ product[i].id +"')>" +
                  "+" + 
                "</button>" + 
                "<span id=quantity" + product[i].id +">" +
                  product[i].qty + 
                "</span>" +
                "<button class=btn id=btnRemove onclick=remove('"+ product[i].id +"')>" +
                  "-" +
                "</button>" +
              "</td>" +             
              "<td>" +
                "<span id=total" + product[i].id +">" +
                (product[i].price - (product[i].price *(product[i].discount / 100))) * product[i].qty + ' CLP' +
                "</span>" +
              "</td>" +
              
              "<td>" +
                "<button class=btn id=btnDelete onclick=deleteProduct('"+ product[i].id +"')>" +
                  "Delete" +
                "</button>" +
              "</td>" +
            "</tr>"
  }
  localStorage.setItem('product', JSON.stringify(product))
  document.getElementById('cartTableBody').innerHTML = html  
}

const quantityHtml = (id) => {
  return document.getElementById('quantity'+id).innerHTML
}

const add = (id) => {  
    let product = JSON.parse(localStorage.getItem('product'))
    let index = product.findIndex(x => x.id === Number(id))
    product[index].qty++
    localStorage.setItem('product', JSON.stringify(product))
    document.getElementById('quantity'+id).innerHTML = product[index].qty 
    updateCart(id)
    calculateTotalValue() 
  } 
  
const updateCart = (id) => {
  let product = JSON.parse(localStorage.getItem('product'))
  let index = product.findIndex(x => x.id === Number(id))
  let total = (product[index].price - (product[index].price *(product[index].discount / 100))) * product[index].qty
  document.getElementById('total'+id).innerHTML = total + ' CLP'
}

const remove = (id) => {
  let product = JSON.parse(localStorage.getItem('product'))  
  let index = product.findIndex(x => x.id === Number(id))  
  product[index].qty--
  localStorage.setItem('product', JSON.stringify(product))
  document.getElementById('quantity'+id).innerHTML = product[index].qty
  updateCart(id)
  calculateTotalValue()
  if(product[index].qty === 0){   
    deleteProduct(id)
  }
}

const calculateTotalValue = () => {
  
  let products = JSON.parse(localStorage.getItem('product')) 
  if(products === null){
    return
  } else {
    let total = 0  
    products.forEach(element => {
      total += (element.price - (element.price *(element.discount / 100))) * element.qty 
    });
    document.getElementById('totalTableBody').innerHTML = total + ' CLP'
  }
  
}

const showCart = () => {
  const showProducts = localStorage.getItem('product')
  document.getElementById('homeStore').style.display = 'none'
  document.getElementById('productFinderDiv').style.display = 'none'  
  document.getElementById('shopCart').style.display = 'block'
  showCartTemplate( showProducts )    
  calculateTotalValue()  
}

const deleteProduct = (id) => {  
  let product = JSON.parse(localStorage.getItem('product'))  
  let newProduct = []
  for(let i in product){
    if(product[i].id != id){
      newProduct.push(product[i])
    }
  }
  shopCart = newProduct
  localStorage.setItem('product', JSON.stringify(newProduct))  
  showCartTemplate(localStorage.getItem('product'))        
  calculateTotalValue() 
  
}

getPagination = (num) => {
  document.getElementById('productFinderDiv').style.display = 'block'
  page = page + num  
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };    
  if(page >= 0 && page <= 5){
    fetch(`${path}/api/products/pagination?size=10&page=${JSON.stringify(page)}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      result = JSON.parse(result)
      showProductsTemplate(result)
      
    })
    .catch(error => console.log('error', error));
    document.getElementById('homeStore').style.display = 'block'
    document.getElementById('shopCart').style.display = 'none'             
  }else{
    page = 0
    fetch(`${path}/api/products/pagination?size=10&page=${JSON.stringify(page)}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      result = JSON.parse(result)
      showProductsTemplate(result)
    })
    .catch(error => console.log('error', error));
    document.getElementById('homeStore').style.display = 'block'
    document.getElementById('shopCart').style.display = 'none'    
  } 
}

const getProductById = (id) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch(`${path}/api/products/id/${id}`, requestOptions)
    .then(response => response.text())
    .then(result => {       
      result = JSON.parse(result) 
      if(shopCart.findIndex(x => x.id === result.id) === -1){        
        shopCart.push(result)
        localStorage.setItem('product', JSON.stringify(shopCart))
      }
    })
    .catch(error => console.log('error', error));
}
  
const getCategories = () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`${path}/api/category`, requestOptions)
    .then(response => response.text())
    .then(result =>{ 
          result = JSON.parse(result)
          categoriesTemplate(result)})
    .catch(error => console.log('error', error));
}

const categoriesTemplate = (categories) => {
  let html = ''
  for(let i in categories){
    html += "<button class='btn btn-dark mb-3 text-capitalize'  onclick='getCategoryById("+categories[i].id+")'>" + categories[i].name + "</button>"
  }
  document.getElementById('categories').innerHTML = html
  document.getElementById('categories2').innerHTML = html
}

const getCategoryById = async(id) => {  
  document.getElementById('productFinderDiv').style.display = 'block'
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }; 
  await fetch(`${path}/api/products/category/${id}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      result = JSON.parse(result).product
      showProductsTemplate(result)
    })
    .catch(error => console.log('error', error));    
    document.getElementById('homeStore').style.display = 'block'
    document.getElementById('shopCart').style.display = 'none'
}

const getProducts = async(name) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };  
  await fetch(`${path}/api/products/${name}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

const productFinder = document.getElementById('productFinder')


productFinder.addEventListener('submit', function (e){  
  e.preventDefault()
  let datos = new FormData(productFinder)
  datos = (datos.get('productName')).toUpperCase()
  const url = `${path}/api/products/${datos}`

  fetch(url)
    .then(response => response.text())
    .then(result => {
      result = JSON.parse(result).product
      showProductsTemplate(result)
    })
    .catch(error => console.log('error', error));
})

const productFinder2 = document.getElementById('productFinder2')

productFinder2.addEventListener('submit', function (e){  
  e.preventDefault()
  let datos = new FormData(productFinder2)
  datos = (datos.get('productName')).toUpperCase()
  const url = `${path}/api/products/${datos}`

  fetch(url)
    .then(response => response.text())
    .then(result => {
      result = JSON.parse(result).product
      showProductsTemplate(result)
    })
    .catch(error => console.log('error', error));
})


window.onload = () => {  
  getPagination()
  calculateTotalValue()
}