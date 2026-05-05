const express = require('express');
const router = express.Router();
const db = require('../db');

// GET SEMUA PESANAN
router.get('/', (req, res) => {
  try {
    const rows = db.prepare(`SELECT * FROM orders ORDER BY id DESC`).all();
    res.json(rows);
  } catch (err) {
    console.error(err); // 👈 penting untuk debug
    res.status(500).json({ error: err.message });
  }
});

// SIMPAN PESANAN
router.post('/', (req, res) => {
  const { nama, items, total } = req.body;

  // 🔥 validasi biar gak error aneh
  if (!nama || !items || !total) {
    return res.status(400).json({ error: 'Data tidak lengkap' });
  }

  try {
    const result = db.prepare(
      `INSERT INTO orders (nama, items, total) VALUES (?, ?, ?)`
    ).run(nama, JSON.stringify(items), total);

    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    console.error(err); // 👈 penting untuk debug
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;