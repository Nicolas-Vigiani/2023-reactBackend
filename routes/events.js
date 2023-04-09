const { Router } = require('express');
const { check } = require('express-validator');
const { validarJwt } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

//! CRUD de los eventos
//!------------------------------------------------------
//TODO Todas las peticiones deben pasar por la validacion del token , para hacer esto se puede hacer uso del router.use
router.use(validarJwt); // al hacer esto digo que todas las rutas haran uso de este middleware

//Obtener eventos 

router.get('/', getEventos);

//Crear un nuevo evento 
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate), // el custom se emplea cuando el tipo de validacion que quiero hacer no esta definido por defecto en el check (como si lo esta isEmpty) es por ello que se manda una funcion (en los helpers) que se encargue de validar lo que yo necesito
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);

//Actualizar evento 
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate), // el custom se emplea cuando el tipo de validacion que quiero hacer no esta definido por defecto en el check (como si lo esta isEmpty) es por ello que se manda una funcion (en los helpers) que se encargue de validar lo que yo necesito
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    actualizarEvento
);

//Borrar evento 
router.delete('/:id', eliminarEvento);

module.exports = router;


