function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}

window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',scrollY>60);
});

function setSalam() {
  const h = new Date().getHours();
  const el = document.getElementById('salam');

  if(h<11) el.textContent='🌅 Selamat Pagi';
  else if(h<15) el.textContent='☀️ Selamat Siang';
  else if(h<18) el.textContent='🌤️ Selamat Sore';
  else el.textContent='🌙 Selamat Malam';
}