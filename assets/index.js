const url = 'http://54.244.79.39:3000/product'
let checkedTags = []
const getProducts = async () => {
  const listTags = []
  const result = await fetch(url)

  const products = await result.json()
  let productsHtml = ''
  for (const product of products) {

    let hasTag = true
    if(checkedTags.length > 0){
      for(let tag of checkedTags){
        if(!product.description.toUpperCase().includes(tag.toUpperCase())) hasTag = false
      }
    }

    if(!hasTag) continue

    const currentTags = product.description.split(' ')

    for (let currentTag of currentTags) {
      if (listTags.includes(currentTag.replace(',','').toUpperCase())) continue
      listTags.push(currentTag.replace(',','').toUpperCase())
    }

    productsHtml += `
        <div class='col-md-6 col-sm-12 d-flex justify-content-center'>
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
                <h5 class="card-title" style="color:#FF0000">R$ ${product.price.toFixed(2).replace(',', '').replace('.', ',')}</h5>
              </div>
            </div>

            <div class="card-footer text-end">
            <a href="${product.link}" class="btn btn-primary">Verificar no site</a>
          </div>
          </div>
        </div>
      </div>
      `
  }

  showTags(listTags)
  document.querySelector('#products').innerHTML = `<div class='row'>${productsHtml}</div>`
}

const showTags = (listTags) => {
  listTags = listTags.sort()
  let htmlTags = ''
  for (const tag of listTags) {
    let checked = ''
    
    if(checkedTags.includes(tag)) checked = 'checked'
    htmlTags += `
    <div class='col-2'>
    <div class="form-check">
    <input class="form-check-input chkTags" type="checkbox" value="${tag.replace(',','')}" ${checked} id="flexCheckIndeterminate">
    <label class="form-check-label" for="flexCheckIndeterminate">
      ${tag.replace(',','')}
    </label>
    </div>
    </div>
  `
  }

  document.querySelector('#tagProducts').innerHTML = `<div class='row'>${htmlTags}</div>`

  const checkboxes = document.querySelectorAll('.chkTags');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

      checkedTags = Array.from(checkboxes).map((checkbox) => checkbox.value);

      getProducts()
    });
  });

}

getProducts()  