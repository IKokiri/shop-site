const url = 'http://54.244.79.39:3000/product'


const getProducts = async () => {
    const result = await fetch(url)

    const products = await result.json()
    let productsHtml = ''
    for(const product of products){
        productsHtml += `<div class="card" style="width: 18rem;">
        <img src="${product.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.description}</h5>
          <p class="card-text">R$ ${product.price.toFixed(2)}</p>
          <a href="#" class="btn btn-primary">Ir para o site</a>
        </div>
      </div>`
    }

    document.querySelector('#products').innerHTML = `<div class='row'>${productsHtml}</div>`

}

getProducts()