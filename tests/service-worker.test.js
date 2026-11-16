import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('../public/service-worker.js', import.meta.url), 'utf8');

test('migration extends activation through navigation and handles navigation rejection', async () => {
  const listeners = {};
  const deleted = [];
  let unregistered = false;
  let warnings = 0;
  let finishNavigation;
  const scope = 'https://example.com/bulls-and-cows/';
  const cacheName = `workbox-precache-v2-${scope}`;
  vm.runInNewContext(source, {
    self: {
      addEventListener: (name, handler) => { listeners[name] = handler; },
      registration: { scope, unregister: async () => { unregistered = true; } },
      clients: { matchAll: async () => [
        { url: scope, navigate: () => new Promise((resolve) => { finishNavigation = resolve; }) },
        { url: scope, navigate: async () => { throw new Error('closed client'); } },
      ] },
    },
    caches: {
      keys: async () => [cacheName, 'another-app-cache'],
      delete: async (name) => { deleted.push(name); },
    },
    console: { warn: () => { warnings++; }, error: assert.fail },
  });
  let lifetime;
  listeners.activate({ waitUntil: (promise) => { lifetime = promise; } });
  assert.ok(lifetime);
  let complete = false;
  lifetime.then(() => { complete = true; });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(unregistered, true);
  assert.deepEqual(deleted, [cacheName]);
  assert.equal(warnings, 1);
  assert.equal(complete, false);
  finishNavigation();
  await lifetime;
  assert.equal(complete, true);
});
