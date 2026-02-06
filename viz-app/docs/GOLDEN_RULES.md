# Golden Rules & Core Architecture

This document serves as the **SINGLE SOURCE OF TRUTH** for architectural decisions, coding standards, and critical workflows in the `IP_Prototype` project.

## 1. Text-to-Speech (TTS) Architecture
**Goal:** Seamless, uninterrupted playback of modular learning content.

*   **Orchestration:** `useUnitAudio` is the central conductor. It manages the global playlist but *delegates* the actual speech synthesis to individual components.
*   **Virtual Blocks:** The Playlist injects a virtual `'intro'` block at the start to ensure the Title and Description are read before any content blocks.
*   **Sequential Handoff (The "Golden Handshake"):**
    *   **Rule:** A block MUST trigger `onTTSComplete` when it finishes speaking.
    *   **Rule:** The Player listens for `onTTSComplete`, updates `activeBlockId`, and the next block automatically starts because it receives `playMode='auto'`.
*   **Lifecycle Management (Critically Important):**
    *   **Scenario:** Transitioning effectively "unmounts" the Intro audio logic.
    *   **Rule:** The cleanup function in `useTextSequence` (or any TTS hook) MUST check if the completion was *natural* (`isCompleteRef.current === true`).
    *   **Rule:** **NEVER** indiscriminately call `speechSynthesis.cancel()` on unmount/update unless the user explicitly paused/stopped the playback. Doing so kills the *next* block's audio that just started queueing.

## 2. Block Registry Pattern
**Goal:** Scalable addition of new content types (`timeline`, `text`, `quiz`, etc.) without modifying core Player/Editor files.

*   **Definition:** Each block type (e.g., `TextBlock.tsx`) must export a `BlockDefinition` object containing:
    *   `type`: Unique string ID.
    *   `Component`: The React component for rendering.
    *   `createBlock`: Factory function for new instances.
*   **Player Compatibility:**
    *   **Rule:** ALL Block Components MUST accept and handle the following props to work in the Player:
        *   `playMode?: 'auto' | 'manual'`
        *   `onTTSComplete?: () => void`
        *   `highlightItemId?: string | null`
    *   **Rule:** If a block contains text (like paragraphs), it MUST implement logic to extract that text and speak it when `playMode === 'auto'`, then call `onTTSComplete`.
    *   **Rule (Parity):** When adding a global feature (e.g., `rate`, `volume`), verification MUST be done across ALL block types in the registry.
    *   **Rule (Real-Time Audio):** Audio settings (volume, speed) must apply instantly without restarting the block. Implement "Resume-on-Change" logic using character tracking.

## 3. Data Structure (Mocks & State)
*   **Hierarchy:** `Chapter` -> `Module` -> `Unit` -> `Block`.
*   **Blocks:** All content is a `ContentBlock`.
    *   `id`: Unique UUID.
    *   `type`: Must match a registry key.
    *   `content`: Can be a string (HTML), an object (JSON for complex blocks), or a reference.

## 4. UI/UX Standards
*   **Highlighting:**
    *   **Rule:** Any element currently being read by TTS MUST have a visual indicator.
    *   **Standard:** Use `ring-2 ring-[#7f13ec]/20` (purple border) for blocks/cards.
    *   **Standard:** Text elements (Title/Desc) change color to `#7f13ec` (Purple).
*   **Responsive:** All blocks must handle mobile/desktop layouts gracefully.

## 5. Agent Workflow
*   **Before Coding:** ALWAYS check `viz-app/src/data/mocks` to understand the data structure you are working with.
*   **Before Modifying TTS:** Review `useTextSequence.ts` to understand the queue/cancellation logic. Avoid introducing race conditions.
*   **Testing:**
    *   **Rule:** Tests for TTS features MUST use mock objects for `SpeechSynthesisEvent` (`{ charIndex: 5, name: 'word' }`) to avoid environment errors in Vitest.
    *   **Rule:** Tests MUST verify that audio is NOT cancelled indiscriminately on unmount unless clearly intended.
