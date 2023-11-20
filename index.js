const express = require('express');
const app = express();
const apiRoute = require('./routes/api');
//const bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.json());

app.use('/api', apiRoute);

io.on('connection', function(socket) {
    console.log('New user inbound.');

    socket.on('salut', (message) => {
        console.log(message);
    });


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
