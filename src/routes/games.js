const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /games
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM games ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error', message: err.message });
  }
});

// GET /games/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM games WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Game not found' });
    res.json(result.rows[0]);
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
    const result = await db.query(
      `INSERT INTO games (title, genre, platform, status, hours_played, image_url, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, genre || null, platform || null, status || 'plan_to_play', hours_played || 0, image_url || null, notes || null]
    );
    res.status(201).json(result.rows[0]);
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
    const check = await db.query('SELECT id FROM games WHERE id = $1', [req.params.id]);
    if (check.rows.length === 0) return res.status(404).json({ error: 'Game not found' });

    const result = await db.query(
      `UPDATE games 
       SET title=$1, genre=$2, platform=$3, status=$4, hours_played=$5, image_url=$6, notes=$7
       WHERE id=$8 RETURNING *`,
      [title, genre || null, platform || null, status || 'plan_to_play', hours_played || 0, image_url || null, notes || null, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error', message: err.message });
  }
});

// DELETE /games/:id
router.delete('/:id', async (req, res) => {
  try {
    const check = await db.query('SELECT id FROM games WHERE id = $1', [req.params.id]);
    if (check.rows.length === 0) return res.status(404).json({ error: 'Game not found' });
    await db.query('DELETE FROM games WHERE id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Database error', message: err.message });
  }
});

module.exports = router;