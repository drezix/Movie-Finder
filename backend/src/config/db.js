const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

try{
  connect = () => {
    mongoose.connect(`mongodb://localhost:27017/moviefinder`);
    console.log('Connected to the database');
  }
} catch (error) {
  console.log('Error connecting to the database', error);
}
  
  mongoose.connection.on('error', err => {
    logError(err);
  });

connect();

module.exports = mongoose;