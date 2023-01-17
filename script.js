const traerProductos = () => {
    fetch('data/productos.json')
        .then(response => response.json())
        .then(data => {
            const catalogo = document.querySelector('#catalogo');

            for (const item of data) {
                let product = new Producto(item.id, item.nombre, item.categoria, item.precio, item.costo, item.stock, item.imagen)
                const elemento = document.createElement('div');
                elemento.classList.add('tarjetas')
                elemento.innerHTML = `<div class="card" style="width: 18rem;">
                <img src="${product.imagen}" class="card-img-top">
                <div class="card-body justify-content-center">
                  <h5 class="card-title">${product.nombre}</h5>
                  <p class="card-text">Categoria: ${product.categoria}</p>
                  <p class="card-text">Precio: $${product.precio}</p>
                  <a href="#" class="btn btn-secundario" onClick="agregarCarrito(${product.id})">Ver</a>
                  <a href="#" class="btn btn-primario" onClick="agregarCarrito(${product.id})">Agregar al Carrito</a>
                </div>
              </div>`
                catalogo.appendChild(elemento);
            }
            console.log(data)
        })
        .catch(err => console.log(err))
}

class Producto {
    constructor(id, nombre, categoria, precio, costo, stock, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.costo = costo;
        this.stock = stock;
        this.imagen = imagen;
    }
}

let carrito = [];

const agregarCarrito = (id) => {

    let iconCarrito = document.querySelector('#carrito__numero');
    const listaModalCarrito = document.querySelector('#listaModalCarrito')

    fetch('data/productos.json')
        .then(response => response.json())
        .then(data => {
            const listaProductos = data;
            const producto = listaProductos.find((product) => {
                return product.id === id;
            })
            carrito.push(producto);
            actualizarTotalCarrito();


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
                    <span>1</span>
                </div>
                <div class="col-1">
                    <i onClick="eliminarProductoCarrito(${producto.id})" class="bi bi-trash3"></i>
                </div>
            </div>`;

            listaModalCarrito.appendChild(productoCarrito);

            console.log(carrito);
        })
        .catch(err => console.log(err))


    iconCarrito.innerHTML = carrito.length + 1;
}

const eliminarProductoCarrito = (id) => {

    for (let i = 0; i < carrito.length; i++) {
        const element = carrito[i];
        if (id == element.id) {
            carrito.splice(i, 1);
            console.log(carrito);
            actualizarListaCarrito();
            break;
        }
    }
}

const actualizarListaCarrito = () => {
    listaModalCarrito.innerHTML = "";
    let iconCarrito = document.querySelector('#carrito__numero');

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
                    <span>1</span>
                </div>
                <div class="col-1">
                    <i onClick="eliminarProductoCarrito(${producto.id})" class="bi bi-trash3"></i>
                </div>
            </div>`;

        listaModalCarrito.appendChild(productoCarrito);
    }
    actualizarTotalCarrito();
    iconCarrito.innerHTML--;
}

const actualizarTotalCarrito = () => {
    let total = 0;

    for (const product of carrito) {
        total += product.precio;
    }

    let spanTotal = document.querySelector('#carritoTotal')
    spanTotal.innerHTML = `Total: $${total}`;
}


