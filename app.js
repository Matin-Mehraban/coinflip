// PWA SW only on http(s)
if (location.protocol.startsWith('http') && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(console.error));
}

const coin = document.getElementById('coin');
const resultEl = document.getElementById('result');
const btn = document.getElementById('flipBtn');
let spinning = false;

function setCTA(state){
  if(state==='spin'){ btn.disabled = true; btn.innerHTML = '<span class="spinner"></span><span>در حال چرخش…</span>'; }
  else { btn.disabled = false; btn.textContent = 'همین الان پرتاب کن!'; }
}

// Provided by user
function confettiBurst(){
  const end = Date.now() + 1200;
  (function frame(){
    confetti({ particleCount: 7, startVelocity: 22, spread: 360, origin: { x: Math.random(), y: Math.random() - 0.2 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

function flip(){
  if(spinning) return;
  spinning = true;
  setCTA('spin');
  resultEl.textContent = '';

  const isHeads = Math.random() < 0.5;  // true => شیر
  const spins = 3 + Math.floor(Math.random() * 3);
  const endDeg = isHeads ? 0 : 180;
  const total = spins * 360 + endDeg;
  const dur = 1600;

  const start = performance.now();
  function animate(t){
    const p = Math.min(1, (t - start) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    coin.style.transform = `rotateY(${total*e}deg)`;
    if(p < 1) requestAnimationFrame(animate);
    else {
      coin.style.transform = `rotateY(${endDeg}deg)`;
      resultEl.textContent = isHeads ? 'نتیجه: شیر' : 'نتیجه: خط';
      confettiBurst();
      spinning = false;
      setCTA('ready');
    }
  }
  requestAnimationFrame(animate);
}

coin.addEventListener('click', flip);
btn.addEventListener('click', flip);
coin.style.transform = 'rotateY(0deg)';
