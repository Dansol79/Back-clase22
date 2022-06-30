const express = require('express');
const moment = require('moment');
const {Server: HttpServer} = require('http');
const {Server: IOserver} = require('socket.io');
const serverRoutes = require('./routers/index');
const chatController = require('./componentes/chat/chatController');


//Normalize

const {normalize, schema} = require('normalizr');
const author = new schema.Entity('authors', {}, {idAttribute: 'email'});
const text = new schema.Entity('texts', {author: author}, {idAttribute: 'id'});
const messagesCenter = new schema.Entity('messagesCenter', {
    authors: [author],
    messages: [text]
}, {idAttribute: 'id'});

function normalizar(mensajes){
    const normalizar = mensajes.map((message) => ({    
        author: message.author,
        fecha: message.fecha,
        text: message.text,
        id: message.id.toString()
    }));
    const normalizados = normalize(
        {id: 'mensajes', messages: normalizar},
        messagesCenter
    );
    return normalizados;
}

const app = express();
const httpServer = HttpServer(app);
const io = new IOserver(httpServer);
const PORT = process.env.PORT || 8080;




// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


// Routes
serverRoutes(app);

/* SOCKETS */
io.on('connection', async (socket) => {
    console.log('Nuevo usuario conectado');

    socket.emit('messages', normalizar(await chatController.listAll()));

    socket.on('message', async (message) => {
        console.log(message);

        const {author, text} = message;
        const newMessage = {
            author,
            text,
            fecha: moment( new Date() ).format('DD/MM/YYYY HH:mm:ss')
        };
        await chatController.save({
            author: newMessage.author,
            text: newMessage.text,
            fecha: newMessage.fecha
        });
        io.socket.emit('message', newMessage);        
    });
})

// Server
 const server = httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

server.on('error', () => {
    console.log('Error del servidor');
})