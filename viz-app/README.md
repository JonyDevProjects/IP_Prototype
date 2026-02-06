# VizApp - ExpertPath Prototype

Bienvenido a VizApp. Este es el repositorio del prototipo de infografías interactivas (SaaS LMS).

## 🚀 Quick Start (Para Impacientes)

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```
2.  **Correr entorno local**:
    ```bash
    npm run dev
    ```
3.  **Ejecutar Tests**:
    ```bash
    npm test
    ```

---

## 📚 Documentación (Tu Mapa)

No te abrumes. Hemos organizado la información para que leas solo lo que necesitas.

### 🔹 Para empezar (Onboarding)
-   **[CONTRIBUTING.md](./CONTRIBUTING.md)**: **LEER PRIMERO**. Reglas del equipo, git flow, y cómo hacer tu primera Pull Request.
-   **[Estructura del Proyecto](./docs/architecture/STRUCTURE.md)**: Entiende qué hay en cada carpeta y por qué. Arquitectura "Feature-Based".

### 🔹 Cómo trabajamos
-   **[Metodología Lean + Agentes](./docs/process/METHODOLOGY.md)**: Nuestra filosofía de trabajo. Descubre cómo usar a los **Agentes de IA** (Arquitecto, QA, etc.) para programar más rápido.

### 🔹 Contexto Histórico
-   **[Evolución del Proyecto](./docs/history/EVOLUCION.md)**: De dónde venimos (Legacy) y cómo llegamos aquí. Lectura opcional para curiosos.

---

## 🤖 Ecosistema de Agentes
Este proyecto utiliza Inteligencia Artificial para el desarrollo.
Consulta `.agent/workflows/` para ver los "Prompt Engineers" disponibles.

## 🔄 Últimos Cambios (06 Feb 2026)
*   **Audio Controls**: Implementado control de velocidad/volumen global con **Resume-on-Change** (no reinicia el audio).
*   **TTS Parity**: Features extendidas a `TextBlock`, `StepBlock`, y `AlertBlock`.
*   **Robustness**: Tests unitarios "blindados" contra errores de entorno en Vitest.
*   **Standards**: Nuevas reglas de oro para integridad de features y testing.

