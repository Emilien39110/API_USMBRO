const express = require('express');
const app = express();
const apiRoute = require('./routes/api');
//const bodyParser = require('body-parser');

app.use(express.json());

app.use('/api', apiRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
