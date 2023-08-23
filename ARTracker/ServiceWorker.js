const cacheName = "DefaultCompany-face-tracking-3d-model-0.1";
const contentToCache = [
    "Build/ARTracker.loader.js",
    "Build/68b0454592d67a06ff2b0ab130b2bb06.js.br",
    "Build/9f5f973b89848b09860a8fe6361bdec6.data.br",
    "Build/b3f386fd61cfda14c8f78373100b7c39.wasm.br",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
