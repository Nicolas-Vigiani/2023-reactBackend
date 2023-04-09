// un middlewares es simplemente una funcion que se encarga de hacer una tarea especifica y evita tener 
//codigo duplicado. Tiene la particularidad que ademas de la req, res , tiene un next, el cual es una func
//que debe llamarse si todo el middleware se ejecuta correctamente. El next ejecuta una validacion
// y pasa a la siguiente validacion, es decir: 
/* check('name', 'El nombre es obligatorio').not().isEmpty(), //primero hara esta, si pasa va a la de abajo
check('email', 'El email es obligatorio').isEmail(),//esta hara deespues, y asi 
check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 })
 */
const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

module.exports = {
    validarCampos
}