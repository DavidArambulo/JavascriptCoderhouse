class Producto {
    constructor (nombre, precio, id){
        this.nombre = nombre.toLowerCase()
        this.precio = parseFloat(precio)
        this.id     = parseInt(id)
        this.stock  = true
    }
}

/*const campera = new Producto('Campera', '4000', '1')
const remera = new Producto('Remera', '2000', '2')
const jean = new Producto('Jean', '3500', '3')
const bermuda = new Producto('Bermuda', '3000', '4')
const gorra = new Producto('Gorra', '2000', '5')*/

let productos = []

function crearProducto(nombre, precio, id){
    const nuevoProducto = new Producto(nombre, precio, id)
    productos.push(nuevoProducto)
}

function buscarProductoId(id){
    const productoABuscar = productos.find( id => producto.id === id)

    if (!productoABuscar){
        throw new Error (`No existe el producto de ${id}`)
    }

    return productoABuscar
}

crearProducto('Campera', '4000', '1')
crearProducto('Remera', '2000', '2')
crearProducto('Jean', '3500', '3')
crearProducto('Bermuda', '3000', '4')
crearProducto('Gorra', '2000', '5')

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


function agregarAlCarrito(idProducto, cantidad = 1){ // equivale a SumarAlCarrito
    const productoAgregar = buscarProductoId(idProducto)
    let enCarrito = false

    for (let i = 0; i < carrito; i++) {
        if (carrito[i].id === productoAgregar.id){
            carrito[i].cant += cantidad
            enCarrito = true
        }
    }

    if (!enCarrito){
        productoAgregar.cant = 1
        carrito.push(producto)
    }
}

function vaciarCarrito(){
    carrito.splice(0,carrito.length)
    costo = 0
    localStorage.removeItem('carrito')
}

/*function calcularCosto(){
    for(let i = 0; i < carrito.length; i++){
        costo += carrito[i].precio
    }
}*/

function aplicarDescuento(){
    costo -= costo * 0.1
}

function guardarCarrito(){
    localStorage.setItem('carrito',JSON.stringify(carrito))
}

//calcularCosto()
//contarProductos()

// Se utiliza la notacion [elemento][id] 
// donde: 
// "elemento" esta relacionado a un producto;
// y "id" es el id del producto
// Ej: "cant0" es la cantidad de productos de id === 0

//const formCatalogo = document.getElementById('catalogo')
const cant1 = document.getElementById('cant1')
const cant2 = document.getElementById('cant2')
const cant3 = document.getElementById('cant3')
const cant4 = document.getElementById('cant4')
const cant5 = document.getElementById('cant5')
const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const btn4 = document.getElementById('btn4')
const btn5 = document.getElementById('btn5')
const vaciar = document.getElementById('vaciar')
const listaCarrito = document.getElementById('carrito')
const inputCupon = document.getElementById('input-cupon')

// Función para sumar al carrito de compras el precio de un producto y en caso de ser necesario vaciarlo
// Buscar una forma de hacer que la funcion sea escalable a muchos mas productos
/*function sumarAlCarrito(camperas, remeras, jeans, bermudas, gorras) {
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
}*/

// Funcion para mostrar los elementos del carrito
// Aplicar corte de control
/*function mostrarCarrito(){
    for (let i = 0; i < carrito.length; i++){
        let itemCarrito = document.createElement('li')
        itemCarrito.textContent = `Producto: ${carrito[i].nombre} Precio: ${carrito[i].precio}`
        listaCarrito.appendChild(itemCarrito)
    }
}*/

//mostrarCarrito()

btn1.addEventListener('click', agregarAlCarrito(1,cant1))
console.log(carrito)