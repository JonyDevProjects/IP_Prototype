5. # **INTERFACES DE USUARIO** {#interfaces-de-usuario}

   1. ## ***Principios de Diseño de la Interfaz de Usuario*** {#principios-de-diseño-de-la-interfaz-de-usuario}

   ### **Estándares y Normas**

1. **Tipografía**: Se utilizará la familia tipográfica Inter de Google Fonts por su alta legibilidad en interfaces técnicas.  
2. **Estética Visual**: Se aplicarán principios de Glassmorphism (fondos translúcidos con desenfoque) y gradientes sutiles para crear una apariencia premium y moderna.  
3. **Consistencia de Color**:  
   1. Primario: \#7f13ec (Púrpura VizApp).  
   2. Fondo Dark: \#0c080f.  
   3. Fondo Light: \#f8fafc.  
4. **Diseño Responsivo**: Todas las interfaces se adaptarán mediante el uso de CSS Grid y Flexbox.  
5. **Interactividad**: Los elementos activos presentarán micro-animaciones (escala y elevación) al interactuar.

   ### **Idiomas Soportados**

El sistema soportará inicialmente:

1. **Español (ES)**: Idioma por defecto.  
2. **Inglés (EN)**: Idioma secundario seleccionable desde el perfil de usuario.

   ### **Otras Generalidades**

* **Sistema de Temas**: Soporte nativo para Modo Claro y Modo Oscuro, persistido mediante localStorage.  
* **Navegación**: Menús consistentes en la parte superior para dashboards de usuario y menús laterales (sidebar) para paneles de administración core.

  2. ## ***Subsistema S1: Gestión de Contenidos (Editor)*** {#subsistema-s1:-gestión-de-contenidos-(editor)}

Representa las operaciones de creación, estructuración y configuración lógica de los cursos. Está orientado principalmente al perfil Docente/Editor.

Diagrama

1. ### **Modelo de Navegación del Subsistema** {#modelo-de-navegación-del-subsistema}

La navegación se centra en el **Dashboard Docente (IU-0001)** como eje para la gestión del conocimiento. Permite el acceso a la edición de infraestructuras críticas y la configuración de escenarios de simulación.

2. ### **Interfaz del Módulo IU-0001: Dashboard Docente** {#interfaz-del-módulo-iu-0001:-dashboard-docente}

| IU-0001: Dashboard Docente |  |  |  |  |  |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Descripción** | Centro de control para la gestión del conocimiento |  |  |  |  |
| **Campos** | **Nombre** | **Tipo Datos** | **Editable/ Consulta** | **Oblig.** | **Descripción** |
|  | Buscador | String | Editable | No | Filtra proyectos por nombre o tag |
|  | Métricas | Number | Consulta | \- | Visualización de KPI (Proyectos, Simulaciones) |
|  |  |  |  |  |  |
| **Botones/Enlaces** | **Nombre** |  | **Acción** |  |  |
|  | Nuevo Proyecto |  | Abre el Editor de Canvas para crear infraestructura |  |  |
|  | Editar Proyecto |  | Carga un proyecto existente en el editor  |  |  |
|  | Borrar |  | Elimina un proyecto del catálogo |  |  |

propuesta de interfaz gráfica

3. ## ***Subsistema S2: Reproducción e Interactividad (Player)*** {#subsistema-s2:-reproducción-e-interactividad-(player)}

Agrupa las funcionalidades de consumo de contenido, navegación y ejecución del motor interactivo. Orientado al perfil Estudiante.

### **5.3.1 Modelo de Navegación del Subsistema**

El flujo principal parte del **Dashboard de Estudiante (IU-0002)**, donde el usuario selecciona una  
simulación activa. Al finalizar la interacción en el Player, se genera automáticamente el **Reporte de Progreso (IF-0001)**.

### **5.3.2 Interfaz del Módulo IU-0002: Dashboard Estudiante**

| IU-0002: Dashboard Estudiante |  |  |  |  |  |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Descripción** | Vista de consumo de contenido y seguimiento para alumnos. |  |  |  |  |
| **Campos** | **Nombre** | **Tipo Datos** | **Editable/ Consulta** | **Oblig.** | **Descripción** |
|  | Puntuación Media | Decimal | Consulta | \- | Promedio de éxito en simulaciones |
|  | Progreso Curso | Porcentaje | Consulta | \- | Barra visual de avance en el catálogo asignado. |
|  |  |  |  |  |  |
| **Botones/Enlaces** | **Nombre** |  | **Acción** |  |  |
|  | Iniciar |  | Carga la simulación en el Player |  |  |
|  | Ver Reporte |  | Abre el informe de resultados IF-0001 |  |  |
|  |  |  |  |  |  |

propuesta de interfaz gráfica

4. ## ***Subsistema S3: Administración, Seguridad y Reportes (Core)***

Centraliza la gestión de accesos, persistencia de datos, configuración técnica y analítica del sistema.

### **5.4.1 Modelo de Navegación del Subsistema**

