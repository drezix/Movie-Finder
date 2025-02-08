const express = require('express')
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');  

const app = express()

connectDB();

app.use(express.json());

//--------------------------------------------AUTH-----------------------------------------------
app.use('/auth', authRoutes);


module.exports = app;