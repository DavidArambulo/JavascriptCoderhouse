// Creacion de la clase Producto
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

// Funciones relacionadas al array de productos
export function crearProducto(productos, nombre, color, sexo, precio, id){
    const nuevoProducto = new Producto(nombre, color, sexo, precio, id)
    productos.push(nuevoProducto)
}

export function buscarProductoId(productos, id){
    const productoABuscar = productos.find( producto => producto.id === id)

    if (!productoABuscar){
        throw new Error (`No existe el producto de ${id}`)
    }

    return productoABuscar
}