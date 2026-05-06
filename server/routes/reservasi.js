const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔥 TAMBAH INI (GET SEMUA RESERVASI)
router.get('/', (req, res) => {
  try {
    const rows = db.prepare(`SELECT * FROM reservasi ORDER BY id DESC`).all();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
// SIMPAN RESERVASI
router.post('/', (req, res) => {
  const { nama, wa, tanggal, jam, orang, area, catatan } = req.body;

  try {
    const result = db.prepare(`
      INSERT INTO reservasi (nama, wa, tanggal, jam, orang, area, catatan)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(nama, wa, tanggal, jam, orang, area, catatan);

    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;