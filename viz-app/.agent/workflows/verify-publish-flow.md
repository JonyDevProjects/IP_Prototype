---
description: Verify that content created in the Editor is successfully published and visible in the Player.
---

1.  **Setup**:
    *   Ensure the application is running (`npm run dev`).
    *   Open the Browser Tool to `http://localhost:5173`.
    *   Switch to **Editor View**.

2.  **Create Content**:
    *   Add a new **Text Block**.
    *   Enter unique content string (e.g., "Verification Text [TIMESTAMP]").
    *   (Optional) Formatting: Apply Bold or Heading styles.

3.  **Publish**:
    *   Click the **"Preview"** (or new "Save/Publish") button in the Editor Toolbar.
    *   *Observation*: Verify visual feedback (Toast or "Saved" indicator).

4.  **Verify in Player**:
    *   Switch to **Player View** (using the dev toggle or UI navigation).
    *   Navigate to the same Unit where content was added.
    *   **Check**: Does the new block appear?
    *   **Check**: Does the content match exactly?

5.  **Persistence Check (Optional)**:
    *   Reload the page.
    *   Check if changes persist.
