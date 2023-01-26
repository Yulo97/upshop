// nodos html //
const catalogoProductos = document.querySelector('#catalogo-productos');
const iconCarrito = document.querySelector('#carrito__numero');
const listaModalCarrito = document.querySelector('#listaModalCarrito');
const spanTotal = document.querySelector('#carritoTotal')

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('data/productos.json')
    .then(response => response.json())
    .then(data => {
        for (const product of data) {
            const elemento = document.createElement('div');
            elemento.classList.add('tarjetas')
            elemento.innerHTML = `<div class="card" style="width: 18rem;">
            <img src="${product.imagen}" class="card-img-top">
            <div class="card-body justify-content-center">
              <h5 class="card-title">${product.nombre}</h5>
              <p class="card-text">Categoria: ${product.categoria}</p>
              <p class="card-text">Precio: $<span class="producto-precio">${product.precio}</span></p>
              <a href="#" class="btn btn-secundario btn-agregar-carrito">Ver</a>
              <a href="#" class="btn btn-primario btn-agregar-carrito">Agregar al Carrito</a>
              <span class="product-id">${product.id}</span>
            </div>
          </div>`
            catalogoProductos.appendChild(elemento);
        }
    })
    .catch(err => console.log(err))

    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        actualizarCarrito()
        actualizarTotalCarrito()
    }
})

// agregar producto al carrito
catalogoProductos.addEventListener('click', e => {
    if (e.target.classList.contains('btn-agregar-carrito')) {
        const divProduct = (e.target.parentElement)

        const product = {
            id: Number(divProduct.querySelector('.product-id').textContent),
            cantidad: 1,
            imagen: divProduct.parentElement.querySelector('img').getAttribute("src"),
            nombre: divProduct.querySelector('h5').textContent,
            precio: Number(divProduct.querySelector('.producto-precio').textContent)
        }

        const index = carrito.findIndex( element => product.id === element.id)

        if(index !== -1){
            carrito[index].cantidad++;      
        }
        else{
            carrito.push(product)
        }

        actualizarCarrito()
        actualizarTotalCarrito()
        console.log(carrito)
    }
})

// eliminar producto del carrito
listaModalCarrito.addEventListener('click', e => {
    if(e.target.classList.contains('icon-eliminar-producto')){
        const productoDelCarrito = e.target.parentElement.parentElement

        const objeto = {
            cantidad: productoDelCarrito.querySelector('.carrito-cantidad-producto').textContent,
            id: Number(productoDelCarrito.querySelector('.product-id').textContent)
        }
            const index = carrito.findIndex( element => element.id === objeto.id   )

            if(index !== -1){
                if(carrito[index].cantidad > 1){
                    carrito[index].cantidad--;
                }
                else{
                    carrito.splice(index, 1)
                }
            }
            actualizarCarrito();
            actualizarTotalCarrito();
            console.log(carrito)
    }
})

// actualizar HTML de carrito
const actualizarCarrito = () => {
    listaModalCarrito.innerHTML = "";
    let cantidad = 0;

    for (const producto of carrito) {
        const productoCarrito = document.createElement('li');
        productoCarrito.classList.add('carrito__producto');
        productoCarrito.innerHTML = `
            <div class="row">
                <div class="col-2">
                    <img src="${producto.imagen}" height="60px">                    
                </div>
                <div class="col-5">
                    <span><b>${producto.nombre}</b></span><br>
                    <span>Precio: $${producto.precio}</span>
                </div>
                <div class="col-3">
                    <span>Cantidad:</span><br>
                    <span class='carrito-cantidad-producto'>${producto.cantidad}</span>
                    <span class="product-id">${producto.id}</span>
                </div>
                <div class="col-1">
                    <i class="bi bi-trash3 icon-eliminar-producto"></i>
                </div>
            </div>`;

        listaModalCarrito.appendChild(productoCarrito);
        cantidad += producto.cantidad;
    }
    iconCarrito.innerHTML = cantidad;
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const actualizarTotalCarrito = () => {
    let total = 0;
    for (const element of carrito) {
        total += element.precio * element.cantidad
    }
    spanTotal.innerHTML = `Total: $${total}`;
}


