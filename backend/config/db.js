const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://Priyanshu:H9SVXzOtVQDvsnZy@cluster0.z0jn7.mongodb.net/e-commerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error :' , error);
  }
};

module.exports = connectDB;
