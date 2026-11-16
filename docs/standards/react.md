# React / JSX

- Compute values from props/state during render; don't duplicate them in state or synchronize them with an Effect.
- Use Effects to synchronize with external systems, not to implement event handlers or ordinary data flow. Clean up subscriptions and guard against stale async results.
- Keep transient state near the components that own it; store stable identifiers instead of duplicated objects when other data can be derived.
- Keep render pure. Don't mutate props/state or create component definitions inside another component's render.
- Use stable keys for changing lists; change a component's `key` intentionally when its local state should reset.
- Prefer semantic controls, accessible names, and keyboard-operable behavior over click handlers on generic elements.
- Add `memo`, `useMemo`, and `useCallback` for a measured bottleneck or a specific identity contract—not automatically everywhere.
