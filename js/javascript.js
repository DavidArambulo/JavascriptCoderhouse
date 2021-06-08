import * as CalcYVal from './calculosYValidaciones.js'
import * as Productos from './productos.js'
import * as Carrito from './carrito.js'

// Lista de productos
let productos = []
let productosFiltrado = []

// Obtencion de los productos de la base de datos
const URL = './database/db-productos.json'

$( document ).ready(() => {
    $.ajax({
        method: "GET",
        url: `${URL}`,
        success: (response) => {
            for ( let i = 0; i < response.length; i++){
                Productos.crearProducto(productos, response[i].nombre, response[i].color, response[i].sexo, response[i].precio, response[i].id)
            }
            productosFiltrado = productos
            mostrarCatalogo()
            actualizarTotales()
            actualizarCarrito()
            actualizarProductos()
        }
    })
})



// Inicializacion de variables, constantes y listas necesarias
let carrito = JSON.parse(localStorage.getItem('carrito'))

if (!carrito){
    carrito = []
}

let subtotal = 0
let descuento = 0
let envio = 0
let total = 0
let cuponDescuentoAplicado = false
let esCABA = false
const montoEnvioGratis = 5000

function actualizarTotales(){
    subtotal = CalcYVal.calcularSubtotal(carrito)
    envio = CalcYVal.validarEnvioGratis(subtotal, montoEnvioGratis, esCABA)
    total = CalcYVal.calcularTotal(descuento, subtotal, envio)
}

// Constantes de escucha de elementos del html
const vaciar = document.getElementById('vaciar')
const inputCupon = document.getElementById('input-cupon')
const btnValidarCupon = document.getElementById('btn-validar-cupon')

// Funciones para mostrar y guardar el carrito de compras
function guardarCarrito(){
    localStorage.setItem('carrito',JSON.stringify(carrito))
}

function actualizarCarrito(){
    $('#carrito').html('')
    for (let i = 0; i < carrito.length; i++){
        $('#carrito').append(
            `<li class="producto-carrito" id="${carrito[i].id}">
            <img src="media/img-productos/img-producto${carrito[i].id}.jpg" alt="${carrito[i].nombre} ${carrito[i].sexo}, color ${carrito[i].color}">
                <ul class="datos">
                    <li class="nombre">${productos[i].nombre} | ${productos[i].color} | ${productos[i].sexo}</li>
                    <li class="precio">$${carrito[i].precio}</li>
                    <li class="cantidades">cant.: ${carrito[i].cant}</li>
                    <li class="subtotal-producto">Subtotal: ${carrito[i].subtotal}</li>
                    <li class="eliminar"><button class="far fa-trash-alt" id="eliminar${carrito[i].id}"></button></li>
                </ul>
            </li>`
        )

        $(`#eliminar${carrito[i].id}`).on('click', (event) => {
            event.preventDefault()
            Carrito.removerDelCarrito(carrito[i].id, carrito)
            guardarCarrito()
            actualizarTotales()
            actualizarCarrito()
            actualizarProductos()
        })
    }
    $('#subtotal').html(`${subtotal}`)
    $('#descuento').html(`${descuento}`)
    $('#envio').html(`${envio}`)
    $('#total').html(`${total}`)
}

// Funciones para mostrar, filtrar y actualizar los productos en la pagina
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
            Carrito.agregarAlCarrito(productos, parseInt(`${productosFiltrado[i].id}`), carrito)
            guardarCarrito()
            actualizarTotales()
            actualizarCarrito()
            actualizarProductos()
        })

        $(`.btn-mas${productosFiltrado[i].id}`).on('click', (event) => {
            event.preventDefault()
            Carrito.agregarAlCarrito(productos, parseInt(`${productosFiltrado[i].id}`), carrito)
            guardarCarrito()
            actualizarTotales()
            actualizarCarrito()
            actualizarProductos()
        })

        $(`.btn-menos${productosFiltrado[i].id}`).on('click', (event) => {
            event.preventDefault()
            Carrito.restarAlCarrito(productos, parseInt(`${productosFiltrado[i].id}`), carrito)
            guardarCarrito()
            actualizarTotales()
            actualizarCarrito()
            actualizarProductos()
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
    Carrito.vaciarCarrito(carrito)
    actualizarTotales()
    actualizarCarrito()
    actualizarProductos()
})

btnValidarCupon.addEventListener('click',(event) => {
    event.preventDefault()
    const cupon = inputCupon.value
    cuponDescuentoAplicado = CalcYVal.validarCupon(cupon, cuponDescuentoAplicado)
    if(cuponDescuentoAplicado){
        descuento = CalcYVal.calcularDescuento(subtotal)
    }
    actualizarTotales()
    actualizarCarrito()
    inputCupon.value = ''
})

$('.abrir-carrito, .cerrar-carrito').on('click', () => {
    $('#modal-carrito').slideToggle()
})
// $('header').scroll(() => {
//     $('header').slideUp()
// })

$('.tipo-envio').on('change', () => {
    const value = $('.tipo-envio:checked').val()
    if(value === 'interior'){
        esCABA = false
    }else{
        esCABA = true
    }
    actualizarTotales()
    actualizarCarrito()
})
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
    actualizarProductos()
})
