self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('app-cache').then(cache => {
      return cache.addAll([
        'index.html',
        'chat.html',
        'comparatore.html',
        'caf.html',
        'fotovoltaico.html',
        'appuntamenti.html'
      ]);
    })
  );
});
