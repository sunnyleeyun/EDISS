// server.js

const express = require('express');
var db = require('./db'); 


var customersRouter = require('./routes/customers');

  
// Create an app
const app = express();
app.get('/', (req, res) => {
    res.send('Hello world\n');
});


// Route handler for the /status endpoint
app.get('/status', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send('OK');
});


app.use('/customers', customersRouter);

// Listen port
const PORT = 3000;
app.listen(PORT);
console.log(`Running on port ${PORT}`);
