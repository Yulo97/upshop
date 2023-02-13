const catalogoProductos = document.querySelector('#catalogo-productos');

document.addEventListener('DOMContentLoaded', () =>{
    if (!localStorage.getItem('menuCategoria')) {
        traerProductos()
    }
    else if (localStorage.getItem('menuCategoria')) {
        traerProductos(localStorage.getItem('menuCategoria'))
        localStorage.removeItem('menuCategoria')
    }
    paginaIndex.addEventListener('click', e => {
        if (e.target.classList.contains('categoria__producto')) {
            traerProductos(e.target.textContent.toUpperCase())
        }
    })

    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }

    actualizarCarrito()
    actualizarTotalCarrito()
})

const traerProductos = (categoria) => {
    catalogoProductos.innerHTML = "";

    fetch('data/productos.json')
        .then(response => response.json())
        .then(data => {
            if (categoria == null) {
                for (const product of data) {
                    const elemento = document.createElement('div');
                    elemento.classList.add('tarjetas')
                    elemento.innerHTML = `<div class="card" style="width: 18rem;">
            <img src="${product.imagen}" class="card-img-top imagen-del-producto">
            <div class="card-body justify-content-center">
              <h5 class="card-title titulo-del-producto">${product.nombre}</h5>
              <p class="card-text">Categoria: ${product.categoria}</p>
              <p class="card-text">Precio: $<span class="producto-precio">${product.precio}</span></p>
              <a href="#" class="btn btn-secundario btn-ver-producto">Ver</a>
              <a href="#" class="btn btn-primario btn-agregar-carrito">Agregar al Carrito</a>
              <span class="product-id">${product.id}</span>
            </div>
            </div>`
                    catalogoProductos.appendChild(elemento);
                }
            }

            else {
                for (const product of data) {
                    if (categoria.toUpperCase() == product.categoria.toUpperCase()) {
                        const elemento = document.createElement('div');
                        elemento.classList.add('tarjetas')
                        elemento.innerHTML = `<div class="card" style="width: 18rem;">
                <img src="${product.imagen}" class="card-img-top imagen-del-producto">
                <div class="card-body justify-content-center">
                  <h5 class="card-title titulo-del-producto">${product.nombre}</h5>
                  <p class="card-text">Categoria: ${product.categoria}</p>
                  <p class="card-text">Precio: $<span class="producto-precio">${product.precio}</span></p>
                  <a href="#" class="btn btn-secundario btn-ver-producto">Ver</a>
                  <a href="#" class="btn btn-primario btn-agregar-carrito">Agregar al Carrito</a>
                  <span class="product-id">${product.id}</span>
                </div>
              </div>`
                        catalogoProductos.appendChild(elemento);
                    }
                }
            }
        })
        .catch(err => console.log(err))
}

//agregar productos
catalogoProductos.addEventListener('click', e => {
    e.preventDefault();

    const divProduct = e.target.parentElement

    const product = {
        id: Number(divProduct.querySelector('.product-id').textContent),
        imagen: divProduct.parentElement.querySelector('.imagen-del-producto').getAttribute("src"),
        nombre: divProduct.querySelector('.titulo-del-producto').textContent,
        precio: Number(divProduct.querySelector('.producto-precio').textContent)
    }

    const {id, imagen, nombre, precio} = product

    agregarProducto(e, id, imagen, nombre, precio);
})
