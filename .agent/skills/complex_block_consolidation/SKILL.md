---
name: Complex Block Consolidation
description: Guide for transitioning "Complex Blocks" (nested compositions) from a generic prototyping phase to a consolidated, production-ready implementation.
---

# Complex Block Consolidation Pattern

This skill outlines the workflow for evolving a complex block (like a Carousel or Timeline) from a generic "Container of Inner Blocks" into a streamlined, user-friendly component with a dedicated editing experience.

## The Lifecycle of a Complex Block

1.  **Phase 1: Prototyping (Composition)**
    *   **Goal:** Rapidly validate validity and composability.
    *   **Structure:** A generic container (e.g., `Carousel`) that holds an array of `blocks` (e.g., `ImageBlock`, `TextBlock`).
    *   **UX:** Users drag-and-drop simple blocks into the container.
    *   **Properties:** Generic "Nested Block Selection" (Proxy Mode). The container just delegates to the inner block's properties.

2.  **Phase 2: Validation**
    *   **Goal:** Confirm the "Standard Structure".
    *   **Decision:** "Okay, a Carousel Slide *always* has 1 Image and 1 Description."
    *   **Action:** Lock down the structure. Users shouldn't need to manually assemble every slide.

3.  **Phase 3: Consolidation (The Pattern)**
    *   **Goal:** Optimize UX for productivity and consistency.
    *   **Implementation Steps:**

    ### A. Pre-fill Content (The Factory)
    Modify the `createBlock` function in the Block Definition. Instead of an empty container, initialize it with the standard set of inner blocks.

    ```typescript
    // BEFORE
    createBlock: (id) => ({ ..., content: [], ... })

    // AFTER
    createBlock: (id) => ({
        ...,
        content: [
            createSlide({
                 blocks: [
                     { type: 'image', content: defaultImage },
                     { type: 'text', content: defaultText }
                 ]
            })
        ]
    })
    ```

    ### B. Abstract the Properties (The Facade)
    Replace the generic "Nested Block Proxy" in `<Block>Properties.tsx` with a unified form that maps inputs directly to the specific inner blocks.

    *   **Hide the complexity:** The user sees "Slide Image URL", not "Edit Inner Block > Image Properties".
    *   **Logic:**
        1.  `activeSlide` -> `blocks.find(b => b.type === 'image')`
        2.  Bind Input value to the found block's content.
        3.  On Change -> Map the update back into the nested structure.

    ### C. Lock the View (Optional)
    *   In `Phase 1`, you might allow dropping any block.
    *   In `Phase 3`, you might disable Drag-and-Drop or validate that only specific types are allowed, or rely entirely on the Properties panel for content management.
### Phase 4: Consolidation & Refinement

Once the block's structure and behavior are proven, "solidify" the UX by removing prototyping scaffolding.

1.  **Lock the Structure:**
    *   Disable Drag & Drop handlers in the View if the block structure is fixed (e.g., specific slots for Image/Text).
    *   Remove "Drop Zone" placeholders.

2.  **Clean the UI:**
    *   Remove dashed borders used for prototyping layout areas.
    *   Remove inline "Delete" buttons for sub-blocks; move structural control to the **Properties Panel**.
    *   Ensure the View looks exactly like the final Player experience (WYSIWYG).

3.  **Refine Properties:**
    *   Use toggles (e.g., "Show Description") to control optional sub-blocks instead of relying on the user to manually add/delete them.
    *   Ensure the Properties panel is the single source of truth for structural changes.

## When to use this Skill?
*   When a "Container Block" feels too clunky to edit.
*   When you find users repeating the same composition pattern (e.g., always adding an Image + Title to every card).
*   When you want to enforce a strict design system (e.g., "Testimonials must have an Avatar, Name, and Quote").

## Example: Timeline vs Carousel
*   **Timeline:** Consolidatd. Has specific fields (`title`, `summary`, `cards`) that map to a strict JSON structure.
*   **Carousel:** Hybrid. Uses nested blocks (Image/Text) but presents a Consolidated UI to edit them, preserving the architectural flexibility of "Blocks" while simplifying the user interaction.
