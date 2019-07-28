/* eslint-disable */
const CACHE = 'bulls&cows-v1.0.0';
const precacheFiles = [
    './',
    './main.css',
    './app.js',
    './assets/sprite.svg',
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(precacheFiles)),
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keyList => Promise.all(keyList.map((key) => {
            if (key !== CACHE) {
                return caches.delete(key);
            }
        }))),
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request)),
    );
});
