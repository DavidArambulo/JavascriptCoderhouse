// Creacion de la clase Producto y de una lista útil para la utilización de estos
class Producto {
    constructor (nombre, color, sexo, precio, id){
        this.nombre = nombre.toLowerCase()
        this.precio = parseFloat(precio)
        this.id     = parseInt(id)
        this.sexo = sexo.toLowerCase()
        this.color  = color.toLowerCase()
        this.cant   = 0
        this.subtotal = 0
    }
}

let productos = []
let productosFiltrado = []

// Obtencion de los productos de la base de datos
const URL = './database/db-productos.json'

$( document ).ready(() => {
    /*$.get(`${URL}`, (response, status) => {
        if (status === 'success'){
            for ( let i = 0; i < response.length; i++){
                crearProducto(response[i].nombre, response[i].color, response[i].sexo, response[i].precio, response[i].id)
            }
            productosFiltrado = productos
            mostrarCatalogo()
            actualizarCarrito()
        }
    })*/
    $.ajax({
        method: "GET",
        url: `${URL}`,
        success: (response) => {
            for ( let i = 0; i < response.length; i++){
                crearProducto(response[i].nombre, response[i].color, response[i].sexo, response[i].precio, response[i].id)
            }
            productosFiltrado = productos
            mostrarCatalogo()
            actualizarCarrito()
        }
    })
})

// Funciones relacionadas al array de productos
function crearProducto(nombre, color, sexo, precio, id){
    const nuevoProducto = new Producto(nombre, color, sexo, precio, id)
    productos.push(nuevoProducto)
}

function buscarProductoId(id){
    const productoABuscar = productos.find( producto => producto.id === id)

    if (!productoABuscar){
        throw new Error (`No existe el producto de ${id}`)
    }

    return productoABuscar
}

// Inicializacion de variables, constantes y listas necesarias
let carrito = JSON.parse(localStorage.getItem('carrito'))

if (!carrito){
    carrito = []
}

let subtotal = 0
let descuento = 0
let total = 0
let cuponDescuentoAplicado = false

// Funciones para realizar calculos de totales, descuentos y validaciones
function calcularSubtotalProducto(producto){
    producto.subtotal = producto.cant * producto.precio
}

function calcularSubtotal(){
    subtotal = 0
    for (let i = 0; i < carrito.length; i++){
        subtotal += carrito[i].subtotal
    }
}

function calcularDescuento(){
    descuento = subtotal * 0.1
}

function validarCupon(cupon){
    if (cupon.toUpperCase() === 'D3SAFIO10%' && !cuponDescuentoAplicado){
        cuponDescuentoAplicado = true
    } else {
        alert ('No se puede aplicar el cupón ingresado')
    }
}

function calcularTotal(){
    if (cuponDescuentoAplicado){
        calcularDescuento()
        total = subtotal - descuento
    } else{
        total = subtotal
    }
}

function actualizarTotales(){
    calcularSubtotal()
    calcularTotal()
}

// Constantes de escucha de elementos del html
const vaciar = document.getElementById('vaciar')
const listaCarrito = document.getElementById('carrito')
const inputCupon = document.getElementById('input-cupon')
const btnValidarCupon = document.getElementById('btn-validar-cupon')
const carritoHtml = document.getElementById('carrito')
const totalesCarrito = document.getElementById('totales-carrito')

// Funciones para la manipulación del carrito de compras
function guardarCarrito(){
    localStorage.setItem('carrito',JSON.stringify(carrito))
}

function agregarAlCarrito(idProducto, cantidad = 1){
    const productoAgregar = buscarProductoId(idProducto)
    let enCarrito = false
    if (cantidad !== 0){
        for (let i = 0; i < carrito.length; i++) {
            if (carrito[i].id === productoAgregar.id){
                carrito[i].cant += cantidad
                calcularSubtotalProducto(carrito[i])
                guardarCarrito()
                actualizarTotales()
                enCarrito = true
            }
        }
        if (!enCarrito){
            carrito.push(productoAgregar)
            const iUltimoProducto = carrito.length-1
            carrito[iUltimoProducto].cant += cantidad
            calcularSubtotalProducto(carrito[iUltimoProducto])
            guardarCarrito()
            actualizarTotales()
        }
    }
}

function restarAlCarrito(idProducto){
    const productoRestar = buscarProductoId(idProducto)
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === productoRestar.id && carrito[i].cant > 0){
            carrito[i].cant--
            carrito[i].subtotal -= carrito[i].precio
            if (carrito[i].cant === 0){
                removerDelCarrito(carrito[i].id)
            }
        }
    }
}

function vaciarCarrito(){
    for (let i = 0; i < carrito.length; i++){
        carrito[i].cant = 0
        carrito[i].subtotal = 0
    }
    carrito.splice(0,carrito.length)
    actualizarTotales()
    localStorage.removeItem('carrito')
}

