/* KiLat service worker — cache-first untuk aset lokal agar aplikasi bisa dipakai offline. */
const VERSION = 'kilat-v2.2.0';
const SHELL = [
  './', 'index.html', 'manifest.webmanifest', 'icon.svg',
  'vendor/tailwind.css', 'vendor/fa/css/all.min.css',
  'vendor/pdf-lib.min.js', 'vendor/jszip.min.js', 'vendor/pdf.min.js', 'vendor/pdf.worker.min.js',
  'vendor/pako.min.js', 'vendor/UPNG.js', 'vendor/tesseract/tesseract.min.js',
  'vendor/mammoth.browser.min.js', 'vendor/docx.iife.js', 'vendor/jspdf.umd.min.js', 'vendor/html2canvas.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!/^https?:$/.test(url.protocol)) return;
  const sameOrigin = url.origin === location.origin;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put('index.html', cp)); return r; })
      .catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r && (r.ok || r.type === 'opaque') && (sameOrigin || /fonts\.(googleapis|gstatic)\.com|jsdelivr|projectnaptha/.test(url.host))) {
      const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp));
    }
    return r;
  })));
});
