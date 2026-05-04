const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// FIX PATH
app.use(express.static(path.join(__dirname, '../Ui')));

// API
app.use('/api/order', require('./routes/order'));
app.use('/api/reservasi', require('./routes/reservasi'));

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});