function actualizarCarrito(){
    actualizarTotales()
    carritoHtml.innerHTML = ''
    for (let i = 0; i < carrito.length; i++){
        carritoHtml.innerHTML +=`
        <li class="producto-carrito" id="${carrito[i].id}">
        <img src="media/img-productos/img-producto${carrito[i].id}.jpg" alt="${carrito[i].nombre} ${carrito[i].sexo}, color ${carrito[i].color}">
            <ul class="datos">
                <li class="nombre">${productos[i].nombre} | ${productos[i].color} | ${productos[i].sexo}</li>
                <li class="precio">$${carrito[i].precio}</li>
                <li class="cantidades">cant.: ${carrito[i].cant}</li>
                <li class="subtotal-producto">Subtotal: ${carrito[i].subtotal}</li>
                <li class="eliminar" onclick="removerDelCarrito(${carrito[i].id})"><button class="far fa-trash-alt"></button></li>
            </ul>
        </li>`
    }
    totalesCarrito.innerHTML = `
    <li id="subtotal-carrito">Subtotal: $${subtotal}</li>
    <li id="descuento-carrito"><em>Descuento: -$${descuento}</em></li>
    <li id="total-carrito"><strong>Total: $${total}</strong></li>`
    actualizarProductos()
}

function removerDelCarrito(idProducto){
    const index = carrito.findIndex(producto => producto.id === idProducto)
    if (index >= 0){
        carrito[index].cant = 0
        carrito[index].subtotal = 0
        carrito.splice(index,1)
    }
    guardarCarrito()
    actualizarCarrito()
}

// Funciones para mostrar y actualizar los productos en la página
function agregarALista(lista, elementoAgregar){
    let enLista = false
    for ( let j = 0; j < lista.length; j++){
        if(lista[j] === elementoAgregar){
            enLista = true
        }
    }
    if (!enLista){
        lista.push(elementoAgregar)
    }
}

function mostrarFiltro(lista, nombre){
    for (let i = 0; i < lista.length; i++) {
        $(`#${nombre}`).append(
            `<option value="${lista[i]}">${lista[i]}</option>`
        )
    }
}

function mostrarProductos(){
    $('#catalogo').html('')
    for (let i = 0 ; i < productosFiltrado.length; i++){
        $('#catalogo').append(
            `<li class="producto">
                <img src="media/img-productos/img-producto${productosFiltrado[i].id}.jpg" alt="${productosFiltrado[i].nombre} ${productosFiltrado[i].sexo}, color ${productosFiltrado[i].color}">
                <div class="datos-producto">
                    <h3 class="nombre-producto">${productosFiltrado[i].nombre} | ${productosFiltrado[i].color} | ${productosFiltrado[i].sexo}</h3>
                    <p class="precio-producto">$${productosFiltrado[i].precio}</p>
                    <p id="cant-producto${productosFiltrado[i].id}" class="cant-producto">Cant.: <button class="btn-menos${productosFiltrado[i].id}"><i class="fas fa-minus"></i></button> <span id="cant${productosFiltrado[i].id}">${productosFiltrado[i].cant}</span> <button class="btn-mas${productosFiltrado[i].id}"><i class="fas fa-plus"></i></button></p>
                    <button id="btn${productosFiltrado[i].id}" class="btn-agregar">Agregar al Carrito</button>
                </div>
            </li>`
        )

        $(`#btn${productosFiltrado[i].id}`).on('click', (event) => {
            event.preventDefault()
            agregarAlCarrito(parseInt(`${productosFiltrado[i].id}`))
            actualizarCarrito()
        })

        $(`.btn-mas${productosFiltrado[i].id}`).on('click', (event) => {
            event.preventDefault()
            agregarAlCarrito(parseInt(`${productosFiltrado[i].id}`))
            actualizarCarrito()
        })

        $(`.btn-menos${productosFiltrado[i].id}`).on('click', (event) => {
            event.preventDefault()
            restarAlCarrito(parseInt(`${productosFiltrado[i].id}`))
            actualizarCarrito()
        })
    }
}

function mostrarCatalogo(){
    //let colores = []
    let sexos = []
    for (let i = 0 ; i < productos.length; i++){
        //agregarALista(colores, productos[i].color)
        agregarALista(sexos, productos[i].sexo)
    }
    //mostrarFiltro(colores, 'filtro-color')
    mostrarFiltro(sexos, 'filtro-sexo')
    $(`#filtro-sexo`).change( (event) => {
        event.preventDefault()
        productosFiltrado = productos.filter( producto => {
            if ($(`#filtro-sexo`).val() === ""){
                return producto
            }else{
                return producto.sexo === $(`#filtro-sexo`).val()
            }
        })
        mostrarProductos()
    })
    mostrarProductos()
}

function toggleDisplayCant(cantidad, idProducto){
    if (cantidad === 0){
        $(`#cant-producto${idProducto}`).addClass('deshabilitado')
        $(`#btn${idProducto}`).removeClass('deshabilitado')
    }else{
        $(`#cant-producto${idProducto}`).removeClass('deshabilitado')
        $(`#btn${idProducto}`).addClass('deshabilitado')
    }
}

function actualizarProductos(){
    for (let i = 0 ; i < productos.length; i++){
        let cant = 0
        toggleDisplayCant(productos[i].cant, productos[i].id)
        for (let j = 0 ; j < carrito.length; j++){
            if (productos[i].id === carrito[j].id){
                cant = carrito[j].cant
                toggleDisplayCant(carrito[j].cant, productos[i].id)
            }
        }
        $(`#cant${productos[i].id}`).html(
            `${cant}`
        )
    }
}

// Eventos
vaciar.addEventListener('click',(event) => {
    event.preventDefault()
    vaciarCarrito()
    actualizarCarrito()
})

btnValidarCupon.addEventListener('click',(event) => {
    event.preventDefault()
    const cupon = inputCupon.value
    validarCupon(cupon)
    actualizarCarrito()

    inputCupon.value = ''
})