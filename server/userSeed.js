// server/userSeed.js (Updated)
import mongoose from 'mongoose';
import connectDB from './db/db.js';
import User from './models/User.js';

const users = [
  { 
    name: 'User One', 
    email: 'user1@example.com', 
    password: 'password123', 
    role: 'admin', 
    profileImage: '',  // Optional field
  },
  { 
    name: 'User Two', 
    email: 'user2@example.com', 
    password: 'password123', 
    role: 'employee', 
    profileImage: '',  // Optional field
  },
];

const seedUsers = async () => {
  try {
    await connectDB();
    await User.insertMany(users);
    console.log('Users seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding users:', error);
    mongoose.connection.close();
  }
};

seedUsers();
