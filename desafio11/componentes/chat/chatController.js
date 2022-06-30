const Message = require('./ChatMongoSchema');

class ChatController{
    constructor(){}

    async listAll(){
        try{
            return await Message.find({});
        }catch(err){
            throw new Error(`Error al listar todos los mensajes: ${err}`);
        }
    }

    async listById(id){
        try{
            return await Message.findById(id);
        }catch(err){
            throw new Error(`Error al listar un mensaje: ${err}`);
        }
    }

    async save(newElement){
        try{
            return await Message.create(newElement);
        }catch(err){
            throw new Error(`Error al guardar un mensaje: ${err}`);
        }

    }
    async update(id, data){
        try{
            return await Message.findByIdAndUpdate(id, data);
        }catch(err){
            throw new Error(`Error al actualizar un mensaje: ${err}`);
        }
    }
    async delete(id){
        try{
            return await Message.findByIdAndDelete(id);
        }catch(err){
            throw new Error(`Error al eliminar un mensaje: ${err}`);
        }
    }
}

const chatController = new ChatController()

module.exports = chatController