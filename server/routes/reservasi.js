const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔥 TAMBAH INI (GET SEMUA RESERVASI)
router.get('/', (req, res) => {
  db.all(`SELECT * FROM reservasi ORDER BY id DESC`, [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// SIMPAN RESERVASI
router.post('/', (req, res) => {
  const { nama, wa, tanggal, jam, orang, area, catatan } = req.body;

  db.run(
    `INSERT INTO reservasi (nama, wa, tanggal, jam, orang, area, catatan)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nama, wa, tanggal, jam, orang, area, catatan],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: 'Reservasi berhasil', id: this.lastID });
    }
  );
});

module.exports = router;