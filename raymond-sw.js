var cacheName = 'PWA-TEST';
var filesToCache = [];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
});