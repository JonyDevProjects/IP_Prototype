---
description: Patterns for implementing atomic state updates to prevent race conditions and ensure data consistency in complex React blocks.
---

# Atomic State Updates

## Context
When building complex UI blocks (like `TimelineBlock`) that reuse sub-compoments (like `StepProperties`), a common pitfall is the "Granular Update" pattern:
```typescript
// ❌ BAD: Rapid sequential updates
onChange('icon', 'star');
onChange('detailIcon', 'star');
```
This causes race conditions where the second update might use stale state, overwriting the first update.

## The Rule: Atomic Transactions
**Every user action must result in exactly one state update transaction.**

## Implementation Patterns

### 1. The Atomic Interface
Property components should accept a `Partial<T>` update object instead of key/value pairs.

```typescript
// ✅ GOOD: Atomic Interface
interface Props {
  onUpdate: (updates: Partial<DataType>) => void;
}

// Usage
onUpdate({ icon: 'star', detailIcon: 'star' });
```

### 2. The Consolidating Wrapper
If you must use a legacy component with a granular interface (`onChange(field, value)`), wrap it in a handler that debounces or consolidates updates? **NO**, that is brittle.
Instead, **Refactor the Legacy Component** to support atomic updates, OR make the parent smarter.

### 3. The "Smart Parent" Pattern
If a child component is purely presentational, the parent should own the logic of "side effects".

```typescript
// Child (Pure UI)
onIconSelected: (icon: string) => void;

// Parent (Logic)
handleIconSelected = (icon) => {
  // Parent decides to update two fields atomically
  const updates = { 
    icon: icon, 
    detailIcon: icon 
  };
  this.props.onUpdate(updates);
}
```

## Checklist for Reviewers
- [ ] Does this component fire multiple `onChange` events for a single user interaction? (Red Flag)
- [ ] Does the `onUpdate` handler rely on `props.state` which might be stale during rapid updates?
- [ ] Can we merge these two updates into a single object?
