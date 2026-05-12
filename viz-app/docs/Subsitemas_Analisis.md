3. # **SUBSISTEMAS DE ANÁLISIS** {#subsistemas-de-análisis}

   1. ## ***Identificación de Subsistemas de Análisis*** {#identificación-de-subsistemas-de-análisis}

Siguiendo las recomendaciones de MÉTRICA v3, se han identificado **tres subsistemas principales para Viz-App**, agrupando las funcionalidades según la naturaleza de la interacción y los requisitos de negocio definidos.

Esta agrupación responde a la diferenciación clara entre las capacidades de autoría del docente, la experiencia de aprendizaje del estudiante y las necesidades de gobernanza del administrador del sistema.

* **SUB-01: Gestión de Contenidos (Editor)**: Representa las operaciones de creación, estructuración y configuración lógica de los cursos. Está orientado principalmente al perfil Docente/Editor.  
* **SUB-02: Reproducción e Interactividad (Player)**: Agrupa las funcionalidades de consumo de contenido, navegación y ejecución del motor interactivo. Orientado al perfil Estudiante.  
* **SUB-03: Administración, Seguridad y Reportes (Core)**: Centraliza la gestión de accesos, persistencia de datos, configuración técnica y analítica del sistema.

**Figura 3.1: Diagrama de Subsistemas del Sistema Viz-App** (El diagrama visualiza los tres paquetes funcionales y su dependencia del núcleo de datos central)

Los casos de uso que intervienen en cada paquete se detallan en la matriz de trazabilidad del apartado 3.3.

2. ## ***Relaciones entre Subsistemas de Análisis*** {#relaciones-entre-subsistemas-de-análisis}

A diferencia de sistemas aislados, en Viz-App se han identificado relaciones críticas de comunicación para garantizar la integridad del flujo de información:

**Sincronización de Datos (SUB-01 ↔ SUB-02)**: El subsistema Editor genera la estructura JSON que el Player interpreta. Existe una relación de dependencia donde el Player requiere de versiones publicadas en el Editor para su funcionamiento.

**Transversalidad de Seguridad (SUB-03 → Todos)**: El subsistema Core provee los servicios de autenticación y autorización necesarios para que los usuarios operen en el Editor o el Player según su rol.

**Trazabilidad y Auditoría (SUB-01/SUB-02 → SUB-03)**: Cualquier acción crítica en los subsistemas de Editor o Player dispara eventos que son capturados y procesados por el módulo de Auditoría y Reportes del subsistema Core.

3. ## ***Matriz de Trazabilidad*** {#matriz-de-trazabilidad}

A continuación, se presenta la matriz que vincula los 22 casos de uso con los subsistemas identificados para asegurar la cobertura total de la funcionalidad.

| Subsistemas / Casos de Uso | SUB-01 | SUB-02 | SUB-03 |
| ----- | ----- | ----- | ----- |
| **CU-01: Crear y estructurar módulos** | X |  |  |
| **CU-02: Configurar bloques multimedia** | X |  |  |
| **CU-03: Navegar contenido secuencial** |  | X |  |
| **CU-04: Reproducir audio (TTS)** |  | X |  |
| **CU-05: Gestionar roles y permisos** |  |  | X |
| **CU-06: Auditar uso del sistema** |  |  | X |
| **CU-07: Añadir componentes al Canvas** | X |  |  |
| **CU-08: Configurar propiedades de nodo** | X |  |  |
| **CU-09: Ejecutar simulación en Canvas** |  | X |  |
| **CU-10: Iniciar audioguía automatizada** |  | X |  |
| **CU-11: Generar y Exportar Reportes** |  |  | X |
| **CU-12: Previsualizar curso** | X |  |  |
| **CU-13: Guardar estado/borrador** | X |  |  |
| **CU-14: Publicar y versionar curso** | X |  |  |
| **CU-15: Clonar o duplicar módulos** | X |  |  |
| **CU-16: Controlar estado simulación** |  | X |  |
| **CU-17: Preferencias de accesibilidad** |  | X |  |
| **CU-18: Autenticación (Login)** |  |  | X |
| **CU-19: Gestión de Usuarios (CRUD)** |  |  | X |
| **CU-20: Asignar y revocar acceso** |  |  | X |
| **CU-21: Configurar parámetros/APIs** |  |  | X |
| **CU-22: Consultar Log de Auditoría** |  |  | X |