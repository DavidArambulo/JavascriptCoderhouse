/*
    Idea: para un e-commerce hacer un carrito de compras
    que despues pida cupones de descuento
*/

// Declaro las constantes de los precios de los productos
const precioCampera = 4000
const precioRemera = 2000
const precioJean = 3500
const precioBermuda = 3000
const precioGorra = 2000

// Inicializo el costo total del carrito de compras en 0
let costoCarrito = 0

// Función que me permite pedir un producto o comando mediante prompt
function pedirDato() {
    let dato = prompt(
        'Este es nuestro catalogo de productos: 0.- FIN; 1.- Camperas -> $' + precioCampera + '; 2.- Remeras -> $' + precioRemera + '; 3.- Jeans -> $' + precioJean + '; 4.- Bermudas -> $' + precioBermuda + '; 5.- Gorras -> $' + precioGorra + '; 6.- VACIAR CARRITO; Ingrese el codigo del producto:'
    )
    dato = parseInt(dato)
    return dato
}

// Función que me permite validar si el codigo del producto o comando existe y en caso de que no exista pedir uno nuevo
function validarDato(dato) {
    while (dato < 0 || dato > 6){
        alert('El numero ingresado no corresponde a ningún producto del catalogo')
        dato = pedirDato()
    }
    return dato
}

// Función para sumar al carrito de compras el precio de un producto y en caso de ser necesario vaciarlo
function sumarAlCarrito(producto) {

    switch (producto) {
        case 1:
            costoCarrito += precioCampera
            break;
        case 2:
            costoCarrito += precioRemera
            break;
        case 3:
            costoCarrito += precioJean
            break;
        case 4:
            costoCarrito += precioBermuda
            break;
        case 5:
            costoCarrito += precioGorra
            break;
        case 6:
            costoCarrito = 0
            break;
    }

}

// INICIO
alert('¡BIENVENIDO!')

// Pido el código de un producto (o comando) y lo valido
let inputProducto = pedirDato()
inputProducto = validarDato(inputProducto)

// Agrego al carrito de compras (o lo vacío), pido un nuevo dato y lo valido
while (inputProducto !== 0) {
    sumarAlCarrito(inputProducto)
    //console.log(costoCarrito) // Esta linea sirve para viualizar como va aumentando el costo del carrito
    inputProducto = pedirDato()
    inputProducto = validarDato(inputProducto)
}

// Pido un cupon de descuento y valido que exista
let cuponDescuento = prompt ('Ingrese su cupón de descuento:')
cuponDescuento = cuponDescuento.toUpperCase()

if (cuponDescuento === 'D3SAFIO10%'){
    costoCarrito = costoCarrito - costoCarrito * 0.1
} else {
    alert ('El cupón ingresado no es válido')
}

// Muestro el todal del carrito de compras
alert ('Su carrito de cuesta $' + costoCarrito)

//FIN