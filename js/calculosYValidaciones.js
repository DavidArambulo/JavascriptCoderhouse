// Funciones para realizar calculos de totales, descuentos y validaciones
export function calcularSubtotalProducto(producto){
    producto.subtotal = producto.cant * producto.precio
}

export function calcularSubtotal(carrito){
    let sub = 0
    for (let i = 0; i < carrito.length; i++){
        sub += carrito[i].subtotal
    }
    return sub
}

export function calcularDescuento(subtotal){
    return subtotal * 0.1
}

export function validarCupon(cupon, cuponAplicado){
    if (cupon.toUpperCase() === 'D3SAFIO10%' && !cuponAplicado){
        cuponAplicado = true
    } else {
        alert ('No se puede aplicar el cupón ingresado')
    }
    return cuponAplicado
}

export function validarEnvioGratis(subtotal, montoGratis, CABA){
    let envio = 0
    if(subtotal >= montoGratis || CABA){
        envio = 0
    }
    else{
        envio = 500
    }
    return envio
}

export function calcularTotal(descuento, subtotal, envio){
    let total = 0
    total = subtotal - descuento + envio
    return total
}
