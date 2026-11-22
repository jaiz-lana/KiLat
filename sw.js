/* KiLat service worker — cache-first untuk aset lokal agar aplikasi bisa dipakai offline. */
const VERSION = 'kilat-v2.3.1';
const SHELL = [
  './', 'index.html', 'manifest.webmanifest', 'icon.svg', 'security.js', 'custom.css',
  'vendor/tailwind.css', 'vendor/fa/css/all.min.css',
  'vendor/fa/webfonts/fa-brands-400.woff2', 'vendor/fa/webfonts/fa-regular-400.woff2',
  'vendor/fa/webfonts/fa-solid-900.woff2', 'vendor/fa/webfonts/fa-v4compatibility.woff2',
  'vendor/pdf-lib.min.js', 'vendor/jszip.min.js', 'vendor/pdf.min.js', 'vendor/pdf.worker.min.js',
  'vendor/pako.min.js', 'vendor/UPNG.js', 'vendor/tesseract/tesseract.min.js',
  'vendor/tesseract/worker.min.js', 'vendor/tesseract/tesseract-core-lstm.wasm.js',
  'vendor/tesseract/tesseract-core-simd-lstm.wasm.js',
  'vendor/mammoth.browser.min.js', 'vendor/docx.iife.js', 'vendor/jspdf.umd.min.js',
  'vendor/html2canvas.min.js'
];

const OPTIONAL_ASSETS = ['static/sound/gledek.mp3'];

if (typeof globalThis !== 'undefined') {
  globalThis.KILAT_PWA_ASSETS = { SHELL, OPTIONAL_ASSETS };
}

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(async c => {
    await c.addAll(SHELL);
    const optionalResults = await Promise.allSettled(OPTIONAL_ASSETS.map(asset => c.add(asset)));
    optionalResults.forEach((result, i) => {
      if (result.status === 'rejected') console.warn(`Optional asset unavailable: ${OPTIONAL_ASSETS[i]}`);
    });
  }).then(() => self.skipWaiting()));
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
