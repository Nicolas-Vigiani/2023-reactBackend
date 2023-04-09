const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJwt = (req, res = response, next) => { // si es correcto llama al next

    //el token estara en el x-token en los headers (ver postman)
    const token = req.header('x-token');
    //console.log(token);

    if (!token) { //si el token no viene significa que no esta autenticado el usuario
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la validacion'
        })
    }

    try { // verificacion del token propiamente dicha

        const payload = jwt.verify( //verifica entre otras cosa que no haya pasado esas 2 horas que dura el token 
            token,
            process.env.SECRET_JWT_SEED
        );
        //console.log(payload);
        req.uid = payload.uid; //  a este 
        req.name = payload.name;// y este lo puedo desetrcturar arriba en el el payload

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        })

    }

    next();
}

module.exports = {
    validarJwt
}
