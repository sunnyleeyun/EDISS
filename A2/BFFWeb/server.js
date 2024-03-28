// server.js
const express = require('express');
const jwtMiddleware = require('./jwtMiddleware');
const customerRouter = require('./routes/customers');
const bookRouter = require('./routes/books');


// Create an app
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world\n');
});


app.use(jwtMiddleware);
app.use('/customers', customerRouter);
app.use('/books', bookRouter);


// Listen port
const PORT = 80;
app.listen(PORT);
console.log(`Running on port ${PORT}`);
