import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDatabase from './db/db.js';
import { router as authRouter, setupWebSocket } from './routes/auth.js'; // ✅ Import both router & websocket

dotenv.config(); // Load environment variables early

const app = express();

// 🔥 CORS Middleware
app.use(cors({
  origin: 'http://localhost:5175',  // Removed the trailing slash to avoid issues
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json()); // Body parser

// 🛣️ API Routes
app.use('/api/auth', authRouter);

// ✅ Root route to check if server is working
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 🔌 Database Connection
connectToDatabase();

// 🚀 Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log('✅ Connected to the database');
});

// 🛜 Setup WebSocket (Optional but ready for real-time)
setupWebSocket(server);
