const url = 'http://54.244.79.39:3000/product'


const getProducts = async () => {
  const result = await fetch(url)

  const products = await result.json()
  let productsHtml = ''
  for (const product of products) {
    let link = ''

    if(product.description.includes('K001'))
      link = `https://www.kabum.com.br/busca/${product.description.replace(' - K001','')}`

    if(product.description.includes('P001'))
      link = `https://www.pichau.com.br/${product.description.replace(' - P001','').replaceAll(' ','-').replaceAll(',','').replaceAll('.','-').replaceAll('/','-').replaceAll('--','-')}`

  
    productsHtml += `
        <div class='col-6 d-flex justify-content-center'>
        <div class="card mb-3" style="max-width: 540px; min-height: 200px">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${product.image}" class="img-fluid rounded-start m-2" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${product.description}</h5>
              </div>

              <div class="card-body">
                <h5 class="card-title" style="color:#FF0000">R$ ${product.price.toFixed(2).replace(',','').replace('.',',')}</h5>
              </div>
            </div>

            <div class="card-footer text-end">
            <a href="${link}" class="btn btn-primary">Verificar no site</a>
          </div>
          </div>
        </div>
      </div>
      `
  }

  document.querySelector('#products').innerHTML = `<div class='row'>${productsHtml}</div>`

}

getProducts()  