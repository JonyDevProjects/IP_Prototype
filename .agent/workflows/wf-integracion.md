---
description: Standard workflow for implementing and integrating new features safely.
---

# Workflow de Integración (Integration Lifecycle)

**Goal**: Deliver high-quality, verified code by following a strict cycle.

## Steps

### 1. Planning (PLANNING Mode)
-   **Context**: Read current state and relevant files.
-   **Design**: Create/Update `implementation_plan.md`.
-   **Review**: Notify user for approval.

### 2. Implementation (EXECUTION Mode)
17. **Scaffold**: Create directory structures and types first. Follow `.agent/rules/architecture.md`.
18. **Modularize**: Implement logic in small, separate files. Use `src/features/[feature]/components` for feature-specific logic.
-   **Integrate**: Wire up the modules to the main system.

### 3. Verification (VERIFICATION Mode)
22. **Turbo Check**: If applicable, run automated tests.
23. **Arch Check**: Activate `/sub-agente-arquitecto-verificador` to ensure structure compliance.
24. **UX Check**: Activate `/sub-agente-ux-expert` to review interaction quality (animations, feedback, ease of use).
25. **Browser Check**: Use the `browser_subagent` to visually verify:
    -   Does it render?
    -   Is it interactive?
    -   Does it break existing features?
-   **Documentation**: Update `walkthrough.md` with proof of functionality (screenshots/recordings).

### 4. Completion
-   **Notify**: Inform the user with a summary of what was done and verified.
