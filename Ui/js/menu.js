const menuData = [
  {nama:'Es Kopi Susu Aksara',img:'js/img/hero-menu.png',harga:22000,kategori:'kopi',badge:'Best Seller',desc:'Signature drink kami — espresso, susu segar, gula aren.'},
  {nama:'Manual Brew',img:'js/img/manual-brew.png',harga:28000,kategori:'kopi',badge:'Premium',desc:'Kopi single origin diseduh presisi.'},
  {nama:'Americano',img:'js/img/americano.jpg',harga:18000,kategori:'kopi',badge:'',desc:'Espresso + air panas.'},
  {nama:'Matcha Latte',img:'js/img/matcha-latte.webp',harga:25000,kategori:'nonkopi',badge:'Favorit',desc:'Matcha premium.'},
  {nama:'Brown Sugar Boba',img:'js/img/brown-sugar-boba.jpg',harga:24000,kategori:'nonkopi',badge:'',desc:'Teh susu + boba.'},
  {nama:'Dark Choco',img:'js/img/dark-choco.jpg',harga:23000,kategori:'nonkopi',badge:'',desc:'Coklat premium.'},
  {nama:'Croissant Butter',img:'js/img/croissant-butter.jpg',harga:18000,kategori:'makanan',badge:'',desc:'Croissant renyah.'},
  {nama:'Banana Toast',img:'js/img/banana-toast.webp',harga:20000,kategori:'makanan',badge:'Baru',desc:'Roti + pisang.'},
  {nama:'Avocado Toast',img:'js/img/avocado_toast.webp',harga:22000,kategori:'makanan',badge:'',desc:'Roti + alpukat.'},
];

function renderMenu(filter='semua') {
  const grid = document.getElementById('menuGrid');
  const filtered = filter==='semua' ? menuData : menuData.filter(m=>m.kategori===filter);

  grid.innerHTML = filtered.map(m=>`
    <div class="menu-card">
      <div class="menu-img">
        <img src="${m.img}" alt="${m.nama}">
        ${m.badge ? `<span class="menu-badge-pop">${m.badge}</span>` : ''}
      </div>
      <div class="menu-body">
        <div class="menu-name">${m.nama}</div>
        <div class="menu-desc">${m.desc}</div>
        <div class="menu-footer">
          <span class="menu-price">Rp ${m.harga.toLocaleString('id')}</span>
          <button class="add-btn" onclick="addToCart('${m.nama}','🛒',${m.harga})">+</button>
        </div>
      </div>
    </div>
  `).join('');
}
function filterMenu(kat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderMenu(kat);
}