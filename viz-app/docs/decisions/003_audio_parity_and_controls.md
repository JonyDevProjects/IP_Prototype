# ADR 003: Real-time Audio Controls & Feature Parity

**Date:** 2026-02-06
**Status:** Accepted

## Context
Initial implementation of audio controls (speed/volume) was fragmented. `TextBlock` had controls, but `StepBlock` and `AlertBlock` were missing them. Additionally, changing settings caused the audio to restart from the beginning, creating a poor user experience. Unit tests were flaky due to incorrect browser API mocking.

## Decision
1.  **Universal Audio Props:** All blocks in the registry MUST accept and utilize `rate` and `volume` props.
2.  **Resume-on-Change Pattern:** Implementing specific logic in TTS hooks (using `charIndex` tracking via `onboundary` events) to allow resuming playback from the current word when settings change, rather than restarting.
3.  **Strict Testing Strategy:** Adopting a strict mocking strategy for `SpeechSynthesisEvent` in unit tests (using plain objects) to ensure tests run reliably in Node/Vitest environments.
4.  **System-Wide Rules:** Updating `GOLDEN_RULES.md` to mandate feature parity checks when adding global props.

## Consequences
*   **Positive:** "Premium" feel for audio controls. Users can adjust speed mid-paragraph without interruption. Consistent behavior across all content types.
*   **Negative:** Increased complexity in block components (need to track state). Slightly more complex unit tests.

## Compliance
New blocks must demonstrate "Resume-on-change" capability to be accepted into the registry.
