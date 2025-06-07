const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const mongodb = require('./data/database.js');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

// 🔥 Middleware 404
app.use((req, res, next) => {
    next(createError(404, 'Page not found'));
});

// 🧯 Middleware for the errors in general
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status,
            message: err.message
        }
    });
});

mongodb.initDB((err) => {
    if(err) {
        console.error(err);
    } else {
        app.listen(port, () => {
          console.log(`Database listening and Server is running on port ${port}`);
        });
    }
})
