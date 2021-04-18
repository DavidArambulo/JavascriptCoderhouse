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
    consultaStock(numero){
        if (this.stock < numero) {
            alert(`No hay stock suficiente de ${this.nombre}`);
            throw new Error(`No hay stock suficiente de ${this.nombre}`);
        }
    }
    /* No creo que sean necesarias, el dato de stock deberia venir directamente de una base de datos
    actualizarStock(unidades){
        this.stock = unidades;
    }
    eliminarStock(unidades){
        this.stock -= unidades
    }*/
}

class Carrito {
    constructor(){
        this.productos  = [];
        this.costo      = 0;
    }
    agregarProducto(producto){
        let productoAgregado = false;
        for (let i = 0; i < this.productos.length; i++) {
            if (producto.nombre === this.productos[i][0].nombre) {
                this.productos[i][1]++;
                productoAgregado = true;
            }
        }
        if (!productoAgregado) {
            this.productos.push([producto, 1]);
        }
    }
    limpiarCarrito(){
        this.productos.splice(0,this.productos.length);
    }
    calcularCosto(descuento = false){
        this.costo = 0;
        for (let i = 0; i < this.productos.length; i++) {
            this.costo += this.productos[i][0].precio * this.productos[i][1];
        }
        if (descuento){
            this.costo -= this.costo * 0.1;
        }
    }
}

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

// Función para sumar al carrito de compras el precio de un producto y en caso de ser necesario vaciarlo
function sumarAlCarrito(carrito, producto) {

    switch (producto) {
        case 1:
            carrito.agregarProducto(campera);
            break;
        case 2:
            carrito.agregarProducto(remera);
            break;
        case 3:
            carrito.agregarProducto(jean);
            break;
        case 4:
            carrito.agregarProducto(bermuda);
            break;
        case 5:
            carrito.agregarProducto(gorra);
            break;
        case 6:
            carrito.limpiarCarrito();
            break;
    }

}

const campera = new Producto('Campera', '4000', '10');
const remera = new Producto('Remera', '2000', '25');
const jean = new Producto('Jean', '3500', '15');
const bermuda = new Producto('Bermuda', '3000', '10');
const gorra = new Producto('Gorra', '2000', '5');

// INICIO
alert('¡BIENVENIDO!')

// Pido el código de un producto (o comando) y lo valido
let inputProducto = pedirDato()
inputProducto = validarDato(inputProducto)

// Creo el carrito de compras
if (inputProducto !== 0) {
    let carrito = new Carrito();
    // Agrego al carrito de compras (o lo vacío), pido un nuevo dato y lo valido
    while (inputProducto !== 0) {
        sumarAlCarrito(carrito, inputProducto);
        //carrito.calcularCosto()
        //console.log(carrito.costo) // Esta linea sirve para viualizar como va aumentando el costo del carrito
        console.log(carrito.productos)
        inputProducto = pedirDato()
        inputProducto = validarDato(inputProducto)
    }

    for (let i = 0; i < carrito.productos.length; i++) {
        carrito.productos[i][0].consultaStock(carrito.productos[i][1])
    }

    // Pido un cupon de descuento y valido que exista
    let cuponDescuento = prompt ('Ingrese su cupón de descuento:')
    cuponDescuento = cuponDescuento.toUpperCase()

    if (cuponDescuento === 'D3SAFIO10%'){
        carrito.calcularCosto(true)
    } else {
        alert ('El cupón ingresado no es válido')
        carrito.calcularCosto()
    }

    // Muestro el todal del carrito de compras
    alert (`Su carrito de cuesta $${carrito.costo}`)
}

//FIN
