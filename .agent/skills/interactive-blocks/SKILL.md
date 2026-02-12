---
description: Guidelines for implementing complex interactive blocks (like Timelines, Carousels) in the Editor.
---
# Interactive Block Implementation Guidelines

This skill provides a checklist and best practices for creating complex, interactive blocks within the Editor. These blocks often have internal state (like a selected step or slide) that needs to be synced with the Editor's property sidebar.

## Core Principles

1.  **Clean Initial State**: Blocks should **never** load with a specific internal item selected by default unless explicitly intended. The initial view should be "neutral" to avoid implying user interaction.
2.  **Dual Selection Sync**: Clicking an internal item (e.g., a timeline step) must:
    *   Update the block's internal visual state (highlight the item).
    *   Update the block's metadata (so the Editor Sidebar knows what to edit).
    *   **Crucial**: Trigger the parent block's selection (`onClick` prop) so the Sidebar opens automatically.
3.  **One-Click Editing**: Users should be able to select and edit a specific internal item with a single click, without needing to select the container block first.

## Implementation Checklist

### 1. View Component (`BlockView.tsx`)

-   [ ] **Initialize with No Selection**: Use a `useRef` to track the first render and force the active index to `-1` (or `null`) on mount. This ignores any persisted metadata state that might cause "sticky selection" issues on reload.
    ```typescript
    const isFirstRender = React.useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            setActiveIndex(-1); // Force unselected state
            return;
        }
        // Only sync from metadata on subsequent updates
        if (block.metadata?.activeIndex !== undefined) {
             setActiveIndex(block.metadata.activeIndex);
        }
    }, [block.metadata?.activeIndex, block.id]);
    ```

-   [ ] **Handle Click Events**: The internal item's click handler must propagate the event up.
    ```typescript
    const handleItemClick = (index: number, e: React.MouseEvent) => {
        // 1. Update local visual state
        setActiveIndex(index);
        
        // 2. Sync with Metadata for Sidebar
        onUpdate({ metadata: { ...block.metadata, activeIndex: index } });
        
        // 3. Trigger Parent Block Selection
        if (e && onClick) {
            onClick(e); // This opens the sidebar if it wasn't open
        }
    };
    ```

### 2. Layout Component (`BlockLayout.tsx`)

-   [ ] **Pass Event Objects**: Ensure that any `onClick` props in your layout components accept and pass the original `React.MouseEvent`. This is required for `stopPropagation` and for the Editor to detect the click location correctly.

### 3. Data & Mocks

-   [ ] **Clean Mocks**: Ensure your mock data `metadata` does NOT include a pre-selected index (e.g., `activeIndex: 0`). It should be empty or explicitly `-1`.
-   [ ] **Resilient Types**: Make selection indices optional in your metadata interface (e.g., `activeIndex?: number`) to handle the "no selection" state gracefully.

## Common Pitfalls to Avoid

*   **Persisting Selection**: Don't just rely on `useEffect` to sync metadata -> state without a "first render" guard. This causes the last selected item to "stick" when the user navigates away and back.
*   **Swallowing Events**: Avoid `e.stopPropagation()` in child components unless you are explicitly handling the selection logic yourself. If you do stop propagation, you MUST manually trigger the parent's `onClick`.
