const CACHE = 'bulls&cows-v1.0.0';
const precacheFiles = [
    '/',
    '/main.css',
    '/app.js',
];

self.addEventListener('install', function (e) {
    e.waitUntil(precache().then(function () {
        return self.skipWaiting();
    }));
});

self.addEventListener('activate', function (e) {
    e.waitUntil(caches.keys()
        .then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== CACHE) {
                    return caches.delete(key);
                }
            }));
        })
    );

    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    e.respondWith(fromCache(e.request).catch(function (reason) {
        return fromServer(e.request);
    }));
    //e.waitUntil(update(e.request));
});

function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll(precacheFiles);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (response) {
            return response || Promise.reject('no-match');
        });
    });
}

function fromServer(request) {
    return fetch(request).then(function (response) {
        return response;
    })
}

function update(request) {
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}
