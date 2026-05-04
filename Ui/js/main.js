document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  setSalam();

  document.getElementById('rTanggal').min =
    new Date().toISOString().split('T')[0];
});