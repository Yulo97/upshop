const tarjetas = document.querySelector('.tarjetas')
const producto = JSON.parse(localStorage.getItem('producto'));


document.addEventListener('DOMContentLoaded', () => {
    const precio = document.querySelector('.precio__numero')
    const titulo = document.querySelector('.producto__titulo')
    const img = document.querySelector('#img__foto')
    const id = document.querySelector('.product-id')

    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
    }

    console.log(producto)

    id.innerHTML = producto.id;
    precio.innerHTML = producto.precio;
    titulo.innerHTML = producto.nombre;
    img.src = producto.imagen

    actualizarCarrito()
    actualizarTotalCarrito()

    paginaDetalle.addEventListener('click', e => {
        if (e.target.classList.contains('categoria__producto')) {
            window.location.pathname = "index.html";
            localStorage.setItem('menuCategoria', e.target.textContent.toUpperCase())
        }
    })
})

tarjetas.addEventListener('click', e => {
    e.preventDefault();
    agregarProducto(e, producto.id, producto.imagen, producto.nombre, producto.precio);
})