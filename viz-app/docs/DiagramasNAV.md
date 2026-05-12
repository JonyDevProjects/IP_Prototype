# Diagramas de Navegación del Sistema VizApp

Este documento describe el flujo de navegación entre los distintos módulos de VizApp, estructurado por los subsistemas de análisis y alineado con la especificación de interfaces.

## 1. Modelo de Navegación Global

Representa el punto de entrada único al sistema y la ramificación de navegación basada en roles.

```mermaid
graph TD
    Start((Inicio)) --> IU0000[IU-0000: Inicio de Sesión]
    
    IU0000 --> Login{Validar Rol}
    
    Login -->|Docente| IU0001[IU-0001: Dashboard Docente]
    Login -->|Estudiante| IU0002[IU-0002: Dashboard Estudiante]
    Login -->|Administrador| IU0003_Core[Panel de Administración Core]

    subgraph "Nodos de Salida"
        IU0001 --- Logout((Cerrar Sesión))
        IU0002 --- Logout
        IU0003_Core --- Logout
    end
```

---

## 2. SUB-01: Gestión de Contenidos (Editor)

Describe el flujo de trabajo del docente para la creación y estructuración de conocimiento.

```mermaid
graph LR
    subgraph "Dashboard Docente (IU-0001)"
        D1[Lista de Proyectos]
        D2[Buscador/Filtros]
    end

    D1 -->|Nuevo Proyecto| Editor[Editor de Canvas]
    D1 -->|Editar Existente| Editor
    
    subgraph "Entorno Editor"
        Editor -->|Configurar Bloques| CU02[Gestión Multimedia]
        Editor -->|Lógica Reactiva| CU08[Configurar Nodos]
        CU02 --> Editor
        CU08 --> Editor
    end

    Editor -->|Previsualizar| IU_PREVIEW[Vista Previa de Trabajo]
    Editor -->|Guardar| Editor
    Editor -->|Publicar| IU0001
```

---

## 3. SUB-02: Reproducción e Interactividad (Player)

Detalla el ciclo de vida del aprendizaje del estudiante, desde la selección del curso hasta la obtención de resultados.

```mermaid
graph LR
    subgraph "Dashboard Estudiante (IU-0002)"
        E1[Catálogo de Cursos Asignados]
        E2[Ver Reportes Históricos]
    end

    E1 -->|Iniciar| Player[Interfaz Player]
    E2 --> IF0001[IF-0001: Reporte de Progreso]

    subgraph "Entorno Player"
        Player -->|Interactuar| Canvas[Ejecución de Simulación]
        Canvas -->|Checkpoints| Player
        Player -->|Audio| CU04[Reproducir TTS]
    end

    Player -->|Finalizar| IF0001
```

---

## 4. SUB-03: Administración, Seguridad y Reportes (Core)

Visualiza el flujo de gestión técnica y auditoría forense del sistema.

```mermaid
graph TD
    Panel[Panel de Administración Core]

    Panel -->|Gestión de Identidad| Users[Gestión de Usuarios / Roles]
    Panel -->|Seguridad| IU0003[IU-0003: Registro Forense]
    Panel -->|Configuración| APIs[Configuración de APIs/LLM]

    IU0003 -->|Generar Documento| IF0002[IF-0002: Auditoría de Actividad]
    
    subgraph "Acciones Administrativas"
        Users -->|Matricular| CU20[Asignar Acceso a Cursos]
        APIs -->|Test Conexión| CU21[Validación de Endpoints]
    end
```
