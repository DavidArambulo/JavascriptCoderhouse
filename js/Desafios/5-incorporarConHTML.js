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

// Función que me permite pedir un producto o comando mediante prompt
function pedirDato() {
    let dato = prompt(
        `Este es nuestro catalogo de productos: 0.- FIN; 1.- Camperas -> $${campera.precio}; 2.- Remeras -> $${remera.precio}; 3.- Jeans -> $${jean.precio}; 4.- Bermudas -> $${bermuda.precio}; 5.- Gorras -> $${gorra.precio}; 6.- VACIAR CARRITO; Ingrese el codigo del producto:`
    )
    dato = parseInt(dato)
    return dato
}

// Función que me permite validar si el codigo del producto o comando existe y en caso de que no exista pedir uno nuevo
function validarDato(dato) {
    while (dato < 0 || dato > 6){
        alert(`${dato} no corresponde a ningún producto del catalogo`)
        dato = pedirDato();
    }
    return dato;
}

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

function crearProducto(){
    console.log(carrito)
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

// Función para sumar al carrito de compras el precio de un producto y en caso de ser necesario vaciarlo
// Buscar una forma de hacer que la funcion sea escalable a muchos mas productos
function sumarAlCarrito(camperas, remeras, jeans, bermudas, gorras) {
    for (let i = 0; i < camperas; i++){
        agregarProducto(campera)
        costo += campera.precio
    }
    for (let i = 0; i < remeras; i++){
        agregarProducto(remera)
        costo += remera.precio
    }
    for (let i = 0; i < jeans; i++){
        agregarProducto(jean)
        costo += jean.precio
    }
    for (let i = 0; i < bermudas; i++){
        agregarProducto(bermuda)
        costo += bermuda.precio
    }
    for (let i = 0; i < gorras; i++){
        agregarProducto(gorra)
        costo += gorra.precio
    }
}

calcularCosto()
contarProductos()

const formCatalogo = document.getElementById('catalogo')
const cantCampera = document.getElementById('cantidad-campera')
const cantRemera = document.getElementById('cantidad-remera')
const cantJean = document.getElementById('cantidad-jean')
const cantBermuda = document.getElementById('cantidad-bermuda')
const cantGorra = document.getElementById('cantidad-gorra')

formCatalogo.addEventListener('submit',(event) => {
    event.preventDefault()

    const camperas = cantCampera.value
    const remeras = cantRemera.value
    const jeans = cantJean.value
    const bermudas = cantBermuda.value
    const gorras = cantGorra.value

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
})

formCatalogo.addEventListener('reset',(event) => {
    event.preventDefault()

    vaciarCarrito()
})

// INICIO
/*
alert('¡BIENVENIDO!')

// Pido el código de un producto (o comando) y lo valido
let inputProducto = pedirDato()
inputProducto = validarDato(inputProducto)

// Creo el carrito de compras
if (inputProducto !== 0) {
    // Agrego al carrito de compras (o lo vacío), pido un nuevo dato y lo valido
    while (inputProducto !== 0) {
        sumarAlCarrito(inputProducto);
        guardarCarrito()
        //calcularCosto()
        //console.log(costo) // Esta linea sirve para viualizar como va aumentando el costo del carrito
        console.log(carrito)
        inputProducto = pedirDato()
        inputProducto = validarDato(inputProducto)
    }
    calcularCosto()

    // Pido un cupon de descuento y valido que exista
    let cuponDescuento = prompt ('Ingrese su cupón de descuento:')
    cuponDescuento = cuponDescuento.toUpperCase()

    if (cuponDescuento === 'D3SAFIO10%'){
        aplicarDescuento()
    } else {
        alert ('El cupón ingresado no es válido')
    }

    // Muestro el todal del carrito de compras
    alert (`Su carrito de cuesta $${costo}`)
}
*/
//FIN