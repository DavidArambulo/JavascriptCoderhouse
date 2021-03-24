const user = {
    userName: 'David',
    password: '1234',
    role: 'admin'
}

let inputUserName = prompt('Ingrese su nombre de usuario')
let inputPassword = prompt('Ingrese su clave')

if (inputUserName === user.userName && inputPassword === user.password){
    console.log('OK')
    if (user.role === 'admin'){
        console.log('Hola admin')
    } else if (user.role === 'user'){
        console.log('Hola usuario')
    } else{
        console.log('Hola invitado')
    }

} else{
    console.error('NOT OK')
}