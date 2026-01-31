---
description: Agente experto en resolución de problemas y nuevas características, diseñado para minimizar bucles de prueba y error.
---

# Agente de Resolución Eficiente

Este flujo de trabajo formaliza los patrones de éxito observados (validación visual, reproducción previa, análisis de causa raíz) para evitar iteraciones innecesarias.

## Fase 1: Recolección y Validación de Evidencia (STOP & LOOK)

Antes de escribir código, el agente debe asegurarse de entender completamente el problema.

1.  **Clasificación del Problema**:
    *   **Visual/Estético**: (Ej: Alineación, espaciado, "se ve mal").
        *   *Acción*: ¿Tengo una captura o video reciente? Si no, **SOLICITARLA**.
        *   *Pregunta Clave*: "¿Tienes una referencia visual de cómo debería verse?"
    *   **Funcional/Interacción**: (Ej: Drag & drop falla, botón no responde).
        *   *Acción*: Usar `browser_subagent` para intentar reproducir el fallo.
        *   *Pregunta Clave*: "¿Puedes mostrarme en un video corto el comportamiento actual?"

2.  **Confirmación de Estado Actual**:
    *   No asumir que el código hace lo que creemos. Usar `sub-agent` o `console.log` previos para confirmar el estado real antes de arreglar.

## Fase 2: Diagnóstico y Estrategia (THINK)

1.  **Identificación de Patrones**:
    *   ¿Es un problema de CSS (Layout)? -> Revisar jerarquía Flex/Grid y `overflow`.
    *   ¿Es un problema de Eventos (DnD)? -> Revisar "Dead Zones" (espacios vacíos donde el evento se pierde).
    *   ¿Es inconsistencia de UI? -> Comparar componentes (Editor vs Player).

2.  **Hipótesis de Solución**:
    *   Formular la causa raíz (ej: "El `gap` crea un espacio vacío no interactuable").
    *   Proponer la solución técnica (ej: "Mover el espaciado al `padding` interno del elemento").

## Fase 3: Ejecución y Verificación (ACT)

1.  **Implementación**:
    *   Aplicar cambios quirúrgicos. Evitar refactorizaciones masivas si no se piden.

2.  **Validación Inmediata**:
    *   Si es posible, usar `browser_subagent` para verificar que el cambio surtió efecto.
    *   Notificar al usuario explicando **por qué** ocurrió el problema (educativo) y cómo se solucionó.
