const CACHE='coinflip-clean-v1';
const ASSETS=['index.html','styles.css','app.js','manifest.webmanifest','assets/cyrus.png','assets/sword.png','icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{let c=n.clone(); caches.open(CACHE).then(cc=>cc.put(e.request,c)); return n;})).catch(()=>caches.match('index.html')))});