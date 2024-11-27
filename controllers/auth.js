const {response} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const createUser = async (req, res = response) => {
    const {email, password} = req.body;

    try {

        let user = await User.findOne({
            email
        });

        if(user){
            return res.status(400).json({ // 400 significa que hay un error 
                ok: false,
                msg: 'El usuario ya existe con ese correo'
            })
        }


        user = new User(req.body);

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(); // Genera un salt, es un valor aleatorio que se añade al password para que la encriptación sea más segura
        user.password = bcrypt.hashSync(password, salt);


        await user.save();

        // Generar el JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({ // 201 es el código de creación
            ok: true,
            msg: 'Registro',
            uId: user.id,
            name: user.name,
            token
        })   
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ // 500 es el código de error
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese correo'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar el JWT
        const token = await generateJWT(user.id, user.name);

        return res.json({
            ok: true,
            msg: 'Login',
            uId: user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};


const renewToken = async (req, res = response) => {

    const {uid, name} = req;

    // Generar un nuevo JWT y retornarlo en esta petición
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        msg: 'Renew',
        uid, name, 
        token
    })
}

module.exports = {
    createUser, loginUser, renewToken
}
