# Guía de Contribución y Flujo de Trabajo (Team Workflow)

¡Bienvenido al equipo de desarrollo de VizApp!
Este documento define cómo trabajamos juntos para mantener la calidad, consistencia y escalabilidad del proyecto.

## 1. Onboarding (Primeros Pasos)
Antes de escribir una línea de código, debes familiarizarte con el ecosistema actual:

1.  **Lectura Obligatoria**:
    -   [`README.md`](./README.md): Visión general y arquitectura técnica.
    -   [`../estructura-directorios.md`](../estructura-directorios.md): Mapa del proyecto.
    -   [`../.agent/rules/`](../.agent/rules/): Las "Leyes" del código (Testing, Refactoring).

2.  **Configuración del Entorno**:
    -   Node.js v16+ (Recomendado usar `nvm`).
    -   `npm install` en `viz-app/`.
    -   `npm test` para asegurar que todo está en verde.

## 2. Estrategia de Ramas (Git Flow Simplificado)

Trabajamos con ramas paralelas (Feature Branches). **Nunca hagas commit directo a `main`.**

### El Ciclo de Vida de una Tarea:

1.  **Crear Rama**:
    -   Nuevas features: `feat/nombre-feature` (ej: `feat/video-block`).
    -   Arreglos de bugs: `fix/nombre-bug` (ej: `fix/timeline-crash`).
    -   Refactorización: `refactor/nombre-modulo` (ej: `refactor/editor-hooks`).

2.  **Desarrollo Local**:
    -   Escribe tu código.
    -   **¡Importante!**: Si creas lógica compleja, **crea tests unitarios** (ver `testing-standards.md`).

3.  **Verificación Local (Self-QA)**:
    -   Ejecuta `npm run lint`.
    -   Ejecuta `npm test`. **Si los tests fallan, no subas el código.**

4.  **Pull Request (PR)**:
    -   Sube tu rama: `git push origin feat/mi-feature`.
    -   Abre una PR hacia `main`.
    -   **Descripción**: Explica qué cambiaste y por qué.
    -   **Revisión**: Otro desarrollador (o el Lead) debe aprobar tu código.

## 3. Estándares de Código

### Commits
Usamos **Conventional Commits**:
-   `feat: ...` -> Nueva funcionalidad.
-   `fix: ...` -> Corrección de errores.
-   `docs: ...` -> Cambios en documentación.
-   `refactor: ...` -> Cambios de código que no afectan la funcionalidad externa.

### Agentes IA en el Equipo
Este proyecto utiliza agentes de IA (`.agent/workflows/`) para tareas específicas. Como desarrollador humano, puedes (y debes) apoyarte en ellos:
-   **¿Dudas de arquitectura?**: Consulta las reglas en `.agent/rules/architecture.md`.
-   **¿Vas a probar tu feature?**: Actúa como el agente "Inspector" (QA) y sigue sus pasos de verificación manual.

## 4. Resolución de Conflictos
Si tu rama entra en conflicto con `main`:
1.  Haz checkout a tu rama: `git checkout feat/mi-feature`.
2.  Trae los cambios de main: `git pull origin main --rebase`.
3.  Resuelve los conflictos en tu editor.
4.  Continúa el rebase: `git rebase --continue`.
5.  Fuerza el push (con cuidado): `git push origin feat/mi-feature --force-with-lease`.
