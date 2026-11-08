const CACHE_NAME = "cosmos-v1";

const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/cosmos-192.png",
  "./icons/cosmos-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});