const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/USMBRO', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', () => {
    console.log('Connexion à la base OK');
});