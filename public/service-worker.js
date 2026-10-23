// Kill-switch: unregisters the old CRA service worker and clears all caches.
// Safe to remove once all existing users have migrated.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', async () => {
  await Promise.all((await caches.keys()).map(k => caches.delete(k)));
  await self.registration.unregister();
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach(c => c.navigate(c.url));
});
