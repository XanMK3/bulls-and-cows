# JavaScript

- Use `??` for defaults when `0`, `false`, or `""` are valid values; use `||` only when all falsy values should fall back.
- Never leave async work accidentally unobserved: return/await promises and handle rejections. Avoid `forEach(async ...)`; use `for...of` for sequential work or `Promise.all` for independent work.
- Choose `Promise.allSettled` when partial failure is an intended outcome; don't silently discard failures.
- Validate untrusted values at boundaries (HTTP, storage, messages, user input) before relying on their shape.
- Cancel superseded requests or subscriptions when supported (for example, with `AbortController`) and prevent stale results from replacing newer state.
- Keep shared modules free of surprising import-time side effects; initialize resources explicitly where practical.
