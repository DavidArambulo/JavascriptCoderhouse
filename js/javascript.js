// Creacion de la clase Producto y de una lista útil para la utilización de estos
class Producto {
    constructor (nombre, precio, id){
        this.nombre = nombre.toLowerCase()
        this.precio = parseFloat(precio)
        this.id     = parseInt(id)
        this.stock  = true
        this.cant   = 0
        this.subtotal = 0
    }
}

let productos = []

// Funciones relacionadas al array de productos
function crearProducto(nombre, precio, id){
    const nuevoProducto = new Producto(nombre, precio, id)
    productos.push(nuevoProducto)
}

function buscarProductoId(id){
    const productoABuscar = productos.find( producto => producto.id === id)

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
crearProducto('Bufanda', '2000', '6')
mostrarProductos()

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

// Se utiliza la notacion [elemento][id] 
// donde: 
// "elemento" esta relacionado a un producto;
// y "id" es el id del producto
// Ej: "cant0" es la cantidad de productos de id === 0

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
            productoAgregar.cant += cantidad
            carrito.push(productoAgregar)
            const iUltimoProducto = carrito.length-1
            calcularSubtotalProducto(carrito[iUltimoProducto])
            guardarCarrito()
            actualizarTotales()
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
        <img src="http://via.placeholder.com/100?text=${carrito[i].nombre}" alt="imagen de ${carrito[i].nombre}">
            <ul class="datos">
                <li class="nombre">${carrito[i].nombre}</li>
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
    //actualizarProductos()
}

function removerDelCarrito(idProducto){
    const index = carrito.findIndex(producto => producto.id === idProducto)
    if (index >= 0){
        carrito.splice(index,1)
    }
    guardarCarrito()
    actualizarCarrito()
}

// Esta función permite no tener que crear los elementos del html a mano para cada producto
function mostrarProductos(){
    for (let i = 0 ; i < productos.length; i++){
        
        $('#catalogo').append(
            `<li class="producto">
                <img src="http://via.placeholder.com/300?text=${productos[i].nombre}" alt="imagen del producto ${productos[i].nombre}">
                <div class="datos-producto">
                    <h3 class="nombre-producto">${productos[i].nombre}</h3>
                    <p class="precio-producto">$${productos[i].precio}</p>
                    <!--<p class="cant${productos[i].id}">Cant.: ${productos[i].cant}</p>-->
                    <label for="cant${productos[i].id}">Cant.</label>
                    <input id="cant${productos[i].id}" type="number" value="0" min="0" autocomplete="off">
                    <button id="btn${productos[i].id}">Agregar al Carrito</button>
                </div>
            </li>`
        )

        $(`#btn${productos[i].id}`).on('click', (event) => {
            event.preventDefault()
            agregarAlCarrito(parseInt(`${productos[i].id}`),parseInt($(`#cant${productos[i].id}`).val()))
            actualizarCarrito()
        })
    }
}

actualizarTotales()
actualizarCarrito()

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
/*
EN DESARROLLO
function actualizarProductos(){
    for (let i = 0 ; i < productos.length; i++){
        let cant = 0
        for (let j = 0 ; j < carrito.length; j++){
            if (productos[i].id === carrito[j].id){
                cant = carrito[j].cant
            }
        }
        $(`.cant${productos[i].id}`).html(
            `Cant.: ${cant}`
        )
    }
}
*/
