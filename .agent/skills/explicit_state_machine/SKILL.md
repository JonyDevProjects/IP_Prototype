---
name: Explicit State Machine Pattern
description: Guide for implementing robust state management in complex interactive components using Explicit State Machines instead of boolean flags.
---

# Skill: Explicit State Machine Pattern

**Problem**: Using multiple boolean flags (e.g., `isPlaying`, `isPaused`, `isEnded`, `autoPlay`) leads to "Impossible States" (e.g., `isPlaying=true` AND `isPaused=true`) and complex `useEffect` triggers that cause bugs like "Stop Zombie" or "Resume Skip".

**Solution**: Use a single source of truth for the state, defined by a union type.

## Pattern Definition

### 1. Define the State
Instead of booleans, define a specific type for the machine's state.

```typescript
type PlaybackState = 
  | 'IDLE'      // Initial state, nothing happening
  | 'PLAYING'   // Actively progressing
  | 'PAUSED'    // Halted by user, intends to resume
  | 'ENDED'     // Finished naturally
  | 'FAILED';   // Error state
```

### 2. Define the Action (Transitions)
Define what *can* happen to change the state.

```typescript
type PlaybackAction = 
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'STOP' }
  | { type: 'FINISH' }
  | { type: 'ERROR', payload: Error };
```

### 3. The Reducer (The Brain)
Centralize logic. The reducer decides if a transition is valid.

```typescript
function playbackReducer(state: PlaybackState, action: PlaybackAction): PlaybackState {
  switch (action.type) {
    case 'PLAY':
      // Cannot play if module is failed? Or maybe retry? 
      return 'PLAYING'; 
    case 'PAUSE':
      // Can only pause if currently playing
      return state === 'PLAYING' ? 'PAUSED' : state;
    case 'STOP':
      return 'IDLE'; 
    default:
      return state;
  }
}
```

## Implementation Rules (The "Golden Rules")

1.  **Never Derived Booleans for Control Logic**: You can derive variables for *rendering* (`const showPauseIcon = state === 'PLAYING'`), but NEVER use them for control logic (`useEffect(() => { if (isPlaying) ... })`). Use the state enum directly.
2.  **Reset on Stop, Persist on Pause**:
    *   **Pause**: Transition to `PAUSED`. Keep internal counters/indexes intact.
    *   **Stop**: Transition to `IDLE`. Reset internal counters/indexes to 0.
    *   *Why?* This distinguishes the user's intent clearly.
3.  **One `useEffect` to Rule Them All**:
    *   Instead of many `useEffect` watching different booleans, have one main effect that reacts to `state` changes.
    *   ```typescript
        useEffect(() => {
          if (state === 'PLAYING') {
            triggerAudio();
          } else if (state === 'PAUSED' || state === 'IDLE') {
            cancelAudio();
          }
        }, [state]);
        ```

## When to use this Skill
*   Media Players (Audio/Video).
*   Game loops.
*   Complex Multi-step Wizards.
*   Any component where `useState(true)` appears more than 3 times for related logic.
