---
description: Guía de estándares para pruebas de navegador y validación funcional.
---

# Testing Standards & Guidelines

Este documento define cómo deben comportarse los agentes de QA (como "Inspector") al realizar pruebas "Black Box" con el `browser_subagent`.

## 1. Selección de Elementos (Selectors)
La robustez de una prueba depende de cómo encuentras los elementos. Usa este orden de prioridad:

1.  **Semántica Estable**: `aria-label`, `role`, `placeholder`.
    *   *Bien*: `input[placeholder="Task Title"]`
2.  **Contenido de Texto** (si es único):
    *   *Bien*: `button:has-text("Save Changes")`
3.  **Clases Utilitarias** (Último recurso, frágil):
    *   *Evitar*: `div.flex.p-4.bg-red-500` (Cambiará si se rediseña).
    *   *Mejor*: Busca el contenedor padre estable y luego el hijo.

## 2. Estabilidad y Tiempos
Los humanos no hacen clic en 0ms. Los agentes tampoco deberían.
-   **Esperas explícitas**: No uses `sleep()`. Usa `waitForSelector()` o verifica que el elemento existe antes de interactuar.
-   **Feedback Visual**: Después de una acción (click), verifica que la UI cambió (ej: apareció un modal, el botón cambió de color) antes de seguir.

## 3. Idempotencia y Limpieza
-   **Nuevos Datos**: Al crear items (ej: "New Step"), usa nombres únicos o timestamps para evitar confundirlos con datos de pruebas anteriores (ej: "Step Test 12:05").
-   **No Destruir**: No borres datos seed o de producción a menos que sea parte explícita de la prueba de "Borrado".

## 4. Reporte de Fallos
Si un paso falla:
1.  **Captura**: Screenshot obligatorio del estado final.
2.  **Contexto**: ¿Qué paso falló? ¿Qué había en la pantalla? (Dump de texto visible).
3.  **No Asumir**: No digas "El backend falló". Di "El botón 'Guardar' no mostró feedback de éxito tras 5 segundos".
