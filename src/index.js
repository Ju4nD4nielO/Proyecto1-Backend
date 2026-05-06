const express = require('express');
const cors = require('cors');
require('dotenv').config();

const gamesRouter = require('./routes/games');  // 👈 cambió

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Game Tracker API running' });
});

app.use('/games', gamesRouter);  // 👈 cambió

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🎮 Server running on http://localhost:${PORT}`);
});