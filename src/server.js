const path = require('path');
const express = require('express');
const { Pool } = require('pg');

const APP_PORT = Number(process.env.APP_PORT) || 8080;

const pool = new Pool({
  host: process.env.DB_HOST,          
  port: Number(process.env.DB_PORT), 
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/announcements', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, title, body, created_at FROM announcements ORDER BY id'
    );
    res.json(rows);
  } catch (err) {
    console.error('DB query failed:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: `${process.env.DB_HOST}:${process.env.DB_PORT}` });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.listen(APP_PORT, async () => {
  console.log(`Server started on port ${APP_PORT}`);
  try {
    await pool.query('SELECT 1');
    console.log(`Connected to PostgreSQL at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  } catch (err) {
    console.error('Cannot connect to PostgreSQL:', err.message);
  }
});
