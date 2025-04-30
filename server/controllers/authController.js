import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// LOGIN Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt with:', req.body);

    // 💥 Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // 🔎 Find user by email
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      console.log('No user found with this email');
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    console.log('User found:', foundUser.email);

    // ✅ Directly compare plain text passwords
    if (password !== foundUser.password) {
      console.log('Password does not match');
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // 🪄 Create JWT token
    const token = jwt.sign(
      { id: foundUser._id, role: foundUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('Token generated successfully for:', foundUser.email);

    // 📨 Send successful response with token
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      },
      token,
    });

  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// REGISTER Controller
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log('Register attempt with:', req.body);

    // 💥 Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    // 🔎 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // ❗ Save password directly (without hashing)
    const newUser = new User({
      name,
      email,
      password, // saving plain password directly
      role: role || 'employee', // Default role is employee
    });

    await newUser.save();
    console.log('New user registered:', newUser.email);

    res.status(201).json({ success: true, message: 'User registered successfully' });

  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
