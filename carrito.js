const iconCarrito = document.querySelector('#carrito__numero');
const listaModalCarrito = document.querySelector('.listaModalCarrito');
const spanTotal = document.querySelector('#carritoTotal');

let carrito = [];

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

const agregarProducto = (event, id, imagen, nombre, precio) => {
    if (event.target.classList.contains('btn-agregar-carrito')) {

        const product = {
            id: id,
            imagen: imagen,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        }

        const index = carrito.findIndex(element => product.id == element.id)

        if (index !== -1) {
            carrito[index].cantidad++;
        }
        else {
            carrito.push(product)
        }

        localStorage.setItem('carrito', JSON.stringify(carrito))

        actualizarCarrito()
        actualizarTotalCarrito()
        console.log(carrito)
    }
    else if (event.target.classList.contains('btn-ver-producto')) {
        const divProduct = (event.target.parentElement)

        const product = {
            id: Number(divProduct.querySelector('.product-id').textContent),
            imagen: divProduct.parentElement.querySelector('img').getAttribute("src"),
            nombre: divProduct.querySelector('h5').textContent,
            precio: Number(divProduct.querySelector('.producto-precio').textContent)
        }

        localStorage.setItem('producto', JSON.stringify(product))

        window.location.pathname = "detalle.html";
    }

    Toastify({
        text: `Producto Agregado: ${nombre}`,
        duration: 3500,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #DE2572, #FAAE7B)",
        },
        onClick: () => { // Callback after click
            $('#modalCarrito').modal('show');
            //document.querySelector('#modalCarrito').modal('show'); // Esto no funciona, por eso se uso Jquery
        } 
      }).showToast();
}

// eliminar producto del carrito
listaModalCarrito.addEventListener('click', e => {
    if (e.target.classList.contains('icon-eliminar-producto')) {

        const productoDelCarrito = e.target.parentElement.parentElement

        const objeto = {
            cantidad: productoDelCarrito.querySelector('.carrito-cantidad-producto').textContent,
            id: Number(productoDelCarrito.querySelector('.product-id').textContent)
        }
        const index = carrito.findIndex(element => element.id === objeto.id)

        if (index !== -1) {
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad--;

            }
            else {
                carrito.splice(index, 1)
            }
        }

        localStorage.setItem("carrito", JSON.stringify(carrito))

        actualizarCarrito();
        actualizarTotalCarrito();
    }
})