//Pido Nombre
let nombre = prompt('Ingrese su nombre')

//Saludo
alert('Bienvenido ' + nombre)

//Pido Apellido
let apellido = prompt('Ingrese su apellido')

//Pido año de nacimiento y año actual
let anioNacimiento = prompt('Ingrese su año de nacimiento')
anioNacimiento = parseInt(anioNacimiento)

let anioActual = prompt('Ingrese el año actual')
anioActual = parseInt(anioActual)

//Calculo la edad a cumplir
let edad = anioActual - anioNacimiento

//Muestro el resultado
alert(nombre + ' ' + apellido + ' este año cumpliras ' + edad + ' años')