Constituye el núcleo transaccional. Incluye el punto de entrada global Login (IU-0000) y el panel de control administrativo que permite alternar entre la gestión de usuarios y la auditoría forense.

### **5.4.2 Interfaz del Módulo IU-0000: Inicio de Sesión**

| IU-0000: Login |  |  |  |  |  |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Descripción** | Pantalla de acceso único para todos los usuarios de VizApp. |  |  |  |  |
| **Campos** | **Nombre** | **Tipo Datos** | **Editable/ Consulta** | **Oblig.** | **Descripción** |
|  | Usuario/Email | String | Editable | Si | Identificador de cuenta del usuario |
|  | Contraseña | Password | Editable | Si | Clave de acceso secreta |
|  | Recordarme | Checkbox | Editable | No | Mantiene la sesión activa tras cerrar navegador |
| **Botones/Enlaces** | **Nombre** |  | **Acción** |  |  |
|  | Iniciar Sesión |  | Valida credenciales y redirige según rol |  |  |
|  | Olvidé Contraseña |  | Inicia proceso de recuperación de cuenta |  |  |
|  |  |  |  |  |  |

propuesta de interfaz gráfica

### **5.4.3 Interfaz del Módulo IU-0003: Registro Forense**

| IU-0003: Registro Forense |  |  |  |  |  |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **Descripción** | Visualización técnica de eventos críticos para auditoría. |  |  |  |  |
| **Campos** | **Nombre** | **Tipo Datos** | **Editable/ Consulta** | **Oblig.** | **Descripción** |
|  | Timestamp | Datetime | Consulta | \- | Fecha y hora exacta (UTC) del evento |
|  | Actor | String | Consulta | \- | Identidad que generó la acción |
|  | Checksum | String (Hash) | Consulta | \- | Firma de integridad del registro |
| **Botones/Enlaces** | **Nombre** |  | **Acción** |  |  |
|  | Exportar |  | Genera el reporte IF-0002 (PDF/CSV) |  |  |

propuesta de interfaz gráfica

5. ## ***Matriz de Trazabilidad Módulo de  Interfaz \- Actores*** {#matriz-de-trazabilidad-módulo-de-interfaz---actores}

| Módulo de Interfaz | Administrador | Docente | Estudiante |
| :---- | ----- | ----- | ----- |
| IU-0000: Login | X | X | X |
| IU-0001: Dash. Docente | \- | X | \- |
| IU-0002: Dash. Estudiante | \- | \- | X |
| IU-0003: Registro Forense | X | \- | \- |

6. # **INFORMES** {#informes}

   1. ## ***Subsistema S2: Reproducción e Interactividad*** {#subsistema-s2:-reproducción-e-interactividad}

      1. ### **Módulo de Informe IF-0001: Reporte de Progreso del Alumno** {#módulo-de-informe-if-0001:-reporte-de-progreso-del-alumno}

| IF-0001: Reporte de Progreso |  |  |  |  |
| :---- | ----- | ----- | :---- | :---- |
| **Descripción** | Detalle de resultados tras completar una simulación de infraestructura. |  |  |  |
| **Módulo de Interfaz** | IU-0002 |  |  |  |
| **Datos** | **Campo** | **Ordenación** | **Tipo Datos** | **Descripción** |
|  | Fecha Simulación | 1 (Desc)  | Date | Momento de ejecución  |
|  | Puntuación Nota | 2 | Decimal | Nota final obtenida |
|  | Tiempo Total | \- | Duración | Duración de la sesión |
| **Resumen/Acumulado** | **Resumen** |  |  | **Campos del Resumen** |
|  | Promedio Mensual |  |  | Puntuación / Nota |
|  |  |  |  |  |

   2. ## ***Subsistema S3: Administración, Seguridad y Reportes***

      1. ### **Módulo de Informe IF-0002: Auditoría Forense de Actividad**

| IF-0002: Auditoría Forense |  |  |  |  |
| :---- | ----- | ----- | :---- | :---- |
| **Descripción** | Documento legal de eventos del sistema para cumplimiento normativo. |  |  |  |
| **Módulo de Interfaz** | IU-0003 |  |  |  |
| **Datos** | **Campo** | **Ordenación** | **Tipo Datos** | **Descripción** |
|  | ID Evento | 1 (Asc) | String | Identificador único forense |
|  | Tipo Acción | 2 | String | Categoría (Login, Delete, Config) |
|  | Integridad Hash | \- | Hash | Verificador de no alteración |
| **Resumen/Acumulado** | **Resumen** |  |  | **Campos del Resumen** |
|  | Alertas Críticas |  |  | ID Evento (donde Nivel \= 'High') |
|  |  |  |  |  |

   3. ## ***Matriz de Trazabilidad Módulo de Informe \- Actores*** {#matriz-de-trazabilidad-módulo-de-informe---actores}

| Módulo de Informe | Administrador | Docente | Estudiante |
| :---- | ----- | ----- | ----- |
| IF-0001: Reporte Progreso | \- | X | X |
| IF-0002: Auditoría Forense | X | \- | \- |