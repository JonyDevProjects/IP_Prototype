

| Edición: vv Fecha: día de mes de año  |
| :---- |

**CONTROL Y REGISTRO DE CAMBIO DEL DOCUMENTO**

| CONTROL |  |
| :---- | :---- |
| **Proyecto** | Viz-App |
| **Denominación** | Análisis del Sistema de Información Viz-App |
| **Fecha** | 13 de marzo de 2026 |
| **Edición** |  V5 |
| **Grupo** | 09 |
| **Autores** | Juan Rivas Ibáñez Jonathan Javier Quishpe Maldonado |

 

| REGISTRO DE CAMBIOS |  |  |
| :---- | :---- | :---- |
| **VERSIÓN** | **DESCRIPCIÓN DEL CAMBIO** | **FECHA DEL CAMBIO** |
| 01 | Versión inicial | 13 de marzo de 2026 |
| 02 | Definición del Sistema | 15 de marzo de 2026 |
| 03 |  |  |
|  |  |  |
|  |  |  |

[1	DEFINICIÓN DEL SISTEMA	5](#definición-del-sistema)  
[1.1	Alcance del Sistema	5](#alcance-del-sistema)  
[1.2	Entorno Tecnológico	5](#entorno-tecnológico)  
[1.3	Estándares y Normas	5](#estándares-y-normas)  
[1.4	Usuarios Participantes y Finales	5](#usuarios-participantes-y-finales)  
[2	ESPECIFICACIÓN DE REQUISITOS	7](#especificación-de-requisitos)  
[2.1	Catálogo de Requisitos	7](#catálogo-de-requisitos)  
[2.2	Especificación de Casos de Uso	8](#especificación-de-casos-de-uso)  
[2.2.1	Identificación y definición de Actores	8](#identificación-y-definición-de-actores)  
[2.2.2	Diagrama de Casos de Uso	8](#diagrama-de-casos-de-uso)  
[2.2.3	Especificación de Casos de uso	9](#especificación-de-casos-de-uso-1)  
[2.2.4	Matriz de Trazabilidad Requisitos – Casos de Uso	9](#matriz-de-trazabilidad-requisitos-–-casos-de-uso)  
[3	SUBSISTEMAS DE ANÁLISIS	10](#subsistemas-de-análisis)  
[3.1	Identificación de Subsistemas de Análisis	10](#identificación-de-subsistemas-de-análisis)  
[3.2	Relaciones entre Subsistemas de Análisis	10](#relaciones-entre-subsistemas-de-análisis)  
[3.3	Matriz de Trazabilidad	10](#matriz-de-trazabilidad)  
[4	ANÁLISIS DE LAS CLASES POR SUBSISTEMAS	11](#análisis-de-las-clases-por-subsistemas)  
[4.1	Paquetes de clases de negocio	11](#paquetes-de-clases-de-negocio)  
[4.1.1	Subsistema “XX”	11](#heading=h.1fsk36u5msu0)  
[4.1.2	Subsistema “YY”	11](#heading=h.tmrfzaqtoroz)  
[5	INTERFACES DE USUARIO	13](#interfaces-de-usuario)  
[5.1	Principios de Diseño de la Interfaz de Usuario	13](#principios-de-diseño-de-la-interfaz-de-usuario)  
[5.2	Subsistema S1	13](#subsistema-s1:-gestión-de-contenidos-\(editor\))  
[5.2.1	Modelo de Navegación del Subsistema	13](#modelo-de-navegación-del-subsistema)  
[5.2.2	Interfaz del Módulo NNNN	13](#interfaz-del-módulo-iu-0001:-dashboard-docente)  
[5.2.3	Interfaz del Módulo NNNN+1	14](#heading=h.muxdku5mqixo)  
[5.3	Subsistema S2	14](#subsistema-s2:-reproducción-e-interactividad-\(player\))  
[5.4	Matriz de Trazabilidad Módulo de  Interfaz \- Actores	14](#matriz-de-trazabilidad-módulo-de-interfaz---actores)  
[6	INFORMES	15](#informes)  
[6.1	Subsistema S1	15](#subsistema-s2:-reproducción-e-interactividad)  
[6.1.1	Módulo de Informe NNNN	15](#módulo-de-informe-if-0001:-reporte-de-progreso-del-alumno)  
[6.1.2	Módulo de Informe NNNN+1	16](#heading=h.9dfoeh4lu4eg)  
[6.2	Subsistema S2	16](#heading=h.b63ruu7j9dkx)  
[6.3	Matriz de Trazabilidad Módulo de Informe \- Actores	16](#matriz-de-trazabilidad-módulo-de-informe---actores)  
[7	COMUNICACIÓN CON SISTEMAS EXTERNOS	17](#comunicación-con-sistemas-externos)  
[8	PLAN DE PRUEBAS	17](#heading=h.us7kkh7ctz1i)  
[8.1	Alcance de las Pruebas	17](#heading=h.e2jozrkbfmfb)  
[8.2	Entornos de Pruebas	17](#heading=h.s5jn9wt23dn8)  
[8.3	Pruebas de Aceptación del Sistema	17](#heading=h.i9m2t2v2obec)  
[9	GLOSARIO	17](#heading=h.mwrkav3skit9)

# 

1. # **DEFINICIÓN DEL SISTEMA** {#definición-del-sistema}

   1. ## ***Alcance del Sistema*** {#alcance-del-sistema}

Este apartado define los objetivos fundamentales del proyecto **Viz-App**, delimita su alcance funcional y no funcional, y establece las restricciones y exclusiones que guiarán las fases de Análisis, Diseño y Construcción. La información se fundamenta en el Plan de Proyecto (V7, 11 de marzo de 2026).

### **1.1.1 Objetivos del Sistema**

El sistema Viz-App tiene como objetivo estratégico principal **transformar la experiencia de aprendizaje y la creación de contenido en sistemas de gestión de aprendizaje (LMS)** como Moodle y Blackboard, a través de la producción de materiales altamente interactivos, buscando activamente **mitigar la pasividad del estudiante en entornos virtuales.**

Los objetivos específicos a cumplir por el sistema son:

| OBJ–001 | Gestión de Contenido Interactivo |
| :---- | :---- |
| **Versión** | 1 |
| **Autores** | Jonathan Quishpe Maldonado y Juan Rivas Ibañez |
| **Fuente** | Plan de Proyecto (V7, 11 de marzo de 2026\) y Acta de Reunión R-01 (Entrevista con el Cliente/Sponsor). |
| **Descripción** | El sistema deberá permitir a los Docentes crear, editar y guardar de forma persistente módulos de contenido didáctico altamente interactivo, utilizando una interfaz de Docente de bloques visuales, con el fin de mejorar la participación del estudiante. |
| **Importancia** | Vital |
| **Estado** | Aprobado |
| **Comentarios** | Este objetivo es la base fundamental del alcance del proyecto (Viz-App). Es indispensable para la mitigación de la pasividad estudiantil, por lo que su desarrollo tiene la máxima prioridad. |

| OBJ–002 | Reproducción de Contenido Interactivo |
| :---- | :---- |
| **Versión** | 1 |
| **Autores** | Jonathan Quishpe Maldonado y Juan Rivas Ibañez |
| **Fuente** | Plan de Proyecto (V7, 11 de marzo de 2026\) y Acta de Reunión R-01 (Entrevista con el Cliente/Sponsor). |
| **Descripción** | El sistema deberá garantizar la **correcta visualización y la funcionalidad completa** del contenido didáctico interactivo, previamente creado y empaquetado por el Docente, dentro del entorno de los Sistemas de Gestión de Aprendizaje (LMS) compatibles (Moodle, Blackboard).  Esto incluye la gestión de las interacciones del Estudiante, la reproducción fluida del audio generado por TTS (si aplica) y la presentación de una interfaz de usuario **accesible y responsiva** en diversos dispositivos (escritorio y móvil), asegurando una experiencia de aprendizaje inmersiva. |
| **Importancia** | Vital |
| **Estado** | Aprobado |
| **Comentarios** | Este objetivo es la **prueba de concepto para el Estudiante** y es esencial para el propósito estratégico de **mitigar la pasividad estudiantil**. Su cumplimiento depende directamente de una integración exitosa (OBJ-004) y la disponibilidad de las funciones de accesibilidad (OBJ-003). La PMO establecerá un **Plan de Pruebas de Aceptación (ASI 10\)** riguroso enfocado en la usabilidad y la experiencia de usuario (UX) en los entornos LMS objetivo, además de la compatibilidad en diferentes navegadores/dispositivos. |

| OBJ–003 | Procesamiento y Generación de Audio (TTS) |
| :---- | :---- |
| **Versión** | 1 |
| **Autores** | Jonathan Quishpe Maldonado y Juan Rivas Ibañez |
| **Fuente** | Plan de Proyecto (V7, 11 de marzo de 2026\) y Acta de Reunión R-01 (Entrevista con el Cliente/Sponsor). |
| **Descripción** | El sistema deberá **procesar el contenido textual de los módulos interactivos y, a demanda del Docente, generar un output de audio de alta calidad** utilizando servicios de Texto-a-Voz (Text-to-Speech \- TTS), permitiendo la reproducción directa del contenido con fines de accesibilidad y diversidad de consumo. |
| **Importancia** | Vital |
| **Estado** | Aprobado |
| **Comentarios** | La funcionalidad de generación de audio es crítica para la accesibilidad del contenido. Su desarrollo tiene alta prioridad, pero está condicionado a la **disponibilidad y consumo de la API de TTS externa** definida en el Entorno Tecnológico. El coste y el rendimiento de la API deben ser monitoreados como parte del riesgo técnico. |

| OBJ–004 | Compatibilidad e Integración con LMS |
| :---- | :---- |
| **Versión** | 1 |
| **Autores** | Jonathan Quishpe Maldonado y Juan Rivas Ibañez |
| **Fuente** | Plan de Proyecto (V7, 11 de marzo de 2026\) y Acta de Reunión R-01 (Entrevista con el Cliente/Sponsor). |
| **Descripción** | El sistema deberá **generar el contenido interactivo y sus configuraciones asociadas en un formato de empaquetado (ej. SCORM, LTI, o plugin específico) compatible** con la importación y despliegue dentro de los Sistemas de Gestión de Aprendizaje (LMS) principales (Moodle y Blackboard), asegurando que los módulos puedan ser visualizados y utilizados por los Estudiantes en dichos entornos. |
| **Importancia** | Vital |
| **Estado** | Aprobado |
| **Comentarios** | Este objetivo es la prueba de fuego del proyecto, ya que el sistema debe funcionar como un add-on eficaz a los LMS. Exige un riguroso análisis de los estándares de empaquetado (ej. SCORM) y las API de integración que ofrecen Moodle y Blackboard. Su incumplimiento compromete la funcionalidad en el entorno de destino. |

### **1.1.2 Alcance Funcional y Exclusiones**

El alcance del proyecto Viz-App se delimita al desarrollo, pruebas y documentación de la suite de herramientas descrita.

**Funcionalidades Incluidas**:

* Desarrollo de la interfaz de gestión y reproducción de contenido interactivo (Frontend).

* Lógica de negocio para el procesamiento de texto y la invocación de servicios de síntesis de voz (Backend).

* Mecanismos de persistencia y gestión de la configuración (Gestión de Configuración).

* Generación de artefactos de despliegue compatibles con la integración en LMS (Construcción/Implantación).


  
**Funcionalidades Excluidas (Fuera de Alcance)**:

* El proyecto no incluye la modificación del código base de los LMS de destino (Moodle/Blackboard).

* No se contempla el desarrollo de módulos de analítica avanzada o la gestión de usuarios que dupliquen la funcionalidad nativa del LMS.

  ### **1.1.3 Restricciones del Proyecto**

Este apartado recoge las restricciones de entorno, proceso y negocio identificadas al inicio del análisis.

| Tipo de Restricción | Descripción de la Restricción | Implicación PMO/Técnica |
| :---- | :---- | :---- |
| **Metodológica** | Adopción del enfoque híbrido **Scrumban \+ MÉTRICA v3**, con soporte de Agentes de IA en la Capa de Ejecución Técnica. | Exige una estricta aplicación de la Gestión de la Configuración (**Git Flow**) y un riguroso Plan de Gestión de Pruebas y Calidad (QA) para mitigar el riesgo inherente a la generación asistida por IA. |
| **Tecnológica** | Requisitos de infraestructura y servicios externos definidos en el Plan de Proyecto (p.ej., uso de **API Text-To-Speech**, entorno de despliegue Vercel/Netlify). | El diseño del sistema (DSI) debe estar estrictamente acotado por las capacidades y limitaciones de las tecnologías seleccionadas. |
| **Negocio** | La solución debe ser una herramienta complementaria, no un sustituto, de los LMS existentes. | La interfaz y el flujo de trabajo deben estar diseñados para una integración mínima, eficiente y no intrusiva con el contexto de Moodle/Blackboard. |
| **Tiempo y Coste** | El Plan de Proyecto (Sección 5\) contiene estimaciones detalladas de **esfuerzo (horas)** repartidas en un periodo de 3 meses **y presupuesto (BAC**: 20.770,20€).   | Estas estimaciones servirán de referencia para el seguimiento (Control y Seguimiento del Trabajo, Sección 5.3) y la Gestión de Riesgos, pero no condicionarán la definición de los requisitos funcionales en la fase ASI. |

### **1.1.4 Glosario y Modelos Asociados**

Se contempla la inclusión de los siguientes productos para complementar la definición del sistema:

1. **Glosario de Términos**: Se añadirá, en la **Sección 9**, un glosario con la definición precisa de los conceptos propios del negocio (LMS), del dominio (Docente, Estudiante), y de la tecnología clave (TTS, Agentes de IA).  
2. **Modelos de Negocio y Dominio**: Se adjuntarán los **Modelos de Negocio y de Dominio** (preferiblemente utilizando la notación UML) para visualizar la estructura conceptual de la información y la interacción de alto nivel, tal como se definen en el Plan de Sistemas de Información (PSI).

   2. ## ***Entorno Tecnológico*** {#entorno-tecnológico}

Este apartado describe la arquitectura de alto nivel y los componentes tecnológicos clave que soportarán el desarrollo, la implantación y el funcionamiento del sistema Viz-App. El diseño del sistema (DSI) posterior estará estrictamente acotado por las capacidades y limitaciones de estas tecnologías, conforme a las restricciones identificadas.

### **1.2.1 Arquitectura del Sistema (Visión Lógica)**

El sistema se concibe bajo una arquitectura de micro-servicio o componente complementario (Add-on) que se ejecutará de forma independiente al LMS de destino (Moodle/Blackboard), comunicándose con este último únicamente a través de formatos de empaquetado y APIs estandarizadas.

Se distinguen tres capas lógicas principales:

1. **Capa de Presentación (Frontend)**: Responsable de la gestión y reproducción del contenido interactivo.  
2. **Capa de Lógica de Negocio (Backend/Procesamiento)**: Encargada del procesamiento de texto, la orquestación con servicios externos (TTS) y la gestión de la persistencia de la configuración de los módulos.  
3. **Capa de Persistencia/Configuración**: Almacenamiento de las configuraciones y artefactos generados.

   ### **1.2.2 Tecnologías Clave y Componentes**

| Componente o Capa | Tecnología / Herramienta | Justificación Técnica / Impacto PMO |
| :---- | :---- | :---- |
| **Despliegue / Hosting** | Entorno de Hosting Serverless (p.ej., **Vercel o Netlify**). | Restricción tecnológica y de coste inicial. El diseño de la arquitectura deberá ser stateless o manejar la sesión de manera externa, adaptándose al modelo de funciones serverless y despliegue distribuido. |
| **Servicio de Voz (Crítico)** | **API Externa de Texto-a-Voz (TTS)**. La API específica será seleccionada en la fase de Diseño (DSI) tras un análisis coste/rendimiento, pero el sistema debe integrarse con un proveedor comercial con alta calidad de voz. | Dependencia crítica para el objetivo **OBJ-003** (Accesibilidad). El Plan de Riesgos debe monitorear el coste por consumo de esta API, ya que afecta directamente al **Coste Total del Proyecto (BAC)** en su fase operativa. |
| **Integración con LMS** | **Estándar de Empaquetado LTI y SCORM.** | Es el lenguaje de comunicación con los sistemas Moodle/Blackboard. El output de la fase de Construcción deberá cumplir rigurosamente con estas especificaciones (Restricción de Negocio), siendo la prueba de fuego del proyecto (**OBJ-004**). |
| **Control de Versiones** | **Git Flow** (utilizado como estándar de PMO para la Gestión de la Configuración). | Es el mecanismo para mitigar los riesgos introducidos por el uso de agentes de IA en el desarrollo (Restricción Metodológica) y garantizar la integridad del código fuente. |

   ### **1.2.3 Restricciones Tecnológicas del Entorno**

La restricción clave, ya establecida en el punto **1.1.3**, es que el **diseño del sistema (DSI)** debe:

* Apegarse al modelo de consumo de la **API Text-To-Speech externa.**

* Asegurar la compatibilidad de despliegue en entornos serverless (Vercel/Netlify), lo que implica una gestión eficiente de recursos y tiempos de respuesta.

La elección de frameworks de desarrollo (React, Angular, Node.js, etc.) se especificará en detalle en la fase de Diseño, pero deberá estar alineada con la capacidad de integración eficiente con los servicios externos y los entornos de despliegue definidos.

3. ## ***Estándares y Normas*** {#estándares-y-normas}

Catálogo de estándares, normativas, leyes o recomendaciones que deben tenerse en cuenta durante el desarrollo, la construcción y la implantación del proyecto Viz-App. Estos estándares aseguran la calidad del proceso (PMO), la coherencia técnica y la compatibilidad con los entornos de destino.

El desarrollo de Viz-App se regirá por los siguientes estándares y normativas:

**Estándares de Proceso y Gestión (PMO)**

| Estándar / Metodología | Aplicación | Fuente de Referencia |
| :---- | :---- | :---- |
| **MÉTRICA V3** | Marco metodológico general para las fases de Análisis (ASI), Diseño (DSI) y Construcción (CSI). Garantiza la trazabilidad de requisitos, la calidad de los modelos y la generación de entregables estandarizados. | Restricción Metodológica (1.1.3) |
| **Scrumban** | Enfoque híbrido adoptado para la gestión diaria de tareas y el flujo de trabajo del equipo. | Restricción Metodológica (1.1.3) |
| **Git Flow** | Modelo de ramificación (branching model) estricto para la **Gestión de la Configuración y Control de Versiones**. Es el mecanismo PMO para mitigar los riesgos inherentes a la generación de código asistida por Agentes de IA. | Restricción Metodológica (1.1.3) y Entorno Tecnológico (1.2.2) |

**Estándares Técnicos y de Producto**

| Estándar / Norma | Aplicación | Impacto en el Proyecto |
| :---- | :---- | :---- |
| **Arquitectura de Tres Capas** | Se empleará una arquitectura lógica que separe la **Capa de Presentación** (Frontend), la **Capa de Lógica de Negocio** (Backend/Procesamiento) y la **Capa de Persistencia/Configuración**. | Garantiza la modularidad, escalabilidad y una asignación clara de responsabilidades en el diseño (DSI). |
| **SCORM (Shareable Content Object Reference Model)** | Estándar de empaquetado para contenido de e-learning. El sistema debe generar el módulo interactivo en un formato compatible para su uso en LMS (Moodle/Blackboard). | Crítico para el objetivo **OBJ-004** (Compatibilidad e Integración con LMS). |
| **LTI (Learning Tools Interoperability)** | Protocolo para la integración de herramientas externas con LMS. Se analizará su uso como alternativa o complemento a SCORM para el despliegue de Viz-App como un add-on. | Crítico para el objetivo **OBJ-004**. Permite una integración más profunda y no intrusiva. |
| **Notación UML** | Se utilizará para el modelado de dominio, la especificación de Casos de Uso y el Análisis de Clases. | Asegura la claridad y la estandarización de los modelos gráficos en las fases de ASI y DSI. |

4. ## ***Usuarios Participantes y Finales*** {#usuarios-participantes-y-finales}

Este apartado identifica a los roles clave que interactúan directamente con el proyecto **Viz-App**, ya sea en las fases de definición y aceptación (Usuarios Participantes) o en el uso diario del sistema una vez implantado (Usuarios Finales).

### **1.4.1 Usuarios Participantes (Stakeholders)**

Son aquellos roles que intervienen activamente en el ciclo de vida del proyecto para definir, validar o aprobar los entregables, garantizando la alineación con los objetivos de negocio y metodológicos.

| Rol | Tarea Principal en el Proyecto | Referencia de Participacion |
| :---- | :---- | :---- |
| **Cliente / Sponsor** | Definición de los objetivos estratégicos, aprobación del Alcance y aceptación final del producto. | Acta de Reunión R-01 |
| **Analista de Sistemas** | Recolección, especificación y modelado de requisitos (ASI), definición de la arquitectura de diseño (DSI) y gestión de la trazabilidad. (Jonathan Quishpe Maldonado, Juan Rivas Ibáñez) | Documento ASI (Autores) |
| **Docente** | Participación en la validación funcional de la interfaz de creación de contenido y en las Pruebas de Aceptación del Usuario (UAT). | Plan de Pruebas (8.3) |
| **Equipo Tecnico** | Supervisión metodológica (MÉTRICA v3/Scrumban), control de versiones (Git Flow) y garantía de calidad (QA). | Restricción Metodológica (1.1.3)  |

### **1.4.2 Usuarios Finales**

Son los roles que utilizarán el sistema Viz-App una vez esté en producción. Se distinguen dos perfiles principales, correspondientes a los objetivos fundamentales del sistema:

1. **Docente (Usuario Creador)**:

* **Función Clave**: Crear, editar y guardar de forma persistente módulos de contenido didáctico altamente interactivo.

* **Interacción Principal**: Uso de la Capa de Presentación (Frontend) (Docente de Bloques Visuales) y demanda de procesamiento de audio (TTS).

* **Impacto Operacional**: Cumplimiento del OBJ-001 (Gestión de Contenido Interactivo) y OBJ-003 (Procesamiento y Generación de Audio).

2. **Estudiante (Usuario Consumidor)**:

* **Función Clave**: Visualizar y consumir los módulos de contenido interactivo y accesible (con audio) dentro del entorno LMS (Moodle/Blackboard).

* **Interacción Principal**: Uso de los artefactos de despliegue generados por Viz-App e integrados en el LMS.

* **Impacto Operacional**: Objetivo Estratégico (Mitigación de la pasividad estudiantil) y cumplimiento del OBJ-004 (Compatibilidad e Integración con LMS).


  ### **1.4.3 Actas de Reunión Relevantes**

La obtención de requisitos y la identificación de estos perfiles se fundamentan en:

* **Acta de Reunión R-01 (Entrevista con el Cliente)**: Documento primario para la definición de los Objetivos del Sistema (OBJ-001, OBJ-002, OBJ-003, OBJ-004) y la validación inicial del Alcance.

* **Plan de Proyecto (V7, 11 de marzo de 2026\)**: Documento que establece el contexto general, las restricciones (p.ej., Negocio) y las fuentes de las estimaciones.

 

2. # **ESPECIFICACIÓN DE REQUISITOS** {#especificación-de-requisitos}

   1. ## ***Catálogo de Requisitos*** {#catálogo-de-requisitos}

El Catálogo de Requisitos es el documento central de la fase de Análisis (ASI) y sirve como base para el Diseño (DSI) y la Construcción (CSI). Su estructura detallada facilita la posterior Matriz de Trazabilidad Requisitos – Casos de Uso.

**Requisitos Funcionales (RF)**

Los requisitos funcionales (RF) definen las acciones específicas y el comportamiento que el sistema Viz-App debe realizar para cumplir sus objetivos de negocio.

| RF-001 | Modo Docente (Editor)/ Modo Lector (Player) |
| :---: | ----- |
| **Versión** | 1 |
| **Autores** | Jonathan Quispe Maldonado y Juan Rivas Ibañes |
| **Fuentes** | Plan de Proyecto (V7) / Acta R-01 |
| **Objetivos asociados** | **OBJ-001**: Gestion de Contenido Interactivo **OBJ-002**: Reproducción de Contenido Interactivo |
| **Descripción** | El sistema deberá contemplar las una diferenciacion clara entre: Interfaz de creación de contenido (Modo Docente) para el docente. Interfaz de visualización para el estudiante (Modo Lector) para el estudiante.  |
| **Actores** | **Actor**  |
|  | Docente |
|  | Estudiante |
| **Comentarios** | \- |

| RF-002 | Gestión de Bloques Básicos |
| :---: | ----- |
| **Versión** | 1 |
| **Autores** | Jonathan Quispe Maldonado y Juan Rivas Ibañes |
| **Fuentes** | Plan de Proyecto (V7) / Acta R-01 |
| **Objetivos asociados** | **OBJ-001**: Gestión de Contenido Interactivo |
| **Descripción** | El sistema deberá permitir las siguientes operaciones con los bloques de contenido interactivo: Crear Editar Eliminar Reordenar  |
| **Actores** | **Actor**  |
|  | Docente |
|  |  |
| **Comentarios** | \- |

| RF-003 | Visualización de Secuencias |
| :---: | ----- |
| **Versión** | 1 |
| **Autores** | Jonathan Quispe Maldonado y Juan Rivas Ibañes |
| **Fuentes** | Plan de Proyecto (V7) / Acta R-01 |
| **Objetivos asociados** | **OBJ-002**: Reproducción de Contenido Interactivo |
| **Descripción** | El sistema deberá permitir al usuario: Navegar por una secuencia de “slides” o temas compuestos compuestos por multiple bloques.  |
| **Actores** | **Actor**  |
|  | Docente |
|  | Estudiante |
| **Comentarios** | \- |

| RF-004 | Interactividad en Bloques Complejos |
| :---: | ----- |
| **Versión** | 1 |
| **Autores** | Jonathan Quispe Maldonado y Juan Rivas Ibañes |
| **Fuentes** | Plan de Proyecto (V7) / Acta R-01 |
| **Objetivos asociados** | **OBJ-002**: Reproducción de Contenido Interactivo |
| **Descripción** | El bloque complejo permitirá la nevegación por: Hitos historicos o procesos mostrando detalles especificos de cada punto.  |
| **Actores** | **Actor**  |
|  | Estudiante |
|  |  |
| **Comentarios** | \- |

| RF-005 | Generación de Audio (TTS) |
| :---: | ----- |
| **Versión** | 1 |
| **Autores** | Jonathan Quispe Maldonado y Juan Rivas Ibañes |
| **Fuentes** | Plan de Proyecto (V7) / Acta R-01 |
| **Objetivos asociados** | **OBJ-003**: Procesamiento y Generación de Audio (TTS) |
| **Descripción** | El sistema generará y reproducirá: Audio a partir de texto contenido en los bloques, con controles de reproduccion (Play/Pausa/Stop)  |
| **Actores** | **Actor**  |
|  | Estudiante |
|  | Docente |
| **Comentarios** | \- |

| RF-006 | Persistencia de Datos |
| :---: | ----- |
| **Versión** | 1 |
| **Autores** | Jonathan Quispe Maldonado y Juan Rivas Ibañes |
| **Fuentes** | Plan de Proyecto (V7) / Acta R-01 |
| **Objetivos asociados** | **OBJ-004**: Compatibilidad e Integración con LMS |
| **Descripción** | El sistema debe ser capaz de realizar las siguientes operaciones sobre las estructuras de datos de los cursos y el estado de los bloques (inicialmente mediante mocks/JSON): Almacenar Recuperar   |
| **Actores** | **Actor**  |
|  | Docente |
|  |  |
| **Comentarios** | \- |

**Requisitos No Funcionales (RNF)**

Los requisitos no funcionales (RNF) definen los atributos de calidad del sistema, como rendimiento, usabilidad y seguridad. Estos son vitales para la aceptación del producto por parte del cliente y para la gobernanza de la PMO.

| RNF-001 | Usabilidad (UX/UI) |
| :---: | ----- |
| **Versión** | 1 |
| **Autores** | Jonathan Quispe Maldonado y Juan Rivas Ibañes |
| **Fuentes** | Restricción de Negocio/Estándares |
| **Objetivos asociados** |  |
| **Descripción** | La interfaz debe ser: Responsive Directrices de diseño limpio y moderno definidas en el manual de estilo. |
| **Comentarios** |  |

| RNF-002 | Rendimiento |
| :---: | ----- |
| **Versión** | 1 |
| **Autores** | Jonathan Quispe Maldonado y Juan Rivas Ibañes |
| **Fuentes** | Entorno Tecnológico (Serverless) |
| **Objetivos asociados** |  |
| **Descripción** | El tiempo de carga de un tema interactivo no debe superar los 2 segundos en condiciones normales de red. |
| **Comentarios** |  |

| RNF-003 | Seguridad |
| :---: | ----- |
| **Versión** | 1 |
| **Autores** | Jonathan Quispe Maldonado y Juan Rivas Ibañes |
| **Fuentes** | Estandares / Integracion LMS |
| **Objetivos asociados** |  |
| **Descripción** | El sistema debe implementar cabeceras CSP (Content Security Policy) para permitir su ejecución segura dentro de iFrames de terceros (LMS). |
| **Comentarios** |  |

| RNF-004 | Mantenibilidad (Código) |
| :---: | ----- |
| **Versión** | 1 |
| **Autores** | Jonathan Quispe Maldonado y Juan Rivas Ibañes |
| **Fuentes** | Restriccion Metodológica (PMO) |
| **Objetivos asociados** |  |
| **Descripción** | El código debe estar documentado y poseer una cobertura de pruebas unitarias (Vitest) superior al 70%. |
| **Comentarios** | Indicador clave para la supervisión de calidad (PMO). |

| RNF-005 | Interoperabilidad (Estandares) |
| :---: | ----- |
| **Versión** | 1 |
| **Autores** | Jonathan Quispe Maldonado y Juan Rivas Ibañes |
| **Fuentes** | Entorno Tecnológico (LTI/SCORM) |
| **Objetivos asociados** |  |
| **Descripción** | La arquitectura debe estar preparada para la implementación del protocolo de OAuth2 requerido por el estándar LTI v1.3. |
| **Comentarios** | Vinculado al Objetivo OBJ-003. |

| RNF-006 | Disponibilidad (Soporte) |
| :---: | ----- |
| **Versión** | 1 |
| **Autores** | Jonathan Quispe Maldonado y Juan Rivas Ibañes |
| **Fuentes** | Entorno Tecnológico (TTS) / Gestión de Riesgos |
| **Objetivos asociados** |  |
| **Descripción** | El sistema debe ofrecer un modo “fallback” de audio (Web Speech API) en caso de fallo del proveedor principal de TTS. |
| **Comentarios** | Mitiga el riesgo tecnológico R01. |

### **Matriz de Trazabilidad Objetivos-Requisitos**

Para exponer la relacion entre los Objetivos-Requisitos utilizamos una tabla de doble entrada donde se cruzan los objetivos del sistema (extraídos de la sección **1.1.1 Objetivos del Sistema**) con el Catálogo de Requisitos (sección **2.1 Catálogo de Requisitos**), utilizando una marca (por ejemplo, 'X') para indicar la relación.

| Código de Requisito | Nombre Descriptivo del Requisito | OBJ-001 | OBJ-002 | OBJ-003 | OBJ-004  |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **RF-001** | Modo Docente/ Modo Lector | X |  |  |  |
| **RF-002** | Gestión de Bloques Básicos | X |  |  |  |
| **RF-003** | Visualización de Secuencias |  | X |  |  |
| **RF-004** | Interactividad en Bloques Complejos |  | X |  |  |
| **RF-005** | Generación de Audio (TTS) |  |  | X |  |
| **RF-006** | Persistencia de Datos | X |  |  | X |
| **RNF-001** | Usabilidad (UX/UI) |  | X |  |  |
| **RNF-002** | Rendimiento |  |  | X |  |
| **RNF-005** | Interoperabilidad (Estandares) |  |  |  | X |

La inclusión de ambos tipos de requisitos en la matriz garantiza que cada Objetivo del Sistema (Sección 1.1.1) esté cubierto por la **funcionalidad** necesaria y la **calidad** requerida para la aceptación por parte del cliente.

Los **RF** deben estar incluidos para asegurar la trazabilidad de las acciones del sistema con el propósito estratégico definido.

Los **RNF** deben incluirse porque son los que cubren los aspectos de calidad, rendimiento y cumplimiento de las restricciones, elementos que la PMO ha calificado como Vitales para la aceptación del proyecto.

2. ## ***Especificación de Casos de Uso*** {#especificación-de-casos-de-uso}

   1. ### **Identificación y definición de Actores** {#identificación-y-definición-de-actores}

La siguiente tabla consolida los actores del sistema, incluyendo el rol de control interno, que es esencial para la gobernanza y la trazabilidad, de acuerdo con los estándares de la PMO (Control de Accesos UC-18 y Gestión de Roles UC5).

| ID Actor | Nombre del Actor | Descripción | Nivel de Privilegio |
| :---- | :---- | :---- | :---- |
| **ACT-01** | **Docente** | Usuario encargado de acceder al módulo Docente. Tiene capacidad para crear, estructurar (Course Structure Panel), modificar bloques (Texto, Imagen, Carrusel, Timeline) y configurar propiedades (Module Settings). | Alto (Escritura/Edición) |
| **ACT-02** | **Estudiante** | Usuario que accede al módulo Player. Interactúa con el contenido renderizado de forma secuencial, reproduce audio (TTS), navega por la línea de tiempo y visualiza recursos. | Bajo (Solo Lectura/Interacción) |
| **ACT-03** | **Administrador (Supervisor Humano)** | Rol de gobierno responsable de la validación, aprobación de políticas y supervisión de los Asistentes IA. Único con permisos para anular o modificar la configuración core. | Máximo (Control y Supervisión) |
| **ACT-04** | **Asistente IA (Sistema Automático)** | **Entidad no humana que ejecuta tareas autónomas de bajo nivel (p.ej., registro de auditoría, gestión de usuarios de rutina, ejecución de políticas predefinidas)**. Representa al actor Sistema (Automático) mencionado en CU-06 y otros casos de uso de gestión delegada. | Medio (Bajo Supervisión Humana) |

2. ### **Diagrama de Casos de Uso**  {#diagrama-de-casos-de-uso}

Diagrama de casos de uso.

3. ### **Especificación de Casos de uso** {#especificación-de-casos-de-uso-1}

A continuación se realiza la especificación de casos de uso, detallando la operativa que tiene  
lugar en cada caso de uso, según la toma de requisitos que se ha realizado.

|  |  |
| ----- | :---- |
| **CU-01** | **Crear y estructurar módulos del curso** |
| **Descripción** | Permite al Docente definir la jerarquía organizativa del curso (secciones y lecciones). |
| **Actores** | Docente, Administrador del Sistema  |
| **Precondición** | El usuario tiene sesión activa y permisos de escritura en la carpeta de destino. |
| **Flujo Normal** | 1\. El Docente selecciona "Nuevo Curso".  2\. El sistema muestra el panel de estructura.  3\. El Docente añade un módulo e introduce el nombre.  4\. El sistema valida la unicidad del nombre.  5\. El sistema confirma la creación. |
| **Flujos Alternativos** | **4a. Nombre Duplicado:** El sistema avisa y solicita un nombre distinto. |
| **Postcondición** | El nuevo módulo queda registrado con un ID único. |
| **Observaciones** | Máximo 3 niveles de profundidad (Curso, Modulo, Unidad) |

|  |  |
| ----- | ----- |
| **CU-02** | **Configurar bloques multimedia** |
| **Descripción** | Edición del contenido visual y textual (Texto, Imagen, Timeline) de una página. |
| **Actores** | Docente |
| **Precondición** | Existe al menos un módulo creado y seleccionado. |
| **Flujo Normal** | 1\. El Docente arrastra un bloque al área central.  2\. El sistema habilita el panel de propiedades.  3\. El Docente introduce contenido o sube archivos.  4\. El sistema valida formatos (JPG, PNG, MP4).  5\. El Docente aplica los cambios. |
| **Flujos Alternativos** | **4a. Formato Inválido:** El sistema informa la incompatibilidad y cancela la subida. |
| **Postcondición** | El bloque queda vinculado al módulo en el buffer de edición. |
| **Observaciones** |  |

## 

|  |  |
| ----- | ----- |
| **CU-03** | **Navegar contenido secuencial (Paginación)** |
| **Descripción** | Control del avance del estudiante por las lecciones del curso. |
| **Actores** | Estudiante |
| **Precondición** | El Estudiante ha accedido a un curso activo. |
| **Flujo Normal** | 1\. El Estudiante pulsa "Siguiente".  2\. El sistema comprueba si el bloque actual requiere finalización obligatoria.  3\. El sistema carga el contenido del nuevo índice. |
| **Flujos Alternativos** | **2a. Bloqueo Avance:** Mensaje: "Debe completar la actividad antes de continuar". |
| **Postcondición** | Se actualiza el progreso del usuario. |
| **Observaciones** |  |

| CU-04 | Reproducir audio (TTS) bajo demanda |
| :---- | :---- |
| **Descripción** | Síntesis de voz del texto en pantalla para accesibilidad. |
| **Actores** | Estudiante |
| **Precondición** | Sonido habilitado y acceso a la API TTS. |
| **Flujo Normal** | El Estudiante pulsa el icono de audio sobre un bloque de texto. El sistema verifica si existe una versión en caché del audio para ese texto. El sistema (si no hay caché) envía el texto y el perfil de voz a la API externa (Azure/OpenAI). El sistema recibe el flujo de datos (Stream) de audio. El sistema activa el reproductor web y sincroniza visualmente el texto (Highlighting). |
| **Flujos Alternativos** | **2a. Audio en Caché:** El sistema omite el paso 3 y 4, reproduciendo el archivo local para ahorrar costes de API. **3a. Error de API/Cuota:** Si la API devuelve error (timeout o falta de saldo), el sistema muestra un mensaje: "Servicio de audio temporalmente no disponible" y permite continuar la lectura visual. |
| **Postcondición** | El audio se reproduce sincrónicamente. |
| **Observaciones** |  |

## 

|  |  |
| ----- | ----- |
| **CU-05** | **Gestionar roles y permisos (RBAC)** |
| **Descripción** | Control de acceso basado en perfiles (Admin, Docente, Estudiante). |
| **Actores** | Administrador |
| **Precondición** | Acceso con perfil de super-usuario. |
| **Flujo Normal** | 1\. El Administrador selecciona un rol.  2\. El sistema muestra permisos.  3\. El Administrador Modifica y guarda. 4\. El sistema aplica los cambios. |
| **Flujos Alternativos** |  |
| **Postcondición** | Los cambios afectan a los usuarios del rol de forma inmediata. |
| **Observaciones** |  |

| CU-06 | Auditar uso del sistema y trazabilidad de eventos |
| :---- | :---- |
| **Descripción** | Registro automático de acciones críticas para cumplimiento normativo. |
| **Actores** | Sistema (Automático) |
| **Precondición** | Motor de auditoría activo. |
| **Flujo Normal** | 1\. Se detecta acción crítica.  2\. El sistema captura: Fecha, UserID, Acción, IP.  3\. Escribe en log cifrado. |
| **Flujos Alternativos** |  |
| **Postcondición** | Registro forense generado exitosamente. |
| **Observaciones** |  |

|  |  |
| ----- | ----- |
| **CU-07** | **Añadir componentes al Canvas interactivo** |
| **Descripción** | Inserción de elementos dinámicos (nodos) en el lienzo de simulación. |
| **Actores** | Docente |
| **Precondición** | El Docente ha abierto la vista de edición de Canvas. |
| **Flujo Normal** | 1\. El Docente selecciona un componente de la biblioteca. 2\. El Docente hace clic en la posición del Canvas. 3\. El sistema posiciona el elemento y le asigna un nombre por defecto. |
| **Flujos Alternativos** |  |
| **Postcondición** | El nodo queda registrado con sus coordenadas X, Y. |
| **Observaciones** |  |

| CU-08 | Configurar propiedades de nodo (Variables lógicas) |
| :---- | :---- |
| **Descripción** | El sistema permite al Docente programar comportamientos reactivos en los elementos del Canvas mediante una gramática simplificada. |
| **Actores** | Docente |
| **Precondición** | El nodo ya ha sido añadido al Canvas (CU-07). |
| **Flujo Normal** | 1\. El Docente selecciona un nodo y abre "Propiedades Lógicas".  2\. Define una regla (Ej: Si X=1, entonces Visible=True).  3\. El sistema verifica la integridad de la regla.  4\. El sistema guarda la configuración. |
| **Flujos Alternativos** | **3a. Regla Inválida:** El sistema resalta en rojo el error y bloquea el guardado. |
| **Postcondición** | El nodo almacena un objeto de lógica validado en el JSON del curso. |
| **Observaciones** | Utiliza gramática simplificada basada en JavaScript. |

| CU-09 | Ejecutar simulación en Canvas interactivo |
| :---- | :---- |
| **Descripción** | Interacción del estudiante con los elementos lógicos programados. |
| **Actores** | Estudiante |
| **Precondición** | La página actual contiene un componente Canvas activo. |
| **Flujo Normal** | 1\. El Estudiante actúa sobre un elemento.  2\. El motor de lógica procesa la entrada (CU-08).  3\. El sistema actualiza el Canvas visualmente. |
| **Flujos Alternativos** |  |
| **Postcondición** | El estado de la simulación cambia según interacción. |
| **Observaciones** |  |

|  |  |
| :---- | ----- |
| **CU-10** | **Iniciar audioguía automatizada** |
| **Descripción** | Modo manos libres donde el sistema narra y avanza solo. |
| **Actores** | Estudiante |
| **Precondición** | El curso tiene configurada la secuencia de audioguía. |
| **Flujo Normal** | 1\. El Estudiante activa "Modo Audioguía".  2\. El sistema inicia el CU-04.  3\. Al terminar, dispara el CU-03 tras un retardo de 2s. |
| **Flujos Alternativos** |  |
| **Postcondición** | El curso avanza autónomamente hasta el final. |
| **Observaciones** |  |

## 

|  |  |
| ----- | :---- |
| **CU-11** | **Generar y Exportar Reportes de progreso** |
| **Descripción** | Análisis y exportación de KPIs de aprendizaje. |
| **Actores** | Administrador, Docente |
| **Precondición** | Existen datos de interacción en el sistema. |
| **Flujo Normal** | 1\. Selecciona filtros.  2\. Sistema procesa KPIs.  3\. Descarga en PDF/CSV. |
| **Flujos Alternativos** |  |
| **Postcondición** | Archivo generado para descarga. |
| **Observaciones** |  |

| CU-12 | Previsualizar curso en modo edición (Draft Preview) |
| :---- | :---- |
| **Descripción** | Ejecución de la versión de trabajo para pruebas del Docente. |
| **Actores** | Docente |
| **Precondición** | Existen cambios sin publicar. |
| **Flujo Normal** | 1\. El Docente pulsa "Preview".  2\. El sistema compila el JSON temporal y lanza el Player en un Iframe.  3\. El sistema carga las APIs simuladas. |
| **Flujos Alternativos** |  |
| **Postcondición** | El Docente interactúa con el curso en un entorno seguro. |
| **Observaciones** |  |

|  |  |
| ----- | ----- |
| **CU-13** | **Guardar estado/borrador del curso** |
| **Descripción** | Persistencia manual o automática de la edición actual. |
| **Actores** | Docente |
| **Precondición** | Hay cambios pendientes en la sesión actual. |
| **Flujo Normal** | 1\. El sistema inicia el proceso de guardado (Auto-save o clic).  2\. El sistema envía el objeto JSON al servidor.  3\. El sistema confirma el éxito. |
| **Flujos Alternativos** |  |
| **Postcondición** | El curso se guarda con estado "DRAFT" en la base de datos. |
| **Observaciones** |  |

| CU-14 | Publicar y versionar curso (Release) |
| :---- | :---- |
| **Descripción** | Proceso de cierre de edición para generar un paquete compatible con LMS (Moodle/Blackboard). |
| **Actores** | Docente, Administrador |
| **Precondición** | El curso está en estado "Guardado" (CU-13) y sin errores críticos. |
| **Flujo Normal** | El usuario solicita "Publicar Versión" desde el Dashboard. El sistema inicia un **Chequeo de Integridad de Datos** (verifica que no haya páginas vacías o audios TTS fallidos). El sistema muestra un resumen del contenido y solicita etiqueta de versión (Ej: v1.0.4) y notas de cambio. El sistema compila el JSON definitivo y empaqueta los assets multimedia. El sistema genera el manifiesto de compatibilidad (imsmanifest.xml para SCORM). El sistema registra la publicación en el log de auditoría (CU-06). El sistema ofrece el enlace de descarga del paquete comprimido (.zip). |
| **Flujos Alternativos** | **2a. Fallo de Integridad:** El sistema presenta una lista de "Bloqueos de Publicación" (Ej: "La página 3 no tiene contenido"). El proceso se cancela. **5a. Error de Compilación:** Si falla la generación del paquete, el sistema revierte el estado y notifica al Administrador. |
| **Postcondición** | Generación de paquete SCORM/LTI y bloqueo de la versión actual. |
| **Observaciones** |  |

| CU-15 | Clonar o duplicar módulos existentes |
| :---- | :---- |
| **Descripción** | Reutilización de estructuras pedagógicas ya creadas. |
| **Actores** | Docente |
| **Precondición** | Existe un módulo origen. |
| **Flujo Normal** | 1\. El Docente selecciona "Duplicar" en el menú contextual.  2\. El sistema copia la estructura y el Canvas asociado.  3\. El sistema solicita la ubicación de destino. |
| **Flujos Alternativos** |  |
| **Postcondición** | Se crea una instancia independiente del módulo. |
| **Observaciones** |  |

|  |  |
| ----- | ----- |
| **CU-16** | **Pausar, reanudar o reiniciar estado de la simulación** |
| **Descripción** | Control sobre el estado dinámico del motor interactivo. |
| **Actores** | Estudiante |
| **Precondición** | Una simulación está cargada en el Player. |
| **Flujo Normal** | 1\. El Estudiante pulsa "Reiniciar".  2\. El sistema restablece variables lógicas a valores iniciales.  3\. El Canvas vuelve al estado original. |
| **Flujos Alternativos** |  |
| **Postcondición** | Se limpian los cambios de la sesión interactiva actual. |
| **Observaciones** |  |

| CU-17 | Configurar preferencias de accesibilidad |
| :---- | :---- |
| **Descripción** | Personalización de la interfaz (Tamaño fuente, contraste, velocidad voz). |
| **Actores** | Estudiante |
| **Precondición** | Sesión iniciada. |
| **Flujo Normal** | 1\. El Estudiante accede a "Ajustes".  2\. Modifica parámetros.  3\. El sistema aplica cambios CSS y de voz instantáneamente. |
| **Flujos Alternativos** |  |
| **Postcondición** | Preferencias guardadas en el perfil de usuario. |
| **Observaciones** |  |

## 

| CU-18 | Autenticación e inicio de sesión (Login/SSO) |
| :---- | :---- |
| **Descripción** | Identificación segura para acceso a la plataforma. |
| **Actores** | Todos los usuarios |
| **Precondición** | Usuario registrado previamente. |
| **Flujo Normal** | 1\. Usuario introduce Email/Password.  2\. El sistema valida contra DB cifrada.  3\. Redirige al Dashboard. |
| **Flujos Alternativos** | **2a. Error:** Aviso y reintento. Tras 3 fallos, bloqueo de cuenta. |
| **Postcondición** | Token de sesión JWT generado. |
| **Observaciones** |  |

| CU-19 | Gestión de Usuarios (CRUD) |
| :---- | :---- |
| **Descripción** | Administración del ciclo de vida de las cuentas de usuario. |
| **Actores** | Administrador |
| **Precondición** | Perfil Administrador activo. |
| **Flujo Normal** | 1\. El Administrador selecciona "Nuevo Usuario".  2\. Introduce datos y Rol.  3\. Sistema envía email de activación. |
| **Flujos Alternativos** |  |
| **Postcondición** | Usuario creado en DB. |
| **Observaciones** |  |

| CU-20 | Asignar y revocar acceso a cursos |
| :---- | :---- |
| **Descripción** | Gestión de matriculaciones individuales o por grupos. |
| **Actores** | Administrador, Docente |
| **Precondición** | Curso publicado (CU-14). |
| **Flujo Normal** | 1\. Selecciona curso y estudiante.  2\. Pulsa "Asignar".  3\. Sistema notifica al alumno. |
| **Flujos Alternativos** |  |
| **Postcondición** | Relación User\_Course actualizada. |
| **Observaciones** |  |

| CU-21 | Configurar parámetros globales y claves de API |
| :---- | :---- |
| **Descripción** | Mantenimiento técnico de integraciones externas. |
| **Actores** | Administrador |
| **Precondición** | Conocimiento técnico de las APIs. |
| **Flujo Normal** | 1\. Accede a "Integraciones".  2\. Actualiza claves (OpenAI, Azure, etc.).  3\. Sistema valida conexión con test. |
| **Flujos Alternativos** | **3a. Test Fallido:** No guarda y solicita revisión de clave. |
| **Postcondición** | Sistema configurado con nuevos parámetros. |
| **Observaciones** |  |

| CU-22 | Consultar Log de Auditoría |
| :---- | :---- |
| **Descripción** | Visualización de eventos de seguridad registrados. |
| **Actores** | Administrador |
| **Precondición** | Registros previos en CU-06. |
| **Flujo Normal** | 1\. Accede al visor.  2\. Filtra por fecha o usuario.  3\. Sistema muestra tabla paginada. |
| **Flujos Alternativos** |  |
| **Postcondición** |  |
| **Observaciones** |  |

4. ### **Casos de Uso de Alta Relevancia**

Al identificar aquellos procesos que constituyen el "núcleo" o *core business*. Para **Viz-App**, la relevancia se mide por su impacto en la **mitigación de la pasividad estudiantil** y la **viabilidad técnica**. Por este motivo se presenta la siguiente relacion de casos de uso de alta relevancia.

| Código | Casos de Uso | Objetivo Vinculado | Justificación de Relevancia |
| :---- | :---- | :---- | :---- |
| **CU-08**  | **Configurar propiedades de nodo**  | OBJ-001  | Es el cerebro del sistema. Permite la interactividad real mediante lógica reactiva. Técnicamente, es el de mayor complejidad (parsing de reglas).  |
| **CU-14** | **Publicar y versionar curso**  | OBJ-004  | Es el "punto de no retorno". Sin este proceso, el contenido no puede salir al LMS (SCORM/LTI). Garantiza la integridad del producto final.  |
| **CU-02**  | **Configurar bloques multimedia**  | OBJ-001  | Representa el grueso de la experiencia del Docente. Si la edición es tediosa, el proyecto falla por falta de adopción (UX).  |
| **CU-09** | **Ejecutar simulación en Canvas**  | OBJ-002 | Es el valor entregado al estudiante. Es donde se materializa la "participación activa" frente a la visualización pasiva.  |
| **CU-04**  | **Reproducir audio (TTS)**  | OBJ-003  | Diferenciador estratégico. Cubre normativas de accesibilidad y diversidad, siendo un requisito "Vital" según el Plan de Proyecto.  |

5. ### **Matriz de Trazabilidad Requisitos – Casos de Uso** {#matriz-de-trazabilidad-requisitos-–-casos-de-uso}

| Objetivos / CU | OBJ-001 | OBJ-002 | OBJ-003 | OBJ-004 | Justificación PMO |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **CU-01** | X |  |  |  | Soporta la jerarquía pedagógica (OBJ-001). |
| **CU-02:**  | X |  |  |  | Definición de contenido interactivo (OBJ-001). |
| **CU-03:**  |  | X |  |  | Flujo de experiencia del estudiante (OBJ-002). |
| **CU-04:**  |  | X | X |  | Interfaz accesible y salida de audio (OBJ-002/003). |
| **CU-05:**  |  |  |  |  | Transversal (Gobernanza y Seguridad). |
| **CU-06:**  |  |  |  |  | Transversal (Cumplimiento Normativo). |
| **CU-07:**  | X |  |  |  | Núcleo de la creación interactiva (OBJ-001). |
| **CU-08:**  | X |  |  |  | Comportamiento reactivo avanzado (OBJ-001). |
| **CU-09:**  |  | X |  |  | Reproducción de simulaciones (OBJ-002). |
| **CU-10:**  |  | X | X |  | Experiencia inmersiva y automatizada (OBJ-002/003). |
| **CU-11:**  |  |  |  |  | Transversal (Seguimiento del Aprendizaje). |
| **CU-12:**  | X | X |  |  | Validación previa a la publicación (OBJ-001/002). |
| **CU-13:**  | X |  |  |  | Persistencia del trabajo del docente (OBJ-001). |
| **CU-14:**  | X |  |  | X | Empaquetado final y exportación LMS (OBJ-001/004). |
| **CU-15:**  | X |  |  |  | Eficiencia en la creación de contenido (OBJ-001). |
| **CU-16:**  |  | X |  |  | Control del estado del Player (OBJ-002). |
| **CU-17:**  |  | X |  |  | Personalización de la interfaz (OBJ-002). |
| **CU-18:**  |  |  |  |  | Transversal (Seguridad de Acceso). |
| **CU-19:**  |  |  |  |  | Transversal (Administración). |
| **CU-20:**  |  |  |  | X | Integración de matrícula con el LMS (OBJ-004). |
| **CU-21:**  |  |  | X | X | Soporte técnico para TTS y LMS (OBJ-003/004). |
| **CU-22:**  |  |  |  |  | Transversal (Control). |

### **Análisis de Cobertura (Visión PMO)**

1. **Objetivos Críticos:** \- El **OBJ-001** (Gestión de Contenido) y **OBJ-002** (Reproducción) concentran el 60% de los Casos de Uso, lo cual es coherente con la visión de mitigar la pasividad estudiantil.

   El **OBJ-004** (Integración LMS) tiene menos CUs, pero son de alta criticidad técnica (**CU-14** y **CU-21**), ya que involucran estándares externos (SCORM).

2. **Casos de Uso Transversales:**

   Los CUs de Administración (05, 06, 11, 18, 19, 22\) no están mapeados directamente a los 4 objetivos principales del cliente, pero son **requisitos de soporte** obligatorios por estándares de arquitectura y seguridad del sistema.

3. **Riesgo Detectado:**

   Existe una fuerte dependencia del **OBJ-003** (TTS) en el **CU-21**. Si la configuración de claves falla, se caen funcionalmente el CU-04 y el CU-10.

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

4. # **ANÁLISIS DE LAS CLASES POR SUBSISTEMAS** {#análisis-de-las-clases-por-subsistemas}

Incorporar el diagrama de paquetes de clases de negocio. Si la distribución en paquetes es idéntica la de subsistemas, no hará falta este diagrama.

Se pretende realizar una aproximación inicial a las clases de negocio que pueden formar parte de la solución, aunque posteriormente pueda refinarse en distintas fases del análisis o ya en el diseño.

1. ## ***Paquetes de clases de negocio***  {#paquetes-de-clases-de-negocio}

Siguiendo la metodología **MÉTRICA v3**, se identifican las clases de negocio (entidades) y de control necesarias para satisfacer los Casos de Uso. Se utiliza el patrón **BCE (Boundary-Control-Entity)** para asegurar la separación de responsabilidades.

Se ha diseñado un modelo de clases de negocio que refleja la jerarquía de contenidos de Viz-App. La distribución en paquetes es idéntica a la de los subsistemas identificados en el apartado 3\.

**Diagrama**

**Figura 4.1: Modelo del Negocio del Sistema Viz-App** (Diagrama que muestra la jerarquía: Usuario \-\> Curso \-\> Módulo \-\> Bloque, con especialización en Bloques Interactivos y TTS)

1. ### **Subsistema “SUB-01 \- Gestión de Contenidos (Editor)”**

Este subsistema se centra en el modelo de persistencia y la lógica de construcción de contenido.

Diagrama de clases de negocio del subsistema, que incorpore asociaciones y herencia. Pueden incluirse clases de otros paquetes, si es necesario.

| CN-0001: Curso |  |  |  |
| :---- | :---- | :---- | :---- |
| **Responsabilidades** | Actúa como raíz del agregado |  |  |
|  | Coordina la publicación |  |  |
|  | Mantiene la integridad referencial de sus módulos |  |  |
| **Atributos** | **Nombre** | **Tipo** | **Descripción** |
|  | idCurso | UUID | Identificador único inmutable |
|  | titulo | String | Nombre descriptivo. |
|  | version | String | Siguiendo esquema SemVer (Ej: 1.0.2) |
|  | estado | Enum | DRAFT, PUBLISHED, ARCHIVED. (borrador, publicado, guardado) |
| **Relaciones** | Composición (1:N) con Modulo |  |  |
| **Participación en Casos de Uso** | CU-01: Nombre\_del\_caso\_de\_uso \- Participación |  |  |
|  | CU-12: Nombre\_del\_caso\_de\_uso \- Participación |  |  |
|  | CU-14: Nombre\_del\_caso\_de\_uso \- Participación |  |  |

| CN-0002: Modulo (Clase añadida por omisión en el borrador) |  |  |  |
| :---- | :---- | :---- | :---- |
| **Responsabilidades** | Agrupar unidades didácticas |  |  |
|  | gestionar el flujo de navegación interna del módulo |  |  |
|  |  |  |  |
| **Atributos** | **Nombre** | **Tipo** | **Descripción** |
|  | idModulo | String |  |
|  | orden | Integer |  |
|  |  |  |  |
|  |  |  |  |
| **Participación en Casos de Uso** | CU-01: Nombre\_del\_caso\_de\_uso \- Participación |  |  |
|  | CU-15: Nombre\_del\_caso\_de\_uso \- Participación |  |  |

| CN-0003:  BloqueContenido (Clase Abstracta / Especialización) |  |  |  |
| :---- | :---- | :---- | :---- |
| **Responsabilidades** | Clase base para los elementos del Canvas. |  |  |
|  |  |  |  |
|  |  |  |  |
| **Atributos** | **Nombre** | **Tipo** | **Descripción** |
|  | idBloque | String |  |
|  | posicionX | Float |  |
|  | posicionY | Float |  |
|  | configuracionLogica | JSON |  Reglas definidas en CU-08. |
| **Especializaciones** | BloqueMultimendia, BloqueInteractivo, BloqueTexto |  |  |
| **Participación en Casos de Uso** | CU-02: Nombre\_del\_caso\_de\_uso \- Participación |  |  |
|  | CU-07: Nombre\_del\_caso\_de\_uso \- Participación |  |  |
|  | CU-08: Nombre\_del\_caso\_de\_uso \- Participación |  |  |

También puede incorporarse algún diagrama UML que represente el comportamiento de las clases, como un diagrama de actividad, de secuencia o de colaboración.

2. ### **Subsistema “SUB-02 \- Reproducción e Interactividad (Player)”**

Clases dinámicas que gestionan el estado de la sesión del estudiante.

Diagrama de clases de negocio del subsistema, que incorpore asociaciones y herencia. Pueden incluirse clases de otros paquetes, si es necesario.

| CN-0004:  EnginePlayer (Clase de Control) |  |  |
| :---- | :---- | :---- |
| **Responsabilidades** | Orquestador de la ejecución |  |
|  | Carga el paquete SCORM/JSON |  |
|  | Interpreta las reglas de BloqueContenido |  |
|  | Gestiona el estado de las variables en tiempo real |  |
| **Métodos Clave** | **Nombre** | **Descripción** |
|  | init() |  |
|  | evaluarRegla() |  |
|  | actualizarProgreso() |  |
| **Participación en Casos de Uso** | CU-03: Nombre\_del\_caso\_de\_uso \- Participación |  |
|  | CU-09: Nombre\_del\_caso\_de\_uso \- Participación |  |
|  | CU-12: Nombre\_del\_caso\_de\_uso \- Participación |  |
|  | CU-16: Nombre\_del\_caso\_de\_uso \- Participación |  |

| CN-0005: ServicioTTS (Clase de Interfaz/Servicio) |  |  |  |
| :---- | :---- | :---- | :---- |
| **Responsabilidades** | Fachada (Facade) para la comunicación con la API externa |  |  |
|  | Implementa el patrón *Adapter* para facilitar el cambio entre proveedores (Azure, OpenAI, etc.) |  |  |
|  |  |  |  |
| **Atributos** | **Nombre** | **Tipo** | **Descripción** |
|  | apiKey | Encrypted |  |
|  | idiomaConfigurado | String |  |
|  |  |  |  |
|  |  |  |  |
| **Participación en Casos de Uso** | CU-04: Nombre\_del\_caso\_de\_uso \- Participación |  |  |
|  | CU-10: Nombre\_del\_caso\_de\_uso \- Participación |  |  |
|  | CU-21: Nombre\_del\_caso\_de\_uso \- Participación |  |  |

También puede incorporarse algún diagrama UML que represente el comportamiento de las clases, como un diagrama de actividad, de secuencia o de colaboración.

3. ### **Subsistema “SUB-03 \- Administración, Seguridad y Reportes (Core)”**

Este subsistema constituye el núcleo de servicios transversales. Su diseño prioriza la seguridad de los datos y el cumplimiento normativo mediante el registro forense de actividades.

Diagrama de clases de negocio del subsistema, que incorpore asociaciones y herencia. Pueden incluirse clases de otros paquetes, si es necesario.

| CN-0006:  Usuario |  |  |  |
| :---- | :---- | :---- | :---- |
| **Responsabilidades** | Representar la identidad en el sistema. |  |  |
|  | Almacenar credenciales y perfil de acceso |  |  |
|  |  |  |  |
| **Atributos** | **Nombre** | **Tipo** | **Descripción** |
|  | idUsuario | UUID | Identificador único |
|  | email | String | Correo electrónico (identificador de login) |
|  | passwordHash | String | Hash de la contraseña (nunca texto plano) |
|  | ultimoAcceso | DateTime | Registro de actividad para el control de sesiones inactivas. |
| **Relaciones** | Asociación (N:1) con Rol |  |  |
| **Participación en Casos de Uso** | CU-18: Nombre\_del\_caso\_de\_uso \- Participación |  |  |
|  | CU-19: Nombre\_del\_caso\_de\_uso \- Participación |  |  |
|  | CU-20: Nombre\_del\_caso\_de\_uso \- Participación |  |  |

| CN-0007:  Rol / Permiso |  |  |  |
| :---- | :---- | :---- | :---- |
| **Responsabilidades** | Definir las capacidades del usuario (RBAC) |  |  |
|  | Permite desacoplar el usuario de sus funciones específicas. |  |  |
|  |  |  |  |
| **Atributos** | **Nombre** | **Tipo** | **Descripción** |
|  | nombreRol | Enum | ADMIN, DOCENTE, ESTUDIANTE |
|  | listaPermisos | Array\<String\> | Ej. \["CREATE\_COURSE", "VIEW\_REPORTS"\] |
|  |  |  |  |
|  |  |  |  |
| **Participación en Casos de Uso** | CU-05: Nombre\_del\_caso\_de\_uso \- Participación |  |  |
|  |  |  |  |
|  |  |  |  |

| CN-0008:  RegistroAuditoria (Entidad) |  |  |  |
| :---- | :---- | :---- | :---- |
| **Responsabilidades** | Persistencia de eventos críticos para trazabilidad forense |  |  |
|  | Debe ser de solo-escritura (Append-only). |  |  |
|  |  |  |  |
| **Atributos** | **Nombre** | **Tipo** | **Descripción** |
|  | idLogin | Long | Identificador inalterable. |
|  | timestamp | DateTime | Fecha y hora exacta (UTC). |
|  | idUsuario | UUID | Quién realizó la acción. |
|  | accion | String | Descripción del evento (Ej: "Publicación de curso v1.2"). |
|  | ipOrigen | ipOrigen | Dirección IP para auditoría de seguridad. |
| **Participación en Casos de Uso** | CU-06: Nombre\_del\_caso\_de\_uso \- Participación |  |  |
|  | CU-22: Nombre\_del\_caso\_de\_uso \- Participación |  |  |
|  |  |  |  |

| CN-0009:  GestorReportes (Clase de Control) |  |  |
| :---- | :---- | :---- |
| **Responsabilidades** | Agregar datos de interacción del estudiante |  |
|  | Calcular KPIs de progreso |  |
|  | Transformar los resultados en formatos exportables (PDF/CSV) |  |
|  |  |  |
| **Métodos Clave** | **Nombre** | **Descripción** |
|  | obtenerMetricasCurso() |  |
|  | formatearSalida() |  |
|  | exporta() |  |
| **Participación en Casos de Uso** | CU-11: Nombre\_del\_caso\_de\_uso \- Participación |  |
|  |  |  |

| CN-0010:  ConfiguradorSistema (Clase de Control/Singleton) |  |  |  |
| :---- | :---- | :---- | :---- |
| **Responsabilidades** | Centralizar la gestión de variables de entorno y claves de API (TTS, LMS) |  |  |
|  | Asegura que el sistema pueda actualizar integraciones sin necesidad de redistribución de código. |  |  |
|  |  |  |  |
| **Atributos** | **Nombre** | **Tipo** | **Descripción** |
|  | apiKeys | Map\<String, EncryptedString\> | Almacén cifrado de claves. |
|  | endpointLMS | URL | Dirección de Moodle/Blackboard. |
| **Participación en Casos de Uso** | CU-21: Nombre\_del\_caso\_de\_uso \- Participación |  |  |
|  |  |  |  |

También puede incorporarse algún diagrama UML que represente el comportamiento de las clases, como un diagrama de actividad, de secuencia o de colaboración.

2. ## ***Justificación del Análisis de Clases***

La arquitectura de clases propuesta responde a una estrategia integral de robustez, escalabilidad y cumplimiento normativo basada en los siguientes pilares:

1. **Integridad de Datos mediante Composición:** La relación entre Curso, Modulo y BloqueContenido se define como **Composición**. Esto garantiza que la eliminación de una entidad raíz arrastre sus componentes dependientes, evitando "objetos huérfanos" en la base de datos y facilitando la gestión de versiones (OBJ-001).

2. **Abstracción de Lógica Reactiva:** La clase BloqueContenido almacena la lógica en un formato JSON estructurado que el EnginePlayer consume. Esta separación permite que el editor sea agnóstico respecto a cómo el Player interpreta las reglas, facilitando futuras actualizaciones del motor de simulación (OBJ-002).

3. **Seguridad por Diseño (Privacy by Design):** \* **Autenticación:** La clase Usuario solo almacena passwordHash, minimizando el impacto en caso de brecha de seguridad.

   * **Trazabilidad Forense:** La clase RegistroAuditoria incluye la ipOrigen y es de solo-escritura, lo que permite cumplir con auditorías de seguridad en entornos corporativos/LMS (OBJ-004).

4. **Desacoplamiento Tecnológico (Patrón Adapter):** El ServicioTTS actúa como una fachada para APIs externas. Esto mitiga el riesgo técnico del **OBJ-003**, permitiendo cambiar de proveedor (ej. de Azure a OpenAI) sin alterar la lógica de negocio de los módulos.

5. **Mantenibilidad Centralizada:** La clase de control ConfiguradorSistema (Singleton) centraliza la gestión de claves y endpoints, asegurando que los cambios en el entorno tecnológico se reflejen instantáneamente en todo el sistema sin afectar la disponibilidad.

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

7. # **COMUNICACIÓN CON SISTEMAS EXTERNOS** {#comunicación-con-sistemas-externos}

Este apartado describe la integración de Viz-App con entidades externas indispensables para su funcionamiento. Dada la naturaleza de la solución (un *Add-on* educativo), la arquitectura se basa en el desacoplamiento mediante protocolos estándar (LTI, SCORM) y el consumo de servicios *cloud* (TTS).

## ***7.1 Diagrama de Despliegue y Conexión Exterior***

El sistema Viz-App actúa como un puente entre el creador de contenido (Docente) y el consumidor final (Estudiante) dentro de un ecosistema distribuido.

![][image1]

### **Descripción de Nodos y Conexiones:**

1. **Nodo Viz-App (Cloud Hosting):** Aloja la lógica de negocio y el editor.  
2. **Nodo LMS (Moodle/Blackboard):** Sistema externo donde reside el estudiante.  
3. **Nodo Proveedor TTS (Azure/OpenAI):** Servicio externo de procesamiento de voz.

## ***7.2 Detalle de Integraciones Externas***

### **7.2.1 Sistema de Gestión de Aprendizaje (LMS \- Moodle/Blackboard)**

Es el receptor principal del producto generado por Viz-App. La relación es de interoperabilidad educativa.

* **Relación:** El LMS actúa como contenedor y orquestador del contenido. Viz-App le entrega artefactos listos para su ejecución.  
* **Protocolo de Comunicación:**  
  * **Vía SCORM 1.2 / 2004:** Transferencia de archivos .zip que contienen el manifiesto imsmanifest.xml y los recursos web. La comunicación en tiempo real se realiza mediante la API de JS del SCORM Runtime.  
  * **Vía LTI v1.3 (Recomendado):** Uso de **OAuth2** y mensajes firmados mediante **JSON Web Tokens (JWT)** para una integración profunda sin salida del entorno LMS.  
* **Modelo de Datos:** Estructuras JSON que describen la jerarquía del curso (Secciones, Lecciones, Bloques) y el estado de completitud del alumno (cmi.core.lesson\_status).

### **7.2.2 Servicio de Síntesis de Voz (TTS API \- Azure/OpenAI)**

Componente crítico para el cumplimiento del objetivo **OBJ-003** (Accesibilidad).

* **Relación:** Proveedor de servicios bajo demanda (SaaS).  
* **Acceso y Bus de Información:** Se utiliza un cliente REST basado en **HTTPS**. Las peticiones se canalizan a través del subsistema SUB-02 (Player) mediante una fachada (Pattern Facade).  
* **Interfaces Utilizadas:** API RESTful.  
* **Modelo de Datos:**  
  * **Petición (Request):** Objeto JSON que contiene el text a procesar, el voice\_id (perfil de voz), la speed y el formato de salida.  
  * **Respuesta (Response):** *Stream* binario de audio (MP3/WAV) o URL temporal de almacenamiento en caché.

### **7.2.3 Proveedor de Autenticación Externo (SSO / OAuth2)**

Para garantizar la seguridad y evitar la duplicidad de cuentas (RNF-005).

* **Relación:** Validación de identidad delegada.  
* **Protocolo:** **OpenID Connect (OIDC)** sobre OAuth2.  
* **Modelo de Datos:** Intercambio de *tokens* de acceso y *ID tokens* en formato JWT, permitiendo la recuperación de perfiles de usuario (email, rol) de forma segura.

## ***7.3 Resumen de Protocolos e Interfaces***

| Sistema Externo | Propósito | Protocolo / Bus | Formato Datos |
| ----- | ----- | ----- | ----- |
| **LMS (Moodle/BB)** | Despliegue de contenidos | LTI 1.3 / SCORM | XML / JSON / JWT |
| **Azure/OpenAI TTS** | Generación de audio | REST / HTTPS | JSON / Binary Stream |
| **Identity Provider** | Inicio de sesión único | OAuth2 / OIDC | JWT |

**Nota de la PMO:** *La dependencia del servicio TTS se ha tipificado como un riesgo técnico (R01). Se recomienda la implementación de un mecanismo de 'Circuit Breaker' en el código para que, ante una caída del sistema externo, el Player de Viz-App mantenga su funcionalidad de visualización de texto (Fallback).*

# **8 PLAN DE PRUEBAS**

El Plan de Pruebas de Viz-App tiene como objetivo asegurar que el contenido interactivo generado sea pedagógicamente efectivo, técnicamente estable en entornos LMS y accesible según los estándares definidos.

## ***8.1 Alcance de las Pruebas***

Se definen cuatro niveles de prueba para garantizar la cobertura total de los requisitos funcionales (RF) y no funcionales (RNF):

* **Pruebas Unitarias:** Se centrarán en la lógica de los componentes de React, el motor de parsing de reglas lógicas (CU-08) y las funciones de transformación de datos.  
  * **Herramientas:** Se utilizará **Vitest** y **React Testing Library**.  
  * **Responsable:** Equipo de desarrollo durante la fase de Construcción (CSI).  
* **Pruebas de Integración:** Verifican la comunicación entre los subsistemas (SUB-01, SUB-02, SUB-03) y con servicios externos críticos como la API de Azure/OpenAI para TTS (CU-04) y la persistencia en base de datos. Se validará especialmente el flujo de datos entre el Editor y el Player mediante el objeto JSON.  
  * **Actores involucrados:** ACT-01 (Docente) y ACT-04 (Asistente IA).  
* **Pruebas de Implantación (Sistema/Carga):** Dado el entorno **Serverless**, se evaluará el comportamiento del sistema bajo las restricciones de tiempo de ejecución de las funciones cloud. Se realizarán pruebas de **Seguridad (CSP)** para asegurar que Viz-App cargue correctamente dentro de iFrames de Moodle y Blackboard sin bloqueos de navegador. El rendimiento se medirá para cumplir el RNF-002 (Carga \< 2s).  
* **Pruebas de Aceptación (UAT):** Validación final por parte del cliente y usuarios finales (Docentes y Estudiantes). Se verificará el cumplimiento de todos los Casos de Uso (del CU-01 al CU-22), con especial énfasis en la exportación SCORM/LTI (CU-14) y la experiencia de usuario (UX) en dispositivos móviles.

## ***8.2 Entornos de Pruebas***

Para garantizar la paridad con producción, se dispondrá de los siguientes entornos:

* **Entorno de Desarrollo (Local):** Equipos locales con Node.js, utilizando mocks para las APIs externas con el fin de optimizar el consumo de cuotas durante el desarrollo inicial.  
* **Entorno de Integración (Staging):** Despliegue en una rama develop en **Vercel/Netlify**. Este entorno estará conectado a las versiones de "sandbox" de las APIs de TTS y utilizará una base de datos de pruebas con datos ofuscados.  
* **Entorno de Simulación LMS:** Se dispondrá de una instancia de **Moodle (Cloud)** y **Blackboard (Developer Portal)** configuradas específicamente para probar la importación de paquetes SCORM y la conectividad LTI v1.3 generada por Viz-App.  
* **Software de apoyo:**  
  * **Cypress/Playwright:** Para la automatización de pruebas de interfaz (E2E).  
  * **Postman/Insomnia:** Para validación de contratos de API.

## ***8.3 Pruebas de Aceptación del Sistema***

Las pruebas de aceptación se considerarán exitosas cuando se cumplan los siguientes criterios:

1. **Validación Funcional:** El 100% de los escenarios de los casos de uso "Core" (CU-02, CU-04, CU-08, CU-09, CU-14) deben ejecutarse sin errores críticos.  
2. **Criterio de Interoperabilidad:** Los paquetes generados en el CU-14 deben ser importados y reproducidos correctamente en al menos dos versiones distintas de Moodle (p.ej. 3.11 y 4.x).  
3. **Criterio de Accesibilidad:** El audio generado por TTS debe ser audible y estar sincronizado con el resaltado de texto en el Player.  
4. **Criterio de Rendimiento:** La respuesta del motor de lógica en el Canvas no debe presentar retardos perceptibles (\>200ms) tras la interacción del estudiante.

# **9 GLOSARIO**

* **LMS (Learning Management System):** Sistema de Gestión de Aprendizaje (ej. Moodle, Blackboard) que actúa como plataforma anfitriona para el contenido de Viz-App.  
* **SCORM (Shareable Content Object Reference Model):** Estándar técnico que permite a los sistemas de e-learning compartir contenidos. Define cómo empaquetar el contenido y cómo se comunica con el LMS.  
* **LTI (Learning Tools Interoperability):** Estándar de IMS Global que permite conectar herramientas de aprendizaje externas con plataformas educativas de forma segura (vía OAuth2/JWT).  
* **TTS (Text-to-Speech):** Tecnología de síntesis de voz que convierte texto escrito en audio hablado, utilizada en Viz-App para mejorar la accesibilidad.  
* **Canvas Interactivo:** Área de trabajo visual donde el docente arrastra y configura bloques y nodos para crear experiencias de aprendizaje no lineales.  
* **JSON (JavaScript Object Notation):** Formato ligero de intercambio de datos que Viz-App utiliza para persistir la estructura y lógica de los cursos.  
* **RBAC (Role-Based Access Control):** Control de acceso basado en roles (Administrador, Docente, Estudiante) que define los permisos dentro de la plataforma.  
* **Serverless:** Modelo de computación donde el proveedor cloud gestiona la ejecución de funciones bajo demanda, optimizando costes de infraestructura para Viz-App.  
* **iFrame:** Elemento HTML que permite incrustar una página web dentro de otra. Es el método principal por el cual el Player de Viz-App se visualiza dentro de un LMS.  
* **MÉTRICA v3:** Metodología de planificación, desarrollo y mantenimiento de sistemas de información utilizada como marco de gobierno para este proyecto.

