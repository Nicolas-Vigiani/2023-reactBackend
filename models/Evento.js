const { Schema, model } = require('mongoose');

const EventoSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: { // esto para saber quien grabo este registro
        type: Schema.Types.ObjectId, // esto para decirle a mongoose que es un tipo de objeto de otra clase
        ref: 'Usuario',
        required: true
    }

});
// Esto es totalmente opcional
EventoSchema.method('toJSON', function () { // esto es para personalizar la respuesta que se ve en postman
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Evento', EventoSchema); 