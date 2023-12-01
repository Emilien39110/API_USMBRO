const express = require('express');
const app = express();
const apiRoute = require('./routes/api');
//const bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.json());

app.use('/api', apiRoute);

async function emitOnAllSockets(event,data){
    const sockets  = await io.fetchSockets();
    for(const socket of sockets){
        socket.emit(event,data);
    }
}

io.on('connection', function(socket) {
    console.log('New user inbound.');

    socket.on("reqLoc", (message) => {
        var id1 = message.split(" ")[0];
        var id2 = message.split(" ")[1];
        var pren = message.split(" ")[2];
        console.log("reqLoc in progress");
        console.log(id1 + " "+ id2+ " "+pren);
        emitOnAllSockets("test", id1+" "+pren);
        socket.on(id2, (message) => {
            socket.emit(id1, message);
        })
    })

    // socket.on("salut", (message) => {
    //     console.log(message);
    //     socket.emit("salut", "salut");
    // })


    socket.on('disconnect', function() {
        console.log('User disconnected.');
    });
    
});




const PORT = process.env.PORT || 3000;
const WS_PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    io.listen(WS_PORT);
    console.log(`Websocket server started on port ${WS_PORT}`);
});
