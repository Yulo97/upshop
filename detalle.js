
// nodos HTML
const precio = document.querySelector('.precio__numero')
const titulo = document.querySelector('#producto__titulo')
const img = document.querySelector('#img__foto')

document.addEventListener('DOMContentLoaded', () =>{
    const product = JSON.parse(localStorage.getItem('producto'));

    precio.innerHTML = product.precio;
    titulo.innerHTML = product.nombre;
    img.src = product.imagen

    console.log(product)
})

