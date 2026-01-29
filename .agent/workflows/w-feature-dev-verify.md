---
description: Workflow for implementing new interactive features with mandatory Browser Agent verification.
---

# Workflow: Feature Development & Verification

This workflow standardizes the process of building interactive SaaS features, ensuring that every new UI element is verified by an agent before being marked as done.

## Phase 1: Planning & Context
1.  **Define State & Interface**:
    -   Update `types` (e.g., `CourseTypes.ts`) with Zod schemas.
    -   Define Context actions (e.g., `EditorContext.tsx`).
2.  **Implementation Plan**:
    -   Create/Update `implementation_plan.md`.
    -   **CRITICAL**: Add a "Verification Plan" section. Define exactly *what* the Browser Agent should look for (e.g., "Click button X, verify text Y appears").

## Phase 2: Implementation (Iterative)
1.  **Skeleton**: Create components with basic UI.
2.  **Logic**: Implement state updates and event handlers.
3.  **Integration**: Connect components to the Context/Store.

## Phase 3: Automated Verification
> [!IMPORTANT]
> Never assume it works. Always verify.

1.  **Pre-Flight Check**:
    -   Run `npm run dev` (if not running).
    -   Check for console errors or compilation issues using `view_file` on entry points (like `App.tsx`).
2.  **Browser Agent Execution**:
    -   Use `browser_subagent` to execute the "Verification Plan".
    -   Instruct the agent to:
        -   Navigate to the local URL.
        -   Perform the user interaction (Click, Drag, Type).
        -   Capture a Screenshot of the result.
3.  **Fix & Retry**:
    -   If the agent reports failure (or if the screenshot shows issues), fix the code.
    -   **Re-run the Browser Agent** until it passes.

## Phase 4: Documentation
1.  **Update Walkthrough**:
    -   Embed the "Success Screenshot" from the browser agent into `walkthrough.md`.
    -   Briefly explain the feature and how it was verified.
2.  **Clean Up**:
    -   Remove temporary logs or test data (if any).
