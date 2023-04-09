const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // es decir qeu no puede haber correos duplicados 
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = model('Usuario', UsuarioSchema); // como se va a llamar y que es lo que importa