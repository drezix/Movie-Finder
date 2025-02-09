const express = require('express');
const cors = require('cors'); 
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
require('dotenv').config({ path: './backend/.env' });

const app = express();

connectDB();

app.use(cors());  


app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());

//--------------------------------------------AUTH-----------------------------------------------
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);

module.exports = app;
