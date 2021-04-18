// Establesco el mes y el año como los actuales
const year = new Date().getFullYear();
const month = new Date().getMonth(); // numero del 0 al 11 siendo el 0 Enero

// Pido un día para calcular los descuentos
let day = prompt('Ingrese el día de la semana a calcular');
day = parseInt(day)

// Inicializo a 0 los descuentos
let discount = 0;

// Creo una constante que sea la fecha a calcular y extraigo el día de la semana
const discountDate = new Date(year, month, day);
let weekday = discountDate.getDay(); // numero del 0 al 6 siendo el 0 el Domingo

// Compruebo si es miercoles para aplicar 50% de descuento o si es viernes o sabado aplicar 30% de descuento
if (weekday === 3){
    discount += 50;
} else if (weekday === 5 || weekday === 6){
    discount += 30;
}

// En caso de que sea Julio o Diciembre se aplican 10% de descuento extra
if (month === 6 || month === 11){
    discount += 10;
}

// Le comunico al usuario si tiene descuento y su valor o si no tiene
if (discount > 0){
    alert('El ' + day + '/' + (month+1) + ' tienes ' + discount + '%!!');
} else{
    alert('El ' + day + '/' + (month+1) + ' no tienes descuento :(');
}
