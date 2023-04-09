//para hacer validaciones mas rapidas del lado del backend con express existe el paquete express-validator
//el cual debemos instalar mediandte npm i express-validator
//para ocultar las contraseñas instalamos npm i bcryptjs asi en mongo db no se vea el password 

const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => { // la res = response es para que aparezca el intellisence del res.json y codear mas rapido

    const { email, password } = (req.body);//con este parametro se extrae la informacion de la solicitud del post

    try {

        let usuario = await Usuario.findOne({ email }); // busca un usuario que tenga dicho mail, regresa null si el mail NO esta registrado en la BBDD
        //console.log(usuario);
        if (usuario) { // como usuario aqui sera distinto de null (cuando el correo ya este registrado)  y esta condicion evalua si existe un usuario
            return res.status(400).json({ // entonces mostrará este mensaje
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        usuario = new Usuario(req.body); // aqui en el req.body le mando los paramentros que tiene ese body adentro es decir name, email, password. mongoose interpreta que vienen esos parametro
        
        //!Encriptar contraseña usando bcrypt
        const salt = bcrypt.genSaltSync(); // codifica por defecto 10 vueltas de encriptacion
        usuario.password = bcrypt.hashSync(password, salt);// 1) parametro lo que quiero encriptar, 2) el metodo de encriptacion salt


        console.log(usuario);
        await usuario.save(); // graba en la base de datos, esto es una promesa
        console.log(usuario);
        //! GENERAR TOKEN con JWT 
        // como es un procedimiento repetitivo y que tendre que hacer mas de una vez voy a crear un helper
        const token = await generarJWT(usuario.id, usuario.name);


        res.status(200).json({
            ok: 'true',
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Administrador1'
        })
    }
}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email }); // aca es una constante porque no la voy a renombrar o cambiar el dato en su interior

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese correo' // lo mejor es dejar un mensaje mas generico, es decir usuario inexistente
            })
        }

        //---------------------------------------------------------//
        //!Confirmar los password, es decir comparar si son los mismos pero como esta encriptado...debemos 
        //desencriptar para comaprar
        const validPassword = bcrypt.compareSync(password, usuario.password); // el password que mando en el postman contra el password encriptado de la BD
        // lo de arriba retorna un true si es valido y false si no lo es 

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        //si todo sale bien podemos Generar nuestro JWT 
        //! GENERAR TOKEN con JWT 
        // como es un procedimiento repetitivo y que tendre que hacer mas de una vez voy a crear un helper
        const token = await generarJWT(usuario.id, usuario.name);


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el Administrador'
        })
    }


}

const revalidarToken = async(req, res = response) => {
  
    /* const uid = req.uid;
    const name = req.name; */
    const {uid, name} = req;

    //Generar JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    })
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}