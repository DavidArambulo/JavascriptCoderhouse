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

            $('body').fadeIn()
        }
    })
})



// Inicializacion de variables, constantes y listas necesarias
let carrito = JSON.parse(localStorage.getItem('carrito'))

if (!carrito){
    carrito = []
}

let cantTotalProductos = 0
let subtotal = 0
let descuento = 0
let envio = 0
let total = 0
let cuponDescuentoAplicado = false
let esCABA = false
const montoEnvioGratis = 5000

function actualizarTotales(){
    subtotal = CalcYVal.calcularSubtotal(carrito)
    if (cuponDescuentoAplicado){
        descuento = CalcYVal.calcularDescuento(subtotal)
    }
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
                    <li class="cantidades">x${carrito[i].cant}</li>
                    <li class="subtotal-producto">Subtotal: ${carrito[i].subtotal}</li>
                    <li class="eliminar"><button class="button" id="eliminar${carrito[i].id}"><i class="far fa-trash-alt"></i></button></li>
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
    // COMPRUEBO SI HAY SE MOSTRARON PRODUCTOS Y DE NO SER ASI MUESTRO POR PANTALLA
    if (!hayProductos){
        $('#carrito').append('<li><p class="no-items">Todavía tu carrito esta vacío :(</p></li>')
    }

    // ACTUALIZACIÓN DEL DETALLE DEL CARRITO
    $('#subtotal').html(`${subtotal}`)
    $('#descuento').html(`${descuento}`)
    $('#envio').html(`${envio}`)
    $('#total').html(`${total}`)

    // ACTUALIZACIÓN DEL MARCADOR DE CANTIDAD DE PRODUCTOS
    cantTotalProductos = Carrito.contarProductos(carrito)
    $('#cant-total-productos').html(`${cantTotalProductos}`)
    if (cantTotalProductos > 0){
        $('.burbuja-cant').css("display","flex")
    }else{
        $('.burbuja-cant').css("display","none")
    }
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
                <img id="img-producto${productosFiltrado[i].id}" src="media/img-productos/img-producto${productosFiltrado[i].id}.jpg" alt="${productosFiltrado[i].nombre} ${productosFiltrado[i].sexo}, color ${productosFiltrado[i].color}">
                <div class="datos-producto">
                    <h3 class="nombre-producto">${productosFiltrado[i].nombre} | ${productosFiltrado[i].color} | ${productosFiltrado[i].sexo}</h3>
                    <p class="precio-producto">$${productosFiltrado[i].precio}</p>
                    <p id="cant-producto${productosFiltrado[i].id}" class="cant-producto">Cant.: <button class="btn-menos btn-menos${productosFiltrado[i].id} button"><i class="fas fa-minus"></i></button> <span class="cant-num" id="cant${productosFiltrado[i].id}">${productosFiltrado[i].cant}</span> <button class="btn-mas btn-mas${productosFiltrado[i].id} button"><i class="fas fa-plus"></i></button></p>
                    <button id="btn${productosFiltrado[i].id}" class="btn-agregar button button-principal">Agregar al Carrito</button>
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

        // VISTA PREVIA IMAGEN
        $(`#img-producto${productosFiltrado[i].id}`).on('click', () => {
            $('#modal-img-producto').fadeIn(() =>{
                $('#modal-img-producto').css("display","flex")
                $('#modal-img-producto').html(`<img class="modal-img" src="media/img-productos/img-producto${productosFiltrado[i].id}.jpg" alt="${productosFiltrado[i].nombre} ${productosFiltrado[i].sexo}, color ${productosFiltrado[i].color}">`)
                $('.modal-img').on('click', () => {
                    $('#modal-img-producto').html('')
                    $('#modal-img-producto').fadeOut()
                })
            })
        })
    }
    if(!hayProductos){
        $('#catalogo').append('<li><p class="no-items">Lo sentimos no hay productos con esas especificaciones</p></li>')
    }
}

// EVENTOS
// Eventos del carrito de compras
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

$('.abrir-carrito, .cerrar-carrito, .burbuja-cant').on('click', () => {
    $('#modal-carrito').slideToggle()
})

// Eventos de la barra de navegación
$('#open-nav').on('click', (event) => {
    event.preventDefault()
    $('#menu').addClass('activo')
})
$('#close-nav').on('click', (event) => {
    event.preventDefault()
    $('#menu').removeClass('activo')
})

$('#nav-link-nosotros').on('click', (event) => {
    event.preventDefault()
    $('html, body').animate({
        scrollTop: $('#nosotros').offset().top - 90 // -90 para subir un poco la vista y no lo tape la barra de navegación
    }, 500);
    $('#close-nav').trigger('click')
})

$('#nav-link-retiro').on('click', (event) => {
    event.preventDefault()
    $('html, body').animate({
        scrollTop: $('#retiro').offset().top - 90
    }, 500);
    $('#close-nav').trigger('click')
})

$('#nav-link-productos').on('click', (event) => {
    event.preventDefault()
    $('html, body').animate({
        scrollTop: $('#productos').offset().top - 90
    }, 500);
    $('#close-nav').trigger('click')
})

// Eventos de los filtros
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
