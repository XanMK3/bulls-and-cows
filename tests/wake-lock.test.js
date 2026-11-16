import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import test from 'node:test';

let effect;
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === 'react') {
      return { url: 'test:react', shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url === 'test:react') {
      return { format: 'module', source: 'export const useEffect = (fn) => globalThis.captureEffect(fn);', shortCircuit: true };
    }
    return nextLoad(url, context);
  },
});
globalThis.captureEffect = (fn) => { effect = fn; };
const { default: useWakeLock } = await import('../src/hooks/useWakeLock.js');
hooks.deregister();
const flush = () => new Promise((resolve) => setImmediate(resolve));

test('denied wake locks are handled, and a pending lock is released after unmount', async (t) => {
  const document = new EventTarget();
  document.visibilityState = 'visible';
  globalThis.document = document;
  t.after(() => { delete globalThis.document; });
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: { wakeLock: { request: async () => { throw new Error('denied'); } } },
  });
  t.after(() => Object.defineProperty(globalThis, 'navigator', navigatorDescriptor));
  const warning = t.mock.method(console, 'warn', () => {});
  useWakeLock();
  let cleanup = effect();
  await flush();
  assert.equal(warning.mock.callCount(), 1);
  cleanup();

  let resolveRequest;
  navigator.wakeLock.request = () => new Promise((resolve) => { resolveRequest = resolve; });
  useWakeLock();
  cleanup = effect();
  cleanup();
  let releases = 0;
  resolveRequest({ release: async () => { releases++; } });
  await flush();
  assert.equal(releases, 1);
});
