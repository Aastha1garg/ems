import express from 'express';
import { login, register } from '../controllers/authController.js';
import verifyUser from '../middleware/authMiddleware.js';
import { Server } from 'socket.io';

const router = express.Router();

// Authentication Routes
router.post('/login', login);
router.post('/register', register);
router.get('/verify', verifyUser, (req, res) => {
  res.status(200).json({ success: true, message: 'User verified', user: req.user });
});

// WebSocket Setup
const setupWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5175',  // ✅ Correct! Specific origin, not '*'
      methods: ['GET', 'POST'],
      credentials: true,                // ✅ Very important for socket authentication
    },
  });

  io.on('connection', (socket) => {
    console.log('🟢 A user connected');

    // Optional: You can access socket.handshake.query.token here if you want
    console.log('User token:', socket.handshake.query.token);

    socket.on('message', (msg) => {
      console.log('Received message: ', msg);
      io.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('🔴 A user disconnected');
    });
  });
};

export { router, setupWebSocket };
