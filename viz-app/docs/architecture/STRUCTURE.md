
# Estructura de Directorios - ExpertPath (Feature-Based Architecture)

El proyecto sigue una arquitectura modular basada en "Features" para garantizar escalabilidad, mantenibilidad y una clara separación de responsabilidades.

## Estructura del Código (`viz-app/src/`)

```text
src/
├── assets/           # Recursos estáticos (imágenes, fuentes, iconos globales)
├── components/       # Componentes REUTILIZABLES y GENÉRICOS (UI Library)
│   ├── ui/           # Átomos y Moléculas (Botones, Inputs, InlineText, Cards)
│   └── blocks/       # Definiciones de bloques (Plugins)
│       ├── registry.ts # Registro central
│       └── timeline/   # Ejemplo de Bloque Modular (View + Properties + Types)
├── data/             # Datos estáticos y Mocks
│   └── mocks/        # Datos de ejemplo (JSON) para desarrollo y testing
├── features/         # Módulos de Negocio (El corazón de la aplicación)
│   ├── editor/       # Feature: Panel de Creación de Contenido
│   │   ├── components/ # EditorMain, ToolButton, EditorBlockWrapper
│   │   └── hooks/      # Lógica de estado, drag & drop, undo/redo
│   └── player/       # Feature: Modo de Consumo (Estudiante)
│       └── components/ # PlayerMain, PlayerSidebar, ProgressBar
├── hooks/            # Custom hooks globales
├── types/            # Definiciones de tipos TypeScript e Interfaces (El Contrato)
│   └── course.ts     # Tipos core: Course, Module, Unit, Block
├── App.tsx           # Orquestador principal y router de vistas
└── main.tsx          # Punto de entrada de la aplicación
```

---

## Justificación de la Arquitectura

### 1. Features vs UI Components
*   **`components/ui/`**: Contiene elementos visuales puros y genéricos (ej. un botón que solo recibe `onClick` y `label`). No conocen nada sobre el negocio o los cursos.
*   **`features/`**: Contiene la lógica pesada. `EditorMain` sabe cómo manipular un objeto `Course`, cómo manejar el auto-guardado y cómo interactuar con el sistema de drag & drop. Separar esto permite que el diseño visual evolucione sin romper la lógica funcional.

### 2. El Registro de Bloques (`components/blocks/`)
Usamos un **Patrón Registry** para evitar que el Editor o el Player se vuelvan monolitos gigantes. 
*   Cada bloque (ej. `TimelineBlock`) define sus propios componentes de visualización y de propiedades.
*   Añadir un nuevo tipo de contenido es tan simple como registrarlo en `registry.ts`.

### 3. La Capa de Tipos (`types/`) - El Contrato
Definimos el "lenguaje común" aquí. Tanto el creador de contenido como el consumidor operan sobre las mismas interfaces (`Course`, `Module`, `Unit`). Esto facilita la futura integración con un Backend real (Supabase, Firebase, Node.js).

### 4. Servicios y Abstracción de Datos
Los componentes nunca importan JSONs directamente. Usan servicios que encapsulan la obtención de datos.
*   *Beneficio:* El día que conectemos una base de datos real, solo cambiaremos la implementación del servicio, no los componentes.

---

## Reglas de Oro del Proyecto
1.  **No Cross-Feature Imports**: Un componente en `features/player` NUNCA debe importar nada de `features/editor`. Comparten tipos y componentes de UI, pero no lógica.
2.  **Aesthetics First**: Cada cambio visual debe pasar por una revisión de UX para asegurar una sensación "Premium" tipo Brilliant.org.
3.  **Semantic HTML**: Usar siempre etiquetas semánticas y ARIA para accesibilidad.
