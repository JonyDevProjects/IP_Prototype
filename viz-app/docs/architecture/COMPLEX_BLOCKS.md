# Complex Block Architecture & Consolidation

## Overview
A "Complex Block" is a block that acts as a container for other blocks (e.g., Carousel, Timeline, Accordion). Instead of effectively rebuilding a "page builder" inside a block, we follow a strict lifecycle to ensure maintainability and UX quality.

## The Pattern: Prototype -> Validate -> Consolidate

### 1. Prototyping (Flexibility)
*   **Structure:** Generic array of `blocks`.
*   **UX:** Allow Drag & Drop of any registered block type.
*   **Goal:** Discover what combination of blocks makes sense for this feature.

### 2. Validation (Standardization)
*   **Decision:** Identifies the "Standard Unit".
    *   *Example:* "A Carousel Slide is ALWAYS an Image + Optional Text."
    *   *Example:* "A Timeline Step is ALWAYS a Title + Summary + Card collection."

### 3. Consolidation (UX Hardening)
This is the critical step for production-ready blocks.

*   **Lock the Structure:**
    *   Disable Drag & Drop in the component View.
    *   Remove "Drop Zones" and dashed borders.
    *   The View should look 1:1 like the Player (WYSIWYG).
*   **Unified Properties Panel:**
    *   Do NOT ask users to select inner blocks to edit them.
    *   Expose top-level fields in the Sidebar that map to inner blocks.
    *   *Example:* A "Slide Image" input in the main sidebar updates the inner `ImageBlock`.
*   **State Sync:**
    *   Ensure navigation in the View (Next/Prev buttons) updates the selection in the Sidebar.
    *   Ensure selection in the Sidebar updates the View.

## References
*   [Consolidation Skill](../../.agent/skills/complex_block_consolidation/SKILL.md)
*   [Carousel Implementation](../../src/components/blocks/carousel)
*   [Timeline Implementation](../../src/components/blocks/timeline)
