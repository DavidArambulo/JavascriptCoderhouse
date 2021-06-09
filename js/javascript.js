import * as CalcYVal from './calculosYValidaciones.js'
import * as Productos from './productos.js'
import * as Carrito from './carrito.js'
import * as Maf from './maf.js'

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

            let colores = []
            let sexos = []

            for (let i = 0 ; i < productosFiltrado.length; i++){
                Maf.agregarALista(colores, productosFiltrado[i].color)
                Maf.agregarALista(sexos, productosFiltrado[i].sexo)
            }

            Maf.mostrarFiltro(colores, 'filtro-color')
            Maf.mostrarFiltro(sexos, 'filtro-sexo')
            mostrarProductos()

            actualizarTotales()
            actualizarCarrito()
            Maf.actualizarProductos(productos, carrito)
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

// FUNCIONES PARA GUARDAR Y ACTUALIZAR EL CARRITO DE COMPRAS
function guardarCarrito(){
    localStorage.setItem('carrito',JSON.stringify(carrito))
}

function actualizarCarrito(){
    $('#carrito').html('')
    let hayProductos = false
    for (let i = 0; i < carrito.length; i++){
        hayProductos = true
        // CREACIÓN DE UN PRODUCTO EN EL CARRITO DE COMPRAS
        $('#carrito').append(
            `<li class="producto-carrito" id="${carrito[i].id}">
            <img src="media/img-productos/img-producto${carrito[i].id}.jpg" alt="${carrito[i].nombre} ${carrito[i].sexo}, color ${carrito[i].color}">
                <ul class="datos">
                    <li class="nombre">${carrito[i].nombre} | ${carrito[i].color} | ${carrito[i].sexo}</li>
                    <li class="precio">$${carrito[i].precio}</li>
                    <li class="cantidades">cant.: ${carrito[i].cant}</li>
                    <li class="subtotal-producto">Subtotal: ${carrito[i].subtotal}</li>
                    <li class="eliminar"><button class="far fa-trash-alt" id="eliminar${carrito[i].id}"></button></li>
                </ul>
            </li>`
        )

        // EVENTOS DE LOS PRODUCTOS EN EL CARRITO DE COMPRAS
        $(`#eliminar${carrito[i].id}`).on('click', (event) => {
            event.preventDefault()
            Carrito.removerDelCarrito(carrito[i].id, carrito)
            guardarCarrito()
            actualizarTotales()
            actualizarCarrito()
            Maf.actualizarProductos(productos, carrito)
        })
    }
    
    if (!hayProductos){
        $('#carrito').append('<li><p class="no-items">Todavía tu carrito esta vacío :(</p></li>')
    }

    // ACTUALIZACIÓN DEL DETALLE DEL CARRITO
    $('#subtotal').html(`${subtotal}`)
    $('#descuento').html(`${descuento}`)
    $('#envio').html(`${envio}`)
    $('#total').html(`${total}`)
}


// FUNCIÓN PARA MOSTRAR LOS PRODUCTOS EN LA PÁGINA
function mostrarProductos(){
    let hayProductos = false
    $('#catalogo').html('')
    for (let i = 0 ; i < productosFiltrado.length; i++){
        hayProductos = true
        // CREACIÓN DE UN PRODUCTO
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

        // EVENTOS DE LOS BOTONES DE PRODUCTOS
        $(`#btn${productosFiltrado[i].id}`).on('click', (event) => {
            event.preventDefault()
            Carrito.agregarAlCarrito(productos, parseInt(`${productosFiltrado[i].id}`), carrito)
            guardarCarrito()
            actualizarTotales()
            actualizarCarrito()
            Maf.actualizarProductos(productos, carrito)
        })

        $(`.btn-mas${productosFiltrado[i].id}`).on('click', (event) => {
            event.preventDefault()
            Carrito.agregarAlCarrito(productos, parseInt(`${productosFiltrado[i].id}`), carrito)
            guardarCarrito()
            actualizarTotales()
            actualizarCarrito()
            Maf.actualizarProductos(productos, carrito)
        })

        $(`.btn-menos${productosFiltrado[i].id}`).on('click', (event) => {
            event.preventDefault()
            Carrito.restarAlCarrito(productos, parseInt(`${productosFiltrado[i].id}`), carrito)
            guardarCarrito()
            actualizarTotales()
            actualizarCarrito()
            Maf.actualizarProductos(productos, carrito)
        })
    }
    if(!hayProductos){
        $('#catalogo').append('<li><p class="no-items">Lo sentimos no hay productos con esas especificaciones</p></li>')
    }
}

// EVENTOS
vaciar.addEventListener('click',(event) => {
    event.preventDefault()
    Carrito.vaciarCarrito(carrito)
    actualizarTotales()
    actualizarCarrito()
    Maf.actualizarProductos(productos, carrito)
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

$(`#filtro-color`).change( (event) => {
    event.preventDefault()
    productosFiltrado = Productos.filtrarProductos(productos)
    mostrarProductos()
    Maf.actualizarProductos(productos, carrito)
})

$(`#filtro-sexo`).change( (event) => {
    event.preventDefault()
    productosFiltrado = Productos.filtrarProductos(productos)
    mostrarProductos()
    Maf.actualizarProductos(productos, carrito)
})
