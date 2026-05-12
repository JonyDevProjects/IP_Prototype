# Diagramas de Casos de Uso - VizApp

## 1. Diagrama General del Sistema (UML)

A continuación se presenta el diagrama de casos de uso de VizApp generado en Draw.io con simbología UML estándar, incluyendo puntos de extensión y relaciones de inclusión.

![Diagrama de Casos de Uso UML](./diagrama_cu_uml.png)

## 2. Diagrama en Sintaxis Mermaid (Refinado)

Este diagrama modela las dependencias funcionales entre casos de uso mediante relaciones de `include` y `extend`.

```mermaid
flowchart LR
    %% Actores
    subgraph Actores
        direction TB
        D((Docente))
        E((Estudiante))
        A((Administrador))
        S((Asistente IA))
    end

    %% Subsistema 01
    subgraph SUB01 ["SUB-01: Gestión de Contenidos (Editor)"]
        direction TB
        CU01([CU-01: Estructurar módulos])
        CU02([CU-02: Configurar bloques])
        CU07([CU-07: Añadir componentes Canvas])
        CU08([CU-08: Configurar lógica de nodo])
        CU12([CU-12: Previsualizar curso])
        CU13([CU-13: Guardar borrador])
        CU15([CU-15: Clonar módulos])
    end

    %% Subsistema 02
    subgraph SUB02 ["SUB-02: Reproducción e Interactividad (Player)"]
        direction TB
        CU03([CU-03: Navegación secuencial])
        CU04([CU-04: Reproducir TTS])
        CU09([CU-09: Ejecutar simulación])
        CU10([CU-10: Iniciar audioguía])
        CU16([CU-16: Controlar estado])
        CU17([CU-17: Ajustar accesibilidad])
    end

    %% Subsistema 03
    subgraph SUB03 ["SUB-03: Administración Core"]
        direction TB
        CU18([CU-18: Login])
        CU05([CU-05: Gestionar roles])
        CU06([CU-06: Auditar eventos])
        CU11([CU-11: Exportar reportes])
        CU14([CU-14: Publicar y versionar])
        CU19([CU-19: Gestión usuarios])
        CU20([CU-20: Asignar acceso])
        CU21([CU-21: Configurar APIs])
        CU22([CU-22: Consultar logs])
    end

    %% Relaciones de Casos de Uso (Include/Extend)
    CU10 -.->|"<<include>>"| CU04
    CU10 -.->|"<<include>>"| CU03
    CU14 -.->|"<<include>>"| CU13
    CU14 -.->|"<<include>>"| CU06
    CU12 -.->|"<<include>>"| CU13
    CU15 -.->|"<<extend>>"| CU01
    CU16 -.->|"<<extend>>"| CU09
    CU22 -.->|"<<extend>>"| CU06

    %% Relaciones Actores
    D --- CU01
    D --- CU02
    D --- CU07
    D --- CU08
    D --- CU11
    D --- CU12
    D --- CU13
    D --- CU14
    D --- CU18
    D --- CU20

    E --- CU03
    E --- CU10
    E --- CU09
    E --- CU17
    E --- CU18

    A --- CU05
    A --- CU11
    A --- CU14
    A --- CU18
    A --- CU19
    A --- CU20
    A --- CU21
    A --- CU22

    S --- CU06

    %% Estilos
    style D fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#bbf,stroke:#333,stroke-width:2px
    style A fill:#bfb,stroke:#333,stroke-width:2px
    style S fill:#ffb,stroke:#333,stroke-width:2px
```

## 3. Definición de Relaciones Técnicas

Para una interpretación correcta del modelo UML, se definen las siguientes reglas de negocio:

### Inclusiones (`<<include>>`)
Representan fragmentos de funcionalidad que son **obligatorios** para el caso de uso base.
- **CU-10 (Audioguía)**: Obligatoriamente consume la navegación (CU-03) y el TTS (CU-04).
- **CU-14 (Publicación)**: Requiere el guardado previo (CU-13) y genera un registro forense obligatorio (CU-06).
- **CU-12 (Previsualización)**: Dispara un guardado automático (CU-13) de los cambios actuales.

### Extensiones (`<<extend>>`)
Representan funcionalidades **opcionales** que aumentan el comportamiento del caso de uso base en puntos específicos.
- **CU-15 (Clonar)**: Es una opción avanzada dentro de la gestión de estructura de módulos (CU-01).
- **CU-16 (Reiniciar)**: Acción opcional del estudiante durante la ejecución de una simulación (CU-09).
- **CU-22 (Consultar Logs)**: Funcionalidad de visualización que extiende la capacidad base de auditoría (CU-06).
