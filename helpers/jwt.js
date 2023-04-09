// debemos instalar la libreria para pder trabajar con los JWT -> npm i jsonwebtoken
const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => { // esta funcion recibe lo que quiero necesito colocar como payload en mi token

    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        // ahora si generamos el token, hacemos la firma del token
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {

            expiresIn: '2h'

        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el Token')
            }
            // si todo funciona bien resuelvo la promesa con el token

            resolve(token);
        })

        //Parametros de la funcion sign 
        // 1- payload del JWT
        // 2- variable de entorno de llave privada MIA que ayuda a saber si es el token que yo genere o fue modificado 
        // 3- El tiempo para que el token expire
        // 4- El error que mostrara en caso de que no se pueda frmar ese token por alguna razon
    })

}

module.exports = {
    generarJWT
}


