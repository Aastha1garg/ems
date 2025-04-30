import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Make sure to load the .env file

const connectToDatabase = async () => {
  try {
    // Connecting to MongoDB using the URI from the .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    // Corrected template literal for string interpolation
    console.log(`MongoDB connection error: ${error.message}`);
  }
};

export default connectToDatabase;
