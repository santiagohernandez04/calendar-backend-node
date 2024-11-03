const {response} = require('express');
const Event = require('../models/Event');
const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');


    res.json({
        ok: true,
        msg: 'getEvents',
        events
       
    });
}

const createEvent = async (req, res = response) => {
    const event = new Event({
        ...req.body,
        user: req.uid  
       });
    console.log(event);

    try {
        const saveEvent = await event.save();
        res.json({
            ok: true,
            event: saveEvent
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

// Actualizar evento
const updateEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});
        res.json({
            ok: true,
            event: eventUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

// Delete event
const deleteEvent = async (req, res = response) => {
    
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar este evento'
            });
        }
        await Event.findByIdAndDelete(eventId);
        res.json({
            msg: 'Evento eliminado',
            ok: true
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };