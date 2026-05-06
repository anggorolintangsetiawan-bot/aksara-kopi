let cart = [];

function addToCart(nama, emoji, harga) {
  const idx = cart.findIndex(i=>i.nama===nama);
  if(idx>-1) cart[idx].qty++;
  else cart.push({nama,emoji,harga,qty:1});
  renderCart();
  showToast(`${emoji} ${nama} ditambahkan!`);
}

function changeQty(nama, delta) {
  const idx = cart.findIndex(i=>i.nama===nama);
  if(idx>-1) {
    cart[idx].qty += delta;
    if(cart[idx].qty<=0) cart.splice(idx,1);
  }
  renderCart();
}

function removeItem(nama) {
  cart = cart.filter(i=>i.nama!==nama);
  renderCart();
}

function renderCart() {
  const body = document.getElementById('cartBody');
  const foot = document.getElementById('cartFoot');
  const count = document.getElementById('cartCount');

  const totalQty = cart.reduce((s,i)=>s+i.qty,0);
  count.textContent = totalQty;

  if(cart.length===0) {
    body.innerHTML='<div class="cart-empty">Kosong</div>';
    foot.style.display='none';
    return;
  }

  const subtotal = cart.reduce((s,i)=>s+i.harga*i.qty,0);

  body.innerHTML = cart.map(i=>`
    <div class="cart-item">
      <div>${i.nama} x${i.qty}</div>
      <button onclick="changeQty('${i.nama}',-1)">-</button>
      <button onclick="changeQty('${i.nama}',1)">+</button>
    </div>
  `).join('');

  document.getElementById('subtotal').textContent='Rp '+subtotal.toLocaleString('id');
  document.getElementById('totalHarga').textContent='Rp '+(subtotal+2000).toLocaleString('id');
  foot.style.display='block';
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

function checkout() {
  if (!cart || cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);

  fetch('https://aksara-kopi-production.up.railway.app/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nama: "Customer",
      items: cart,
      total: total
    })
  })

  .then(res => {
  if (!res.ok) throw new Error("Server error");
  return res.json();
})

  .then(res => {
    alert("Pesanan berhasil!");
    cart = [];
    renderCart();
  })
  .catch(err => {
    console.error(err);
    alert("Gagal kirim pesanan!");
  });
}