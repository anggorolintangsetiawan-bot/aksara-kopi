async function submitReservasi(e) {
  e.preventDefault();

  const data = {
    nama: document.getElementById('rNama').value,
    wa: document.getElementById('rWa').value,
    tanggal: document.getElementById('rTanggal').value,
    jam: document.getElementById('rJam').value,
    orang: document.getElementById('rOrang').value,
    area: document.getElementById('rArea').value,
    catatan: document.getElementById('rCatatan').value
  };

  const res = await fetch('https://aksara-kopi-production.up.railway.app/api/reservasi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  showToast(result.message);
}

function closeModal() {
  document.getElementById('modalReservasi').classList.remove('open');
}