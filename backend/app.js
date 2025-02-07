const express = require('express')
const connectDB = require('./src/config/db');
require('./src/config/db');

const app = express()
const port = 3000

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app;