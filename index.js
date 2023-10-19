const express = require('express');
const app = express();
const apiRoute = require('./routes/api');
//const bodyParser = require('body-parser');
const io = require('socket.io')();

app.use(express.json());

app.use('/api', apiRoute);

io.on('connection', (socket) => {
    console.log('New user inbound.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
