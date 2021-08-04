const financeCache = "finance-cache-v1";
const assets = [
    "/",
    "/index.html",
    "/css/main.css",
    "/js/main.js"
]

self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open(financeCache).then(cache => {
            cache.addAll(assets);
        })
    )
});

self.addEventListener('fetch', fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        })
    )
});
