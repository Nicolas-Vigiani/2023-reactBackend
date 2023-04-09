/* 
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express'); // se importa un router
const { check } = require('express-validator'); //el check es un midleware que se va encargar de validar un campo en particular, uno a la vez
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt')

router.post(
    '/new',
    [//middlewares para las validaciones
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);

router.post('/',
    [ // middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', validarJwt, revalidarToken); // aca como es middleware de validarJWT es solo uno podemos dejarlo asi, pero si las validaciones son mas debemos hacer un arreglo como arriba con los check


module.exports = router;


