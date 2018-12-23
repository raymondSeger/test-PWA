var CACHE_NAME      = 'PWA-TEST';
var filesToCache    = [
  'http://localhost/test-pwa/test-PWA/app.css',
  'http://localhost/test-pwa/test-PWA/app_data/apple.png'
];

self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Install');
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
            return cache.addAll(filesToCache);
            })
    );
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