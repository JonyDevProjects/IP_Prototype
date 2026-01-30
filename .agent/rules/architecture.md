# Arquitectura Basada en Funcionalidades (Feature-Based Architecture)

Este proyecto sigue una estructura de directorios estricta para mantener la escalabilidad y el desacoplamiento. Todos los agentes deben adherirse a estas reglas:

## 1. Directorios de Componentes

### `src/components/` (Componentes Globales/Compartidos)
- **Uso**: Componentes agnósticos al contexto que se reutilizan en múltiples funcionalidades.
- **Ejemplos**: `Button`, `Input`, `Modal`, `TimelineBlock` (si es el mismo para Editor y Player), `Layout` base.
- **Regla**: No deben importar nada de `src/features/`.

### `src/features/editor/components/` (Exclusivo del Editor)
- **Uso**: Componentes que solo existen o tienen sentido dentro del contexto de edición.
- **Ejemplos**: `Sidebar`, `PropertyPanel`, `DraggableWrapper`, `EditorToolbar`.
- **Regla**: Pueden importar de `src/components/` pero NO de `src/features/player/`.

### `src/features/player/components/` (Exclusivo del Player)
- **Uso**: Componentes para la visualización final y reproducción.
- **Ejemplos**: `PlayControls`, `ProgressBar`, `NavigationArrows`.
- **Regla**: Pueden importar de `src/components/` pero NO de `src/features/editor/`.

## 2. Reglas de Importación
- **Flujo Unidireccional**: `Features` -> `Components`.
- **Aislamiento**: Las `Features` no deben depender entre sí directamente. Si algo debe compartirse entre dos features, debe promoverse a `src/components/` o `src/services/`.

## 3. Proceso de Verificación
Antes de finalizar cualquier tarea, se debe verificar que ningún componente nuevo haya sido colocado en el lugar incorrecto.
