const url = 'http://54.244.79.39:3000'
let checkedTags = []
const getProducts = async (page=1) => {
  
  const result = await fetch(`${url}/product/?page=${page}&tags=${checkedTags.join()}`)

  const products = await result.json()
  let productsHtml = ''
  for (const product of products) {

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
  document.querySelector('#products').innerHTML = `<div class='row'>${productsHtml}</div>`
}

const showTags = async () => {
  const result = await fetch(`${url}/product/tag`)

  let listTags = await result.json()
  listTags = listTags.sort()
  console.log(listTags)
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
showTags()