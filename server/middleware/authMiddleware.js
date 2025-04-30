import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
  try {
    // Check if token is provided in Authorization header (Bearer Token)
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Fetch the user based on decoded id from the token
    const user = await User.findById(decoded.id); // Use decoded.id, not _id
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Attach user object to request for further processing in routes
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Auth error:', error);
    // General error response
    return res.status(500).json({ success: false, message: 'Authentication failed. Please try again.' });
  }
};

export default verifyUser;
