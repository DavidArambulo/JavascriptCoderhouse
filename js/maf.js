// Funciones para mostrar, actualizar y filtrar (MAF por sus siglas) los productos en la pagina
export function agregarALista(lista, elementoAgregar){
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

export function mostrarFiltro(lista, nombre){
    $(`#${nombre}`).html('<option value="">Todos</option>')
    for (let i = 0; i < lista.length; i++) {
        $(`#${nombre}`).append(
            `<option value="${lista[i]}">${lista[i]}</option>`
        )
    }
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

export function actualizarProductos(productos, carrito){
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