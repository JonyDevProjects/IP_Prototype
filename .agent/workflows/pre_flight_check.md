---
description: Standard procedure to run BEFORE launching expensive browser tests or requesting user review.
---

# Pre-Flight Check Workflow

**Purpose**: catch stupid errors (syntax, imports, types) fast, so effective testing time isn't wasted on compilation failures.

## Steps

1.  **Static Analysis (Type Check)**:
    *   Run `npx tsc --noEmit` to verify type safety.
    *   // turbo
    *   Fix any *new* errors introduced by your changes. (Ignore legacy errors if unrelated).

2.  **Linter Check**:
    *   Run `npm run lint` (if available) or check IDE linter feedback.
    *   Focus on `no-unused-vars`, `missing-imports`, and `react-hooks/exhaustive-deps`.

3.  **Unit Test Smoke**:
    *   Run `npm test` solely for the component you modified.
    *   Example: `npm test -- useStepTTS`
    *   // turbo

4.  **Browser Launch Decision**:
    *   Only if steps 1-3 pass, proceed to launch `browser_subagent`.

## Auto-Fix Protocol
*   If `tsc` reports "Cannot find module", CHECK YOUR IMPORTS immediately. Do not guess.
*   If `tsc` reports "Property does not exist", check the Interface definition.
