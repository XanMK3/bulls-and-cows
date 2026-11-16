// Kill-switch for the old CRA worker. Preserve caches belonging to other apps.
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    const scope = self.registration.scope;
    await Promise.all(cacheNames
      .filter((name) => name.startsWith('workbox-') && name.endsWith(scope))
      .map((name) => caches.delete(name)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    await Promise.all(clients.map(async (client) => {
      try {
        await client.navigate(client.url);
      }
      catch (error) {
        console.warn('Could not reload a migrated client:', error);
      }
    }));
  })().catch((error) => {
    console.error('Service worker migration failed:', error);
  }));
});
