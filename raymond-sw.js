var CACHE_NAME      = 'PWA-TEST';
var filesToCache    = [
  'http://localhost/test-pwa/test-PWA/app.css',
  'http://localhost/test-pwa/test-PWA/app_data/apple.png'
];

var the_sw = self;

// get all the cached files
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

// every asset fetch will pass through Service Worker first
self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
});

self.addEventListener('push', function(event) {
    if (event.data) {
      console.log('This push event has data: ', event.data.text());
    } else {
      console.log('This push event has no data.');
    }

    var promise1 = new Promise(function(resolve, reject) {
        console.log('do promise 1');
        resolve("done");
      });

    var promise2 = new Promise(function(resolve, reject) {
        console.log('do promise 2');
        const title     = "title";
        const message   = "message";

        self.registration.showNotification(title, {
            body: message
        });
    });

  const doThesePromises = Promise.all([
    promise1,
    promise2
  ]);

  event.waitUntil(doThesePromises);
});