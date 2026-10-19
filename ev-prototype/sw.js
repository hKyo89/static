const CACHE = "ev-prototype-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./viewer.js",
  "./styles.css",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./images/promo-home-charging.png",
  "./images/event-mega.png",
  "./images/hero.png",
  "./images/promo-gelegar.png",
  "./images/services.png",
  "./images/account-4.png",
  "./images/promo-privacy.png",
  "./images/account-3.png",
  "./images/account-2.png",
  "./images/assistant.png",
  "./images/account-1.png",
  "./images/event-syariah.png",
  "./images/promo-allo.png",
  "./images/promo-public.png",
  "./images/event-cashback.png",
  "./images/account-footer.png",
  "./images/recommendations.png",
  "./images/promo-shopee.png",
  "./images/event-cooking.png",
  "./images/navigation.png",
  "./images/promo-install.png",
  "./images/promo-hydrogen.png",
  "./images/calendar.png",
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() =>
      self.skipWaiting()
    ),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key.startsWith("ev-prototype-") && key !== CACHE)
          .map((key) => caches.delete(key)),
      )
    ).then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (event) => {
  if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith(self.registration.scope)
  ) return;
  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(
          caches.open(CACHE).then((cache) => cache.put(event.request, copy)),
        );
      }
      return response;
    }).catch(() =>
      caches.match(event.request, { ignoreSearch: true }).then((response) =>
        response ||
        (event.request.mode === "navigate"
          ? caches.match("./index.html")
          : Response.error())
      )
    ),
  );
});
