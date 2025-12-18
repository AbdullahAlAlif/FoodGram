//create Server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routs/auth.routs');
const foodRoutes = require('./routs/food.routes');
const foodPartnerRoutes = require('./routs/foodPartner.routes');
const cors = require('cors');

const app = express();
app.use(express.json()); 
app.use(cookieParser()); 
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
})); 

// Register routes before exporting the app
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);


module.exports = app;