// Imports -----------------------
require('dotenv').config();

const port = process.env.DB_PORT || 3000;
const connection = process.env.DB_CONNECTION;

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');
// -------------------------------

// Middlewares -------------------
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// -------------------------------

// Home route --------------------
app.get('/', (req, res) => {
    res.send("We are on home!");
});
// -------------------------------


// Import routes -----------------
const carsRoute = require('./routes/cars.js');
const usersRoute = require('./routes/users.js');

app.use('/cars', carsRoute);
app.use('/users', usersRoute);
// -------------------------------


// Server ------------------------
app.listen(port);
console.log('Server is listening on port:', port);
// -------------------------------


// DB Connection -----------------
mongoose.connect(
    connection,
    { useUnifiedTopology: true, useNewUrlParser: true },    // Prevents errors 
    () => console.log('Connected to mongoDB...')
);
// -------------------------------