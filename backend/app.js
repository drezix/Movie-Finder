const connectDB = require('./src/config/db');
const sanitizedMiddleware = require('./src/middlewares/sanitizedMiddleware');
const authRoutes = require('./src/routes/authRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
require('dotenv').config({ path: './backend/.env' });

const fs = require('fs');
const privateKey = fs.readFileSync('C:/Users/Fasano/Desktop/https estranho/moviefinder.local-key.pem', 'utf8');
const certificate = fs.readFileSync('C:/Users/Fasano/Desktop/https estranho/moviefinder.local.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const express = require('express');
const app = express();

connectDB();

const cors = require('cors'); 
app.use(cors());  


app.use(cors({
  origin: 'https://moviefinder.local:8443', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());

//--------------------------------------------SANITIZE-------------------------------------------
app.use(sanitizedMiddleware);

//--------------------------------------------AUTH-----------------------------------------------
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);

const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const http = require('http');
const https = require('https');

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

module.exports = app;
