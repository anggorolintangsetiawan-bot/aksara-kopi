const express = require('express');
const router = express.Router();
const db = require('../db');

// TEST / GET SEMUA PESANAN
router.get('/', (req, res) => {
  db.all(`SELECT * FROM orders ORDER BY id DESC`, [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// SIMPAN PESANAN
router.post('/', (req, res) => {
  const { nama, items, total } = req.body;

  db.run(
    `INSERT INTO orders (nama, items, total) VALUES (?, ?, ?)`,
    [nama, JSON.stringify(items), total],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ success: true, id: this.lastID });
    }
  );
});

module.exports = router;