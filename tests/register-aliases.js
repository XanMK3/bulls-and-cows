import { registerHooks } from 'node:module';

// Resolve the application aliases used by the Node regression tests.
const aliases = new Map([
  ['utils', new URL('../src/utils/index.js', import.meta.url).href],
  ['const', new URL('../src/const/index.js', import.meta.url).href],
]);

registerHooks({
  resolve(specifier, context, nextResolve) {
    return nextResolve(aliases.get(specifier) ?? specifier, context);
  },
});
