# Directrices de Experiencia de Usuario (Golden UX Rules)

Este proyecto aspira a una calidad de interacción nivel **Brilliant.org/Duolingo**. La prioridad no es solo que funcione, sino que se *sienta* fluido, reactivo y gratificante.

## 1. Filosofía Dual

### Para el Creador (Editor)
*   **"No me hagas pensar"**: Las herramientas deben ser contextuales. Si selecciono una imagen, solo muéstrame opciones de imagen.
*   **Feedback Inmediato**: Cada acción (guardar, mover, borrar) debe tener una respuesta visual sutil (pero clara).
*   **Estado Seguro**: Autosave visible, Undo/Redo robusto siempre accesible.
*   **WYSIWYG Real**: Lo que veo en el editor debe ser idéntico al reproductor (1:1).

### Para el Consumidor (Player)
*   **Aprendizaje Activo**: Evita "Muro de Texto". El contenido debe ser "masticable" (Chunking).
*   **Recompensa por Progreso**: Barras de progreso, checks animados, transiciones satisfactorias al completar lecciones.
*   **Navegación Intuitiva**: Nunca debe haber duda de cómo avanzar o retroceder.
*   **Micro-interacciones**: Los elementos interactivos deben reaccionar al Hover/Active de forma "jugosa" (Juicy UI).

## 2. Heurísticas de Verificación

1.  **Regla de los 3 Segundos**: ¿Puede el usuario entender qué hacer en la pantalla en menos de 3 segundos?
2.  **Affordance**: ¿Los botones parecen botones? ¿Lo arrastrable tiene un "grip"?
3.  **Prevención de Errores**: ¿Es difícil cometer un error destructivo accidentalment? (Confirmaciones, Trash bin).
4.  **Consistencia**: ¿Los colores de acción (ej. Primary Purple) significan siempre lo mismo?

## 3. Estándares Técnicos de UX
*   **Performance**: Ninguna interacción debe bloquear el UI thread > 100ms.
*   **Layout Shift (CLS)**: Cero saltos visuales al cargar imágenes o fuentes.
*   **Accesibilidad (a11y)**: Todo debe ser navegable por tabulador (Keyboard focus visible).
