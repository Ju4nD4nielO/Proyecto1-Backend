const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /games
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM games ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error', message: err.message });
  }
});

// GET /games/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM games WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Game not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error', message: err.message });
  }
});

// POST /games
router.post('/', async (req, res) => {
  const { title, genre, platform, status, hours_played, image_url, notes } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Validation failed', message: 'Title is required' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO games (title, genre, platform, status, hours_played, image_url, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, genre || null, platform || null, status || 'plan_to_play', hours_played || 0, image_url || null, notes || null]
    );
    const [newGame] = await db.query('SELECT * FROM games WHERE id = ?', [result.insertId]);
    res.status(201).json(newGame[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error', message: err.message });
  }
});

// PUT /games/:id
router.put('/:id', async (req, res) => {
  const { title, genre, platform, status, hours_played, image_url, notes } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Validation failed', message: 'Title is required' });
  }
  try {
    const [existing] = await db.query('SELECT id FROM games WHERE id = ?', [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ error: 'Game not found' });

    await db.query(
      'UPDATE games SET title=?, genre=?, platform=?, status=?, hours_played=?, image_url=?, notes=? WHERE id=?',
      [title, genre || null, platform || null, status || 'plan_to_play', hours_played || 0, image_url || null, notes || null, req.params.id]
    );
    const [updated] = await db.query('SELECT * FROM games WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error', message: err.message });
  }
});

// DELETE /games/:id
router.delete('/:id', async (req, res) => {
  try {
    const [existing] = await db.query('SELECT id FROM games WHERE id = ?', [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ error: 'Game not found' });
    await db.query('DELETE FROM games WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Database error', message: err.message });
  }
});

module.exports = router;    