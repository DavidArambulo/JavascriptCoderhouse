import {buscarProductoId} from './productos.js'

// Funciones para la manipulación del carrito de compras
export function agregarAlCarrito(productos, idProducto, carrito){
    const productoAgregar = buscarProductoId(productos, idProducto)
    let enCarrito = false
    
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === productoAgregar.id){
            carrito[i].cant++
            carrito[i].subtotal += carrito[i].precio
            enCarrito = true
        }
    }
    if (!enCarrito){
        carrito.push(productoAgregar)
        const iUltimoProducto = carrito.length-1
        carrito[iUltimoProducto].cant++
        carrito[iUltimoProducto].subtotal += carrito[iUltimoProducto].precio
    }
}

export function restarAlCarrito(productos, idProducto, carrito){
    const productoRestar = buscarProductoId(productos, idProducto)
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === productoRestar.id && carrito[i].cant > 0){
            carrito[i].cant--
            carrito[i].subtotal -= carrito[i].precio
            if (carrito[i].cant === 0){
                removerDelCarrito(carrito[i].id, carrito)
            }
        }
    }
}

export function vaciarCarrito(carrito){
    for (let i = 0; i < carrito.length; i++){
        carrito[i].cant = 0
        carrito[i].subtotal = 0
    }
    carrito.splice(0,carrito.length)
    localStorage.removeItem('carrito')
}

export function removerDelCarrito(idProducto, carrito){
    const index = carrito.findIndex(producto => producto.id === idProducto)
    if (index >= 0){
        carrito[index].cant = 0
        carrito[index].subtotal = 0
        carrito.splice(index,1)
    }
    
}

export function contarProductos(carrito){
    let cant = 0
    for (let i = 0; i < carrito.length; i++){
        cant += carrito[i].cant
    }
    return cant
}