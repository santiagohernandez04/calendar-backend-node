/*
    Rutas de Eventos / Events
    /api/events
*/

const {Router} = require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const {createEvent, deleteEvent, getEvents, updateEvent} = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
// Todas las rutas de eventos pasan por la validacion de JWT
// Obtener eventos

const router = Router(); 

// Todas las rutas pasan por la validacion del JWT
router.use(validarJWT);

// Crear un nuevo evento
router.post('/' ,
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    createEvent);

// Actualizar evento
router.put('/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ] ,updateEvent);

// Borrar evento
router.delete('/:id', deleteEvent);


// getEventos
router.get('/', getEvents);


module.exports = router;