---
trigger: always_on
---

# SaaS Clean Architecture Rules

### 1. Engine vs Content Separation
- **The Engine (`src/engine`)**: Contains the logic to render content (CourseRenderer). It MUST NOT contain hardcoded courses, business logic for specific clients, or "Theme" specific code.
- **The Content (`src/data/mocks`)**: All course structure and text must reside in JSON files or TypeScript objects here.
- **The Registry (`src/registry`)**: The bridge between Engine and Content. Maps string IDs to Components.

### 2. Type Safety & Validation (Zod)
- All external data (JSON manifests) MUST be validated with Zod schemas at runtime before being passed to the Renderer.
- Interfaces in `src/types` should be inferred from Zod schemas where possible.

### 3. Component "LEGO" Principle
- Components in the registry must be:
    - **Self-contained**: No external dependencies on global state.
    - **Configurable**: Behavior controlled via props, not hardcoded.
    - **Styling**: Use Tailwind CSS properties passed via props (e.g. `className` overrides).

### 4. Mock-First Development
- When developing a new feature, ALWAYS update or create a Mock Manifest in `src/data/mocks` to demonstrate it.
- Never test against a blank canvas.
