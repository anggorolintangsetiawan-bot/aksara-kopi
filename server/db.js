const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./aksara.db');

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS reservasi (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT,
      wa TEXT,
      tanggal TEXT,
      jam TEXT,
      orang TEXT,
      area TEXT,
      catatan TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT,
      items TEXT,
      total INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

});

module.exports = db;    