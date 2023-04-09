const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find() // el find () "vacio" , trae todos los eventos
        .populate('user', 'name'); // param 1 -esto muestra todos la informacion del usuario y no solo el numero de usuario
    // param 2 - del user solo quiero que me muestre el name en la respuesta del postman, si quiero que muestre otro paramentro deberia poner al lado sin coma ej: ('user', 'name password')
    res.json({
        ok: 'true',
        eventos
    })
}

const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid; // referencia al usuario que lo creo al evento

        const eventoGuardado = await evento.save();

        res.json({
            ok: 'true',
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    // Verificar que tengo el evento
    //console.log(req.body);

}

const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    uid = req.uid; // uid del usuario valga la redundancia

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese ID'
            });
        }
        // en mi logica , solo puede actualizar el evento qla eprsona que lo creo, si esto no es asi no debo dejarlo pasar
        if (evento.user.toString() !== uid) { // si pasa esto quiere decir que una persona esta queriendo editar el evento de otra persona 
            return res.status(401).json({ // 401 es el codigo cuando uno no esta autorizado a hacer algo
                ok: false,
                msg: 'No tiene permiso para editar este evento'
            })
        }
        //si llegó hasta aqui quiere decir que quien creo el evnto es realmente quien desea actualizarlo
        const nuevoEvento = {
            ...req.body,
            user: uid // porque el id del usuario no viene en el body de la request
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
        //dindbyIdandUpdate()
        //param 1 - id del evento que quiero actulizar
        // param 2 - la actualizacion del evento, es decir el cuerpo del evento actualziado
        //param 3 - para que me muestre el evento actualizado directamente ver video 397 (actualizar evento )minuto 9:30



        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    uid = req.uid; // uid del usuario valga la redundancia

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese ID'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({ // 401 es el codigo cuando uno no esta autorizado a hacer algo
                ok: false,
                msg: 'No tiene permiso para eliminar este evento'
            })
        }
        //si llegó hasta aqui quiere decir que quien creo el evnto es realmente quien desea eliminarlo


        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);
        //dindbyIdandUpdate()
        //param 1 - id del evento que quiero actulizar
        // param 2 - la actualizacion del evento, es decir el cuerpo del evento actualziado
        //param 3 - para que me muestre el evento actualizado directamente ver video 397 (actualizar evento )minuto 9:30

        console.log(eventoEliminado);

        res.json({
            ok: true,
            evento: eventoEliminado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador-Eliminaion'
        });
    }


}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}