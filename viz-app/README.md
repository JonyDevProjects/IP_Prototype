# VizApp - ExpertPath Prototype

Este proyecto es la evolución de un prototipo de infografía estática hacia una aplicación web profesional, escalable y mantenible (SaaS LMS).

## 1. Historia y Evolución

### Fase 1: El Monolito (Legacy)
El proyecto nació como `Tema1_Infografic.tsx`, un archivo único de >500 líneas que mezclaba lógica, datos y presentación.
-   **Problemas**: Difícil de mantener, sin tipos, sin reutilización.

### Fase 2: Profesionalización (Enero 2026)
Se migró a una arquitectura **Vite + React + TypeScript**.
-   **Modularización**: Separación de `data`, `utils` y `components`.
-   **Testing**: Introducción de Vitest y React Testing Library.
-   **Internacionalización**: Extracción de textos a JSON.

### Fase 3: Arquitectura Feature-Based y Agentes (Actualidad)
Se reestructuró el proyecto para soportar un Editor SaaS complejo.
-   **Registry Pattern**: El editor no conoce los bloques; los carga dinámicamente desde un registro (`src/components/blocks/registry.ts`).
-   **Ecosistema de Agentes**: Se implementaron reglas estrictas (`.agent/rules/`) y workflows (`.agent/workflows/`) para que agentes de IA colaboren en el desarrollo (Arquitecto, QA, Supervisor).

## 2. Arquitectura Técnica

El proyecto sigue una estructura **Feature-Based**. Ver `estructura-directorios.md` para detalles completos.

### Conceptos Clave
1.  **Features vs UI**: La lógica de negocio (`src/features/editor`) está separada de los componentes visuales puros (`src/components/ui`).
2.  **Bloques como Plugins**: Cada tipo de contenido (Timeline, Video, Quiz) es un módulo independiente con su propia Vista y Panel de Propiedades.
3.  **Strict refactoring Standards**: Reglas automáticas para evitar deuda técnica (ej: modularizar archivos >300 líneas).
