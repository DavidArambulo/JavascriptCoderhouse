//Pido Nombre
let nombre = prompt('Ingrese su nombre')

//Saludo
alert('Bienvenido ' + nombre)

//Pido Apellido
let apellido = prompt('Ingrese su apellido')

//Pido año de nacimiento y año actual
let anioNacimiento = prompt('Ingrese su año de nacimiento')
anioNacimiento = parseInt(anioNacimiento)

const currentYear = new Date().getFullYear()

//Calculo la edad a cumplir
let edad = currentYear - anioNacimiento

//Muestro el resultado
alert(nombre + ' ' + apellido + ' este año cumpliras ' + edad + ' años')

