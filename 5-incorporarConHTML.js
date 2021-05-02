/*
    Idea: para un e-commerce hacer un carrito de compras
    que despues pida cupones de descuento
*/

class Producto {
    constructor (nombre, precio, stock){
        this.nombre = nombre.toLowerCase();
        this.precio = parseFloat(precio);
        this.stock  = parseInt(stock);
    }
}
/* RE PENSAR UNA NUEVA FORMA DE HACERLO
consultaStock(numero){
        if (this.stock < numero) {
            alert(`No hay stock suficiente de ${this.nombre}`);
            throw new Error(`No hay stock suficiente de ${this.nombre}`);
        }
    }
*/

const campera = new Producto('Campera', '4000', '10');
const remera = new Producto('Remera', '2000', '25');
const jean = new Producto('Jean', '3500', '15');
const bermuda = new Producto('Bermuda', '3000', '10');
const gorra = new Producto('Gorra', '2000', '5');

let carrito = JSON.parse(localStorage.getItem('carrito'))

if (!carrito){
    carrito = []
}

let costo = 0
let totalCamperas = 0
let totalRemeras = 0
let totalJeans = 0
let totalBermudas = 0
let totalGorras = 0

// Funcion para contar los elementos presentes en el carrito de compras
// Aplicar corte de control
function contarProductos(){
    for(let i = 0; i < carrito.length; i++){
        if (carrito[i].nombre === 'campera') {
            totalCamperas++
        } else if (carrito[i].nombre === 'remera'){
            totalRemeras++
        } else if (carrito[i].nombre === 'jean'){
            totalJeans++
        } else if (carrito[i].nombre === 'bermuda'){
            totalBermudas++
        } else if (carrito[i].nombre === 'gorra'){
            totalGorras++
        }
    }
}

function agregarProducto(producto){
    carrito.push(producto)
}

function vaciarCarrito(){
    carrito.splice(0,carrito.length)
    costo = 0
    localStorage.removeItem('carrito')
}

function calcularCosto(){
    for(let i = 0; i < carrito.length; i++){
        costo += carrito[i].precio
    }
}

function aplicarDescuento(){
    costo -= costo * 0.1
}

function guardarCarrito(){
    localStorage.setItem('carrito',JSON.stringify(carrito))
}

calcularCosto()
contarProductos()

const formCatalogo = document.getElementById('catalogo')
const cantCampera = document.getElementById('cantidad-campera')
const cantRemera = document.getElementById('cantidad-remera')
const cantJean = document.getElementById('cantidad-jean')
const cantBermuda = document.getElementById('cantidad-bermuda')
const cantGorra = document.getElementById('cantidad-gorra')
const listaCarrito = document.getElementById('carrito')
const inputCupon = document.getElementById('input-cupon')

// Función para sumar al carrito de compras el precio de un producto y en caso de ser necesario vaciarlo
// Buscar una forma de hacer que la funcion sea escalable a muchos mas productos
function sumarAlCarrito(camperas, remeras, jeans, bermudas, gorras) {
    for (let i = 0; i < camperas; i++){
        agregarProducto(campera)
        costo += campera.precio
        let itemCarrito = document.createElement('li')
        itemCarrito.textContent = `Producto: ${campera.nombre} Precio: ${campera.precio}`
        listaCarrito.appendChild(itemCarrito)
    }
    for (let i = 0; i < remeras; i++){
        agregarProducto(remera)
        costo += remera.precio
        let itemCarrito = document.createElement('li')
        itemCarrito.textContent = `Producto: ${remera.nombre} Precio: ${remera.precio}`
        listaCarrito.appendChild(itemCarrito)
    }
    for (let i = 0; i < jeans; i++){
        agregarProducto(jean)
        costo += jean.precio
        let itemCarrito = document.createElement('li')
        itemCarrito.textContent = `Producto: ${jean.nombre} Precio: ${jean.precio}`
        listaCarrito.appendChild(itemCarrito)
    }
    for (let i = 0; i < bermudas; i++){
        agregarProducto(bermuda)
        costo += bermuda.precio
        let itemCarrito = document.createElement('li')
        itemCarrito.textContent = `Producto: ${bermuda.nombre} Precio: ${bermuda.precio}`
        listaCarrito.appendChild(itemCarrito)
    }
    for (let i = 0; i < gorras; i++){
        agregarProducto(gorra)
        costo += gorra.precio
        let itemCarrito = document.createElement('li')
        itemCarrito.textContent = `Producto: ${gorra.nombre} Precio: ${gorra.precio}`
        listaCarrito.appendChild(itemCarrito)
    }
}

// Funcion para mostrar los elementos del carrito
// Aplicar corte de control
function mostrarCarrito(){
    for (let i = 0; i < carrito.length; i++){
        let itemCarrito = document.createElement('li')
        itemCarrito.textContent = `Producto: ${carrito[i].nombre} Precio: ${carrito[i].precio}`
        listaCarrito.appendChild(itemCarrito)
    }
}

mostrarCarrito()

let descuentoAplicado = false

formCatalogo.addEventListener('submit',(event) => {
    event.preventDefault()

    const camperas = cantCampera.value
    const remeras = cantRemera.value
    const jeans = cantJean.value
    const bermudas = cantBermuda.value
    const gorras = cantGorra.value
    const cuponDescuento = inputCupon.value

    sumarAlCarrito(camperas, remeras, jeans, bermudas, gorras)
    totalCamperas += cantCampera
    totalRemeras += cantRemera
    totalJeans += cantJean
    totalBermudas += cantBermuda
    totalGorras += cantGorra
    guardarCarrito()

    cantCampera.value = 0
    cantRemera.value = 0
    cantJean.value = 0
    cantBermuda.value = 0
    cantGorra.value = 0

    if (cuponDescuento.toUpperCase() === 'D3SAFIO10%' && !descuentoAplicado){
        aplicarDescuento()
    } else {
        alert ('No se puede aplicar el cupón ingresado')
    }

    alert (`Su carrito de cuesta $${costo}`)
})

formCatalogo.addEventListener('reset',(event) => {
    event.preventDefault()
    vaciarCarrito()
})
