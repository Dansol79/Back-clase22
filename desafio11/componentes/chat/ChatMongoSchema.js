const Joi = require('joi');
const mongoose = require('mongoose');
const {mongodb} = require('../../config/config');

mongoose.connect(mongodb.URL, mongodb.options).then(() => {
    console.log('Conectado a MongoDB');
}
).catch(err => {
    console.log(err);
}
);

const email = Joi.string().min(4).required();
const nombre = Joi.string().min(4).required();
const apellido = Joi.string().min(4).required();
const alias = Joi.string().min(4).required();
const edad = Joi.number().required();
const avatar = Joi.string().min(4).required();
const fecha = Joi.string().min(4).required();
const author = Joi.object({
    email: email,
    nombre: nombre,
    apellido: apellido,
    alias: alias,
    edad: edad,
    avatar: avatar

}).required();
const text = Joi.string().min(4).required();

const messageSchema = new mongoose.Schema({
    author,
    fecha,
    text
});

const Message = mongoose.model('mensajes', messageSchema);

module.exports = Message;

