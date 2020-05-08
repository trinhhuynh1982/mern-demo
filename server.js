
// Importing Modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// importing files
const routes = require('./routes');

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080; // Step 1


// Step 2
/* mongoose.connect( process.env.MONGODB_URI || 'mongodb+srv://maxime:passw@rd123@freecluster-kdnoc.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
}); */

/* mongoose.connect('mongodb://reactcosmosdb.documents.azure.com:10255/reactcosmosdb?ssl=true', {
    auth: {
        user: 'reactcosmosdb',
        password: 'ctNkvv2RkReK5m2niB2EybslyvXp5nbFYwb1bquaVrnF0Qtyn9Mw4GOTcUGsdim6XFh4gB9kJnOD7hN5BrG2kg=='
    }
})
    .then(() => console.log('connection successful'))
    .catch((err) => console.log(err)) */

    mongoose.connect('mongodb://reactcosmosdb.documents.azure.com:10255/reactcosmosdb?ssl=true', {
        auth: {
            user: 'reactcosmosdb',
            password: 'fwVtIOxk1vPMq5uGuSQ24ElB7uitCRuAjuM87CsfmoROXVTJyJqTdM1tGAeWeAFDRB0x9RDCOpWH5Rxsk5ZNaQ=='
        },
        useNewUrlParser: true
    })
        .then(() => console.log('connection successful'))
        .catch((err) => console.log(err));

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});