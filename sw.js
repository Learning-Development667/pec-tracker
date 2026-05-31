const CACHE = 'pec-tracker-v1';
const ASSETS = [
  '/pec-tracker/',
  '/pec-tracker/index.html',
  '/pec-tracker/js/scripts.js',
  '/pec-tracker/content/formguides.js',
  '/pec-tracker/images/bench-press.png',
  '/pec-tracker/images/chest-fly.png',
  '/pec-tracker/images/incline-press.png',
  '/pec-tracker/images/close-grip.png',
  '/pec-tracker/images/pullover.png',
  '/pec-tracker/images/stretch-doorway.png',
  '/pec-tracker/images/stretch-lying.png',
  '/pec-tracker/images/stretch-crossbody.png',
  '/pec-tracker/images/stretch-overhead.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/pec-tracker/'));
});

self.addEventListener('push', e => {
  e.waitUntil(
    self.registration.showNotification('Pec Tracker', {
      body: "Time for today's session. Let's go.",
      icon: '/pec-tracker/icons/icon-192.png',
      badge: '/pec-tracker/icons/icon-192.png',
      vibrate: [200, 100, 200]
    })
  );
});
