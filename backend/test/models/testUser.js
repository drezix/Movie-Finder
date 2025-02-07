const { userModel } = require('../../src/models/User');
const { mongoose } = require('mongoose');
const connectDB = require('../../src/config/db');

async function testUserModel() {
  try {
    await connectDB();

    const newUser = new userModel({
      username: 'andre',
      email: 'andre@example.com',
      password: 'password',
      isAdmin: true
    })
    const savedUser = await newUser.save();
    console.log('User saved successfully!', savedUser);

    const foundUser = await userModel.findOne({ email: 'andre@example.com' });
    console.log('User found:', foundUser);

    await userModel.deleteOne({ email: 'andre@example.com' });
    console.log('User deleted successfully!');
  }
  catch (error) {
    console.error('Error testing user model:', error);
  } finally {
    await mongoose.connection.close();
  }
}

testUserModel();


