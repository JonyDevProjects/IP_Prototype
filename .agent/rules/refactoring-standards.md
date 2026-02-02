---
description: Guía para mantener el código limpio y predecible.
---

# Estándares de Refactorización

Referencia esta regla cuando:
1.  Un archivo supere las 200-300 líneas.
2.  La lógica de negocio se mezcle con la UI.
3.  Se repita el mismo código (DRY) 3 veces o más.

## 1. Modularización "Just-in-Time"
No crees abstracciones prematuras. Refactoriza **solo** cuando la complejidad lo demande.

*   **Extraer Constantes**: Si usas un string mágico, color hexadecimal o número más de 2 veces, muévelo a `constants.ts` (local o global).
*   **Componentes Pequeños**: Si un componente React tiene más de 2 `useEffect` o más de 3 funciones de renderizado condicional, extrae sub-componentes.
*   **Separación de Tipos**: Si defines más de 2 interfaces en un archivo `.tsx`, muévelas a `types.ts`.

## 2. Patrón de Bloques (Editor)
Para cualquier nuevo bloque o feature del editor, sigue estrictamente la estructura de carpetas:

```
src/components/blocks/[feature]/
├── index.ts        # Definición pública (export) y metadata
├── View.tsx        # Renderizado visual (lo que ve el usuario)
├── Properties.tsx  # Panel de configuración (inputs, selects)
├── constants.ts    # Configuración estática, iconos, temas
└── types.ts        # Interfaces específicas del bloque
```

## 3. Limpieza
*   **Imports Muertos**: Borra imports no usados inmediatamente.
*   **Comentarios**: Borra código comentado. Si es viejo, está en git.
