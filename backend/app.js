const connectDB = require('./src/config/db');
const sanitizedMiddleware = require('./src/middlewares/sanitizedMiddleware');
const authRoutes = require('./src/routes/authRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
require('dotenv').config({ path: './backend/.env' });

const fs = require('fs');
const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8');
const certificate = fs.readFileSync(process.env.CERTIFICATE_PATH, 'utf8');
const credentials = {key: privateKey, cert: certificate};

const express = require('express');
const compression = require('compression'); 
const app = express();

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

connectDB();

const cors = require('cors'); 
app.use(cors());  

app.use(cors({
  origin: 'https://moviefinder.local:8443', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(compression()); 

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url}`);
  next();
});

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