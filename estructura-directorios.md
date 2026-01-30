
src/
├── assets/ # Imágenes estáticas, fuentes, iconos globales
│ └── images/
├── components/ # Componentes REUTILIZABLES y GENÉRICOS (Atomic Design)
│ ├── ui/ # "Átomos" y "Moléculas": Botones, Inputs, Cards, Badges
│ │ ├── Button.tsx
│ │ ├── Card.tsx
│ │ └── ThemeToggle.tsx
│ ├── layout/ # Estructuras maestras (Shells)
│ │ ├── EditorLayout.tsx
│ │ ├── PlayerLayout.tsx
│ │ └── Sidebar.tsx
│ └── feedback/ # Modales, Toasts, Loaders, Alertas
├── data/ # Zona del "Scribe" (Datos estáticos y Mocks)
│ ├── mocks/ # Aquí vive el contenido del Tema 2 transformado a JSON
│ │ └── tema2Mock.ts
│ └── locales/ # Textos fijos (i18n) si aplicara
├── features/ # Módulos de Negocio (El corazón de ExpertPath)
│ ├── editor/ # Lógica específica del Creador
│ │ ├── components/ # Componentes que solo usa el editor (ej. DraggableBlock)
│ │ └── hooks/ # Lógica de estado del editor (undo/redo)
│ ├── player/ # Lógica específica del Estudiante
│ │ ├── components/ # Componentes de visualización (ej. ProgressBar, QuizRunner)
│ │ └── hooks/ # Lógica de progreso y scoring
│ ├── auth/ # Login, Registro, Recuperación (Futuro)
│ └── dashboard/ # Vista principal de cursos (Futuro)
├── hooks/ # Hooks globales y genéricos
│ ├── useTheme.ts
│ └── useDebounce.ts
├── lib/ # Utilidades puras y configuraciones de terceros
│ ├── utils.ts # Helpers de formateo, clases de Tailwind (cn)
│ └── constants.ts # Constantes globales
├── services/ # Comunicación con API (Patrón Repositorio)
│ ├── api.ts # Cliente Axios/Fetch
│ └── courseService.ts # Métodos: getCourse, saveProgress (Ahora usan mocks)
├── types/ # Zona del "Arquitecto" (Contratos e Interfaces)
│ ├── course.ts # Definiciones de Module, Unit, Block
│ └── user.ts
├── App.tsx # Router principal y selectores de vista
└── main.tsx # Punto de entrada

---

### Justificación Técnica (El "Por qué" para la defensa)

#### 1. `components/ui` vs `features/`
* **El problema:** En proyectos junior, todo se mezcla en una carpeta `components` gigante.
* **La solución profesional:**
    * Si un botón es genérico (azul, redondo), va en `components/ui`.
    * Si un botón tiene lógica de negocio ("Guardar Curso y enviar notificación"), va en `features/editor`.
    * **Beneficio:** Tu Agente *Artist* puede pulir la estética en `ui` sin romper la lógica del negocio en `features`.

#### 2. La carpeta `types/` (El Contrato)
Aquí es donde definimos el "lenguaje común". Antes de programar nada, definimos en `types/course.ts` qué demonios es una "Unidad".
* **Beneficio:** Permite que el Backend (cuando exista) y el Frontend hablen el mismo idioma. Cumple con la definición de interfaces del **Diseño Detallado (DSI)**.

#### 3. La carpeta `services/` (Patrón de Abstracción)
Aunque ahora uses datos falsos (`mocks`), tus componentes **nunca** deben importar el JSON directamente.
* **Incorrecto:** `import data from '../mocks/data.json'`
* **Correcto:** `courseService.getCourse('tema-2')`
* **Por qué:** El día de mañana, cambias la función dentro de `courseService` para que llame a Supabase en vez de devolver el mock, y **no tienes que tocar ni una línea de tus componentes visuales**. Esto es oro puro para la mantenibilidad.

### Siguientes Pasos Operativos

1.  **Refactorización:** Mueve tus componentes actuales de `viz-app` (grafos, tablas) a `features/player/components/visualizations`.
2.  **Creación:** Crea la carpeta `types` y coloca ahí el archivo `course.ts` que generamos en el paso anterior.
3.  **Configuración:** Asegúrate de que tu `tsconfig.json` tenga configurados los "paths" (alias) para importaciones limpias (opcional pero recomendado):
    ```json
    "@/components/*": ["src/components/*"],
    "@/features/*": ["src/features/*"]
