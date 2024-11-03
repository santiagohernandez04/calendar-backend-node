const {Schema, model} = require('mongoose');    
const EventSchema = Schema({
    title: {
        type: String,
        required: true
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

EventSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject(); // Extraemos __v y _id de la respuesta
    object.id = _id; // Cambiamos _id por id
    return object; // Retornamos el objeto
});

module.exports = model('Event', EventSchema);