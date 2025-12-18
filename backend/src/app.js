//create Server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routs/auth.routs');
const foodRoutes = require('./routs/food.routes');
const cors = require('cors');

const app = express();
app.use(express.json()); //this middle ware is used to parse JSON request body so that we can access it in req.body
app.use(cookieParser()); //this middleware is used to parse cookies
app.use(cors({
    origin: 'http://localhost:5173', //frontend origin
    credentials: true
})); // Enable CORS for all routes

// Register routes before exporting the app
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

//if we want to create a route in app.js we can do like this (using app.method)
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

module.exports = app;