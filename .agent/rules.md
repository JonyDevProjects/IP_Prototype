# Project Rules & Efficiency Protocols

## 1. Visual Budget Protocol
**Goal**: Reduce unnecessary token consumption from browser automation.
*   **Rule**: **Local Verification First**. Do not use the `browser_subagent` for every small CSS change. Verify logic via unit tests or code review first.
*   **Rule**: **Batch Visual Changes**. Group related visual tasks (e.g., Layout + Spacing + Colors) into a single verification run. Do not verify each property individually.
*   **Threshold**: If you find yourself running the browser more than twice in 10 steps, **STOP** and re-assess your approach.

## 2. State Audit Workflow
**Goal**: Prevent regression bugs in interactive components.
*   **Rule**: **Audit Before Style**. Before styling any interactive component (Timeline, Tabs, Accordion), you MUST audit its state management.
*   **Checklist**:
    1.  Where does the state live? (Local vs. Global vs. Props)
    2.  Does it persist independently? (Should it?)
    3.  Does it reset correctly on view changes/unmount?
*   **Action**: If a component has complex state, create a small "State Refactor Plan" *before* writing any CSS.

## 3. Anti-Stagnation
*   **Rule**: If you edit the same file 3 times without success, **STOP**. Re-read the file content, check for syntax errors, or ask for clarification. Do not "brute force" fixes.
