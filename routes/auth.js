/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const {createUser, loginUser, renewToken} = require('../controllers/auth');    // Importamos la funcion createUser del archivo auth.js
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');

router.post('/new', [
    // Middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    validarCampos
],createUser);

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    validarCampos
],loginUser);

router.get('/renew',validarJWT ,renewToken);

module.exports = router;