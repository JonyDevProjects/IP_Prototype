Edición: v1 Fecha: 18 de febrero de

2026

# CONTROL Y REGISTRO DE CAMBIOS DEL DOCUMENTO

| CONTROL Proyecto   | Viz-App                                                     |
| ------------------ | ----------------------------------------------------------- |
| Denominación Fecha | Plan de Proyecto del Proyecto Viz-App 18 de febrero de 2026 |
| Edición Grupo      | V7 09                                                       |
| Autores            | Juan Rivas Ibáñez Jonathan Javier Quishpe Maldonado         |

| REGISTRO DE CAMBIOS VERSIÓN | DESCRIPCIÓN DEL CAMBIO                                                                          | FECHA DEL CAMBIO      |
| --------------------------- | ----------------------------------------------------------------------------------------------- | --------------------- |
| 01 02                       | Versión inicial Introducción, objetivos y organización del proyecto                             | 18/02/2026 23/02/2026 |
| 03 04                       | Metodología de gestión del proyecto y programa de trabajo Evaluación y planificación de riesgos | 28/02/2026 07/03/2026 |
| 05 06                       | Planes de gestión auxiliares Temas abiertos y decisiones pendientes                             | 08/03/2026 10/03/2026 |
| 07                          | Otros aspectos del proyecto                                                                     | 11/03/2026            |

Plan de Proyecto - CRISP-DM Página **2** de **49**

GRUPO 002

# ÍNDICE

1. INTRODUCCIÓN.........................................................................................................................4 2. OBJETIVOS DEL PROYECTO................................................................................................... 5
   2.1 Requisitos funcionales........................................................................................................ 5 2.2 Requisitos no funcionales................................................................................................... 7

2. ORGANIZACIÓN DEL PROYECTO........................................................................................... 8*3.1 Diagrama de Organización del Proyecto.............................................................................8*
   3.2 Identificación de los Interesados.........................................................................................9 3.3 Responsabilidades y Funciones de los Interesados......................................................... 10

3.3.1 Responsabilidades del Equipo Humano..................................................................10 3.3.2 Responsabilidades de los Agentes y Subagentes IA.............................................. 10

3.3.3 Responsabilidades del cliente y usuarios finales.....................................................11**4. METODOLOGÍA DE GESTIÓN DEL PROYECTO................................................................... 12**

4.1 Enfoque Metodológico (Scrumban + MÉTRICA v3)..........................................................12 4.2 Tabla de Mapeo (Herramienta PMO)................................................................................ 13

4.3 Gestión de la Configuración y Flujo de Ramas (Git Flow)................................................ 13 4.4 Definición de "Hecho" o Done........................................................................................... 14

**4.5 Capa de Ejecución Técnica (Desarrollo)...........................................................................14**5. PROGRAMA DE TRABAJO..................................................................................................... 14

5.1 Estructura de Desglose del Trabajo (EDT / WBS)............................................................ 14 5.2 Plan de Tareas.................................................................................................................. 16

5.2.1 Planificación y Gestión del Sistema de Información (PSI).......................................16 5.2.2 Análisis del Sistema de Información (ASI)...............................................................19

5.2.3 Diseño del Sistema de Información (DSI)................................................................23 5.2.4 Construcción y Pruebas del Sistema de Información (CSI - Prototipado)............... 26

5.2.5 Validación y Cierre.................................................................................... 28

5.3 Control y Seguimiento del Trabajo.................................................................................... 30 5.4 Asignación de recursos.....................................................................................................31

A) Equipo técnico (Fuerza de trabajo)............................................................... 31 B) Otros costes (Infraestructura y servicios externos)....................................... 31

Cálculo Final del BAC (Presupuesto al Finalizar).............................................. 32

5.5 Asignación de tareas.........................................................................................................33**6. EVALUACIÓN Y PLANIFICACIÓN DE RIESGOS................................................................... 38**

7. PLANES DE GESTIÓN AUXILIARES...................................................................................... 41**7.1 Plan de Gestión de la Configuración................................................................. 41**
   7.2 Plan de Gestión de Pruebas y Calidad..............................................................41 7.3 Plan de Comunicación.......................................................................................42

7.4 Plan de Seguridad............................................................................................. 42

8. TEMAS ABIERTOS Y DECISIONES PENDIENTES................................................................ 42
   Plan de Proyecto - CRISP-DM Página **3** de **49**

GRUPO 002

8.1 Decisiones Pendientes...................................................................................... 42 8.2 Temas Abiertos.................................................................................................. 43

**9. OTROS ASPECTOS DEL PROYECTO.................................................................................... 44**9.1 Herramientas de desarrollo...............................................................................................44
9.2 Herramientas de software................................................................................................. 44

Plan de Proyecto - CRISP-DM Página **4** de **49**

GRUPO 002

# 1. INTRODUCCIÓN

Este documento constituye el **Plan de Proyecto para Viz-App**, una suite de herramientasdiseñada para transformar la experiencia de aprendizaje en sistemas de gestión de aprendizaje

(LMS) como Moodle y Blackboard. El objeto de este plan es coordinar el desarrollo de una solución técnica que permita a los docentes crear contenidos altamente interactivos, mediante

bloques visuales y síntesis de voz TTS, mitigando la pasividad del estudiante en entornos virtuales.

A diferencia de los enfoques tradicionales, este proyecto integra una **dinámica de trabajohíbrida**, donde la dirección y supervisión técnica recaen en perfiles humanos expertos (Director

de Proyecto, Supervisor Backend/DevOps y Analista/Diseñador Frontend), mientras que laejecución técnica y la generación de componentes son apoyadas por _agentes de Inteligencia_

_Artificial_. Este modelo exige una gestión de configuración y un control de calidad (QA) másestrictos para asegurar la integridad de la rama principal de producción.

El desarrollo se articula bajo la metodología **MÉTRICA v3**, asegurando que el producto final nosolo sea funcionalmente innovador, sino que también cumpla con estándares de diseño robustos

y una arquitectura orientada a la interoperabilidad futura mediante el estándar **LTI v1.3**.

Este plan se desglosa en los siguientes apartados:

- **●** _Objetivos del proyecto:_ Definición de requisitos funcionales y de calidad.
- **●** _Organización del proyecto:_ Estructura del equipo híbrido y responsabilidades de losinteresados.
- **●** _Metodología de gestión del proyecto:_ Protocolos de comunicación y gobernanza delos agentes IA.
- **●** _Programa de trabajo:_ Cronograma detallado basado en Sprints e hitos de entrega (PSI,ASI, DSI, CSI, Prototipo).
- **●** _Evaluación y planificación de riesgos:_ Identificación y mitigación de incertidumbrestécnicas (TTS, iFrame) y de gestión.
- **●** _Planes de gestión auxiliares:_ Estrategias de pruebas (Vitest/Playwright) y gestión de laconfiguración.
- **●** _Temas abiertos y decisiones pendientes:_ Registro de elementos en definición(Presupuesto APIs, Infraestructura).
- **●** _Otros aspectos del proyecto:_ Entorno técnico y criterios de aceptación final.
  Plan de Proyecto - CRISP-DM Página **5** de **49**

GRUPO 002

# 2. OBJETIVOS DEL PROYECTO

El objetivo principal de este proyecto es el diseño, desarrollo e implementación de un prototipofuncional de **Viz-App**, una suite interactiva que se integra en sistemas LMS para enriquecer la

experiencia pedagógica. A través de este desarrollo, se pretende validar la viabilidad de un ecosistema de aprendizaje basado en bloques visuales y auditivos, optimizando la retención de

conocimientos mediante la interactividad.

Para alcanzar este fin, se definen los siguientes objetivos específicos:

- **●** _Desarrollar un motor de renderizado dinámico:_ Capaz de interpretar y visualizardiferentes tipos de bloques (texto, imagen, carrusel y líneas de tiempo) de forma fluida.
- **●** _Implementar un sistema de síntesis de voz (TTS) agnóstico:_ Permitir la audición delos contenidos textuales para mejorar la accesibilidad y el aprendizaje multimodal,
  permitiendo la compatibilidad con diversos proveedores de voz.

- **●** _Asegurar la interoperabilidad con LMS estándares:_ Diseñar una arquitectura quepermita la integración mediante iFrames en el corto plazo y que cumpla con los
  requisitos necesarios para evolucionar hacia el estándar LTI v1.3.

- **●** _Optimizar el flujo de trabajo híbrido (Humano-IA):_ Establecer un marco de desarrollodonde los agentes de IA ejecuten tareas técnicas bajo la supervisión y validación estricta
  de los responsables del proyecto, garantizando la calidad del software.

- **●** _Validar la experiencia de usuario (UX):_ Garantizar que la interfaz sea intuitiva tantopara el docente (creador de contenido) como para el alumno (consumidor).

## 2.1 Requisitos funcionales. Los requisitos funcionales describen las acciones específicas que el sistema Viz-App debe ser

capaz de realizar:

| RF–001 Versión     | Modo Editor/ Modo Lector 01                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Autores Fuente     | Grupo 9 Grupo de trabajo                                                                                           |
| Descripción        | Diferenciación clara entre la interfaz de creación de contenido y la interfaz de visualización para el estudiante. |
| Importancia Estado | Alta Pendiente de revisión                                                                                         |
| Comentarios        | -                                                                                                                  |
| RF–002 Versión     | Gestión de Bloques Básicos 01                                                                                      |
| Autores Fuente     | Grupo 9 Grupo de trabajo                                                                                           |
| Descripción        | El sistema permitirá crear, editar, eliminar y reordenar bloques de contenido interactivo.                         |
| Importancia        | Alta                                                                                                               |

Plan de Proyecto - CRISP-DM Página **6** de **49**

GRUPO 002

| Estado Comentarios | Pendiente de revisión -                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| RF–003 Versión     | Visualización de Secuencias 01                                                                                                               |
| Autores Fuente     | Grupo 9 Grupo de trabajo                                                                                                                     |
| Descripción        | El usuario podrá navegar por una secuencia de “slides” o temas compuestos por múltiples bloques.                                             |
| Importancia Estado | Alta Pendiente de revisión                                                                                                                   |
| Comentarios        | -                                                                                                                                            |
| RF–004 Versión     | Interactividad en Bloques Complejos 01                                                                                                       |
| Autores Fuente     | Grupo 9 Grupo de trabajo                                                                                                                     |
| Descripción        | El bloque complejo permitirá la navegación por hitos históricos o procesos, mostrando detalles específicos de cada punto.                    |
| Importancia Estado | Alta Pendiente de revisión                                                                                                                   |
| Comentarios        | -                                                                                                                                            |
| RF–005 Versión     | Generación de Audio(TTS) 01                                                                                                                  |
| Autores Fuente     | Grupo 9 Grupo de trabajo                                                                                                                     |
| Descripción        | El sistema generará y reproducirá audio a partir del texto contenido en los bloques, con controles de reproducción (Play/Pausa/Stop)         |
| Importancia Estado | Media Pendiente de revisión                                                                                                                  |
| Comentarios        | -                                                                                                                                            |
| RF–006 Versión     | Persistencia de Datos 01                                                                                                                     |
| Autores Fuente     | Grupo 9 Grupo de trabajo                                                                                                                     |
| Descripción        | El sistema debe ser capaz de almacenar y recuperar la estructura de los cursos y el estado de los bloques (inicialmente mediante mocks/JSON) |
| Importancia Estado | Media Pendiente de revisión                                                                                                                  |
| Comentarios        | -                                                                                                                                            |

Plan de Proyecto - CRISP-DM Página **7** de **49**

GRUPO 002

## 2.2 Requisitos no funcionales

| RNF–001 Versión    | Usabilidad (UX/UI) 01                                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Autores Fuente     | Grupo 9 Grupo de trabajo                                                                                                                                 |
| Descripción        | La interfaz debe ser responsive (adaptable a dispositivos móviles) y seguir las directrices de diseño limpio y moderno definidas en el manual de estilo. |
| Importancia Estado | Alta Pendiente de revisión                                                                                                                               |
| Comentarios        | -                                                                                                                                                        |
| RNF–002 Versión    | Rendimiento 01                                                                                                                                           |
| Autores Fuente     | Grupo 9 Grupo de trabajo                                                                                                                                 |
| Descripción        | El tiempo de carga de un tema interactivo no debe superar los 2 segundos en condiciones normales de red.                                                 |
| Importancia Estado | Medio Pendiente de revisión                                                                                                                              |
| Comentarios        | -                                                                                                                                                        |
| RNF–003 Versión    | Seguridad 01                                                                                                                                             |
| Autores Fuente     | Grupo 9 Grupo de trabajo                                                                                                                                 |
| Descripción        | El sistema debe implementar cabeceras CSP (Content Security Policy) para permitir su ejecución segura dentro de iFrames de terceros                      |
| Importancia Estado | Alta Pendiente de revisión                                                                                                                               |
| Comentarios        | -                                                                                                                                                        |
| RNF–004 Versión    | Mantenibilidad (Codigo) 01                                                                                                                               |
| Autores Fuente     | Grupo 9 Grupo de trabajo                                                                                                                                 |
| Descripción        | El código debe estar documentado y posees una cobertura de pruebas unitarias (Vitest) superior al 70%                                                    |
| Importancia Estado | Medio Pendiente de revisión                                                                                                                              |
| Comentarios        | -                                                                                                                                                        |
| RNF–005            | Interoperabilidad (Estándares)                                                                                                                           |

Plan de Proyecto - CRISP-DM Página **8** de **49**

GRUPO 002

| Versión Autores    | 01 Grupo 9                                                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Fuente Descripción | Grupo de trabajo La arquitectura debe estar preparada para la implementación del protocolo de OAuth2                    |
| Importancia        | requerido por el estándar LTI v1.3 Media                                                                                |
| Estado Comentarios | Pendiente de revisión -                                                                                                 |
| RNF–006 Versión    | Disponibilidad (Soporte) 01                                                                                             |
| Autores Fuente     | Grupo 9 Grupo de trabajo                                                                                                |
| Descripción        | El sistema debe ofrecer un modo “fallback” de audio (Web Speech API) en caso de calidad del proveedor principal de TTS. |
| Importancia Estado | Baja Pendiente de revisión                                                                                              |
| Comentarios        | -                                                                                                                       |

Plan de Proyecto - CRISP-DM Página **9** de **49**

GRUPO 002

# 3. ORGANIZACIÓN DEL PROYECTO

## 3.1 Diagrama de Organización del Proyecto

La organización de Viz-App se define por un modelo de equipo híbrido. Este modelo integra la capacidad analítica y de toma de decisiones de los supervisores humanos con la capacidad de

ejecución técnica y procesamiento de los agentes de Inteligencia Artificial (IA).

La estructura jerárquica y funcional del equipo se organiza en cuatro niveles:

**1.** _Nivel de Dirección y Supervisión (Humano):_ Responsable de la visión estratégica, lavalidación de requisitos y la gestión del proyecto.
**2.** _Nivel de Propuesta y Valoración (Mixto):_ Flujo de trabajo donde se propone el trabajoy se evalúan si las soluciones cumplen los requisitos.
**3.** _Nivel de Coordinación Técnica (IA):_ Agentes encargados de supervisar laimplementación.
**4.** _Nivel de Ejecución Técnica (IA):_ Sub Agentes encargados de implementar el trabajodefinido en los niveles superiores.
Plan de Proyecto - CRISP-DM Página **10** de **49**

GRUPO 002

## 3.2 Identificación de los Interesados

Se han identificado los siguientes grupos de interés (stakeholders) que influyen o son afectados por el desarrollo de Viz-App:

Interesado Tipo Rol/Relación con el Proyecto

**Jonathan Javier** Interno Director de Proyecto, Supervisor Backend y DevOps.**Quishpe**

Maldonado

**Juan Rivas Ibáñez** Interno Analista de Sistemas, Supervisor Frontend y Diseñador.

**Agentes y** Interno Fuerza de ejecución técnica y soporte en**Subagentes IA** documentación/test.

**Universidad (UPO)** Externo Entidad evaluadora y cliente final del sistema deinformación.

| Docentes    | Externo Usuario final creador de contenido.             |
| ----------- | ------------------------------------------------------- |
| Estudiantes | Externo Consumidor final de la experiencia interactiva. |

## 3.3 Responsabilidades y Funciones de los Interesados

Dada la naturaleza híbrida del equipo, las tareas se han distribuido en una jerarquía de cuatro niveles operativos para maximizar la eficiencia de los agentes de Inteligencia Artificial (IA),

manteniendo un estricto control humano sobre la calidad (estimado entre 5 y 10 horas semanales de supervisión).

3.3.1 Responsabilidades del Equipo Humano

Jonathan Javier Quishpe Maldonado (Director / Backend Lead / DevOps):

- Planificación del proyecto. - Organización y gestión del equipo.
- Seguimiento y control. - Gestión de riesgos y problemas.
- Comunicación con stakeholders. - Autoridad máxima para fusiones (merges) en la rama main y pre-production.
- Supervisar arquitectura y calidad del backend. - Asegurar que las APIs cumplen estándares y están documentadas.
- Gestión de la infraestructura de despliegue y flujo de CI/CD.
  Plan de Proyecto - CRISP-DM Página **11** de **49**

GRUPO 002

Juan Rivas (Analista / Frontend Lead / Diseñador):

- Supervisar arquitectura, calidad del frontend. - Asegurar consistencia visual, UX y patrones de componentes.
- Validar que el frontend consume correctamente las APIs. - Reportar avances y bloqueos específicos del frontend.
- Responsable del análisis funcional y cumplimiento de requisitos en el documento ASI.
  3.3.2 Responsabilidades de los Agentes y Subagentes IA

Son los responsables globales de cada área de conocimiento. Operan al mismo nivel jerárquico y se auditan mutuamente (ej. QA audita a Frontend).

**Agente Arquitecto/Verificador:** Encargado de proponer estructuras de archivos yverificar la paridad técnica entre el código generado y las reglas de oro del proyecto.

**Agente Frontend:** Desarrollo de componentes React, estilos con Tailwind y lógica deinteractividad.

**Agente QA/Tester:** Generación automática de suites de pruebas con Vitest y Playwright.

**Agente Documentador/Content:** Redacción de manuales técnicos, memoria delproyecto y estructuración de contenidos pedagógicos.

**Sub-agentes Especializados:** No tienen visión global del proyecto y deben sercoordinados o delegados por los Agentes de Nivel 3 para resolver tareas delimitadas.

3.3.3 Responsabilidades del cliente y usuarios finales

El **Cliente**, como máximo responsable de la definición y aceptación del producto, asume lassiguientes funciones esenciales:

Área de Gestión Responsabilidad Clave Alineación Metodología (MÉTRICA v3/ Scrumban)

Alcance y Proporcionar Requisitos y ASI _(Obtención y Validación de_Prioridad Priorización (Product Backlog)_: Requisitos). Responsable del\_

Asegurar la disponibilidad de la **Product Backlog** y el orden de losinformación completa en la fase Sprints.

de _Análisis (ASI)_. Es el únicoresponsable de la _priorización_

de los Requisitos Funcionales (RF) y No Funcionales (RNF).

**Decisión y Aprobar Entregables e Hitos**: **ASI** (Aprobación del ASI), **DSIAprobación** Formalizar la aceptación de los (Aprobación del DSI). Hitos de

entregables clave (e.g., Revisión de Sprint.

Plan de Proyecto - CRISP-DM Página **12** de **49**

GRUPO 002

Especificación de Requisitos, Arquitectura de Diseño, Prototipo

Funcional) en los hitos oficialesde **MÉTRICA v3 (PSI, ASI, DSI,**

CSI).

Control de Garantizar Recursos*: Facilitar* Gestión de Riesgos _(Identificación_Proyecto \_los recursos necesarios (e.g., y Mitigación),_ Gestión de Coste

presupuestos para APIs, (Validación de presupuesto). infraestructura o accesos a los

\_entornos LMS) y resolver los_Temas Abiertos y Decisiones

**Pendientes** (Sección 8 del plan)a tiempo para no demorar la

ejecución de los Agentes IA.

**Aceptación Validación Final (Pruebas de ASI** (Definición de Pruebas de**Aceptación)**: Realizar las Aceptación). Hito de CSI

Pruebas de Aceptación del (Prototipado). Sistema y firmar el Acta de

Conformidad, confirmando que el producto final es apto para su

Implantación (IAS)_._

Los **Usuarios Finales** son esenciales para validar la usabilidad y la pertinencia pedagógicade la aplicación:

**Responsabilidad Clave** Impacto en el Proyecto

| Participación en la Obtención de | Aportar creación (Docente) y consumo (Alumno) de contenidos para afinar sus perspectivas y necesidades operativas sobre la |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Requisitos                       | el catálogo de requisitos funcionales y no funcionales.                                                                    |

**Validación de** Colaborar activamente en la revisión de los prototipos e interfaces,**Experiencia de Usuario** especialmente para asegurar el cumplimiento del **RNF–001**

**(UX/UI) (Usabilidad)** y la intuición del Modo Editor/Modo Lector **(RF–001)**.

**Ejecución de Pruebas** Participar en las pruebas funcionales para detectar defectos y**de Sistema y Alfa/Beta** confirmar que el sistema se comporta según lo esperado en un

entorno de LMS real.

Plan de Proyecto - CRISP-DM Página **13** de **49**

GRUPO 002

# 4. METODOLOGÍA DE GESTIÓN DEL PROYECTO

Para abordar la complejidad de Viz-App y maximizar la eficiencia del equipo híbrido (Supervisores Humanos + Agentes IA), la gestión del proyecto se regirá por un marco

metodológico que combina los estándares formales de **MÉTRICA v3** con una aproximación ágilbasada en **Scrumban** (híbrido de Scrum y Kanban).

Esta adaptación metodológica garantiza el rigor documental exigido en entornos académicos/empresariales, al tiempo que dota al equipo de la flexibilidad necesaria para el

desarrollo rápido de software asistido por IA.

## 4.1 Enfoque Metodológico (Scrumban + MÉTRICA v3)

- **●** _MÉTRICA v3:_ Proporciona el marco de procesos de ingeniería (Planificación - PSI,Análisis - ASI, Diseño - DSI).
- **●** _Scrum:_ Se utilizará para la estructuración del tiempo en iteraciones fijas (_Sprints de 2semanas_) y la planificación de los hitos (Revisión de Sprint).
- **●** _Kanban:_ Se aplicará para la gestión visual del flujo de tareas diarias de los agentes IA,limitando el Trabajo en Curso (WIP - _Work In Progress_) para evitar cuellos de botella en
  la fase de revisión humana.

## 4.2 Tabla de Mapeo (Herramienta PMO)

Hito Oficial Métrica v3 Fecha Límite Correspondencia Ágil / Actividades Clave Artefacto Híbrido (Lean/Scrumban)

**PSI (Planificación)** Jueves 12 Vision, Product Backlog inicial, Definición del alcance, metodologíamarzo a las Setup del Tablero Trello. de trabajo, EDT, recursos,

23:59 responsables y riesgos.

_ASI (Análisis)_ Jueves 9 abril a Refinamiento del Backlog, User Detallar un mínimo de 20 casos delas 23:59 Story Mapping (Casos de Uso). uso. Modelado de requisitos con

enfoque Lean.

**DSI (Diseño)** Jueves 30 abril Definición de Arquitectura y Diseño del modelo de datos con una las 23:59 Sprint de Diseño Técnico. mínimo de 5 entidades fuertes.

Definición de integraciones externas (APIs).

**Prototipo** 13 de mayo Incremento de Producto Construcción del prototipo que debe(Mockup/Prototipo permitir la navegación por los

interactivo/navegable). principales casos de uso y visualizar la estructura de datos y pantallas

clave.

Plan de Proyecto - CRISP-DM Página **14** de **49**

GRUPO 002

## 4.3 Gestión de la Configuración y Flujo de Ramas (Git Flow) Para aislar las alucinaciones de la IA y proteger el código de producción, se establece una

estricta política de ramas en el control de versiones:

**1.** _main (Producción):_ Rama base estable. Los cambios aquí reflejan entregablesfuncionales listos para presentar (Prototipo final). _Solo escrita por: Director de_
Proyecto (Jonathan Quishpe).

**2.** _pre-prod (Pre-producción / Integración):_ Entorno donde se agrupan lasfuncionalidades validadas del Sprint actual. Sirve para pruebas y auditorías visuales de
UI.

**3.** _test (Pruebas unitarias):_ Rama temporal donde el Agente QA evalúa el código antes dela revisión humana.
**4.** _Ramas Efímeras de Agentes (feature/*, fix/*, refactor/\*)_: Espacios de trabajo aislados.Cuando un Agente IA termina una tarea, abre una _Pull Request_ (PR) hacia la rama test o
pre-prod.

## 4.4 Definición de "Hecho" o Done. Una tarea asignada a un Agente IA bajo la supervisión de los responsables humanos solo se

moverá a la columna **Done** cuando cumpla rigurosamente los siguientes Criterios de Aceptación:

**1.** _Criterio Técnico:_ El código compila sin errores ni advertencias.
**2.** _Criterio de Pruebas:_ Todos los tests unitarios previos y nuevos han pasado.
**3.** _Criterio Funcional:_ La funcionalidad ha sido documentada en los archivos Markdowncorrespondientes.
**4.** _Criterio Humano (Validación Final):_ La _Pull Request_ tiene la aprobación explícita de almenos uno de los supervisores humanos (Jonathan o Juan) tras una revisión de código
y de interfaz (si aplica).

## 4.5 Capa de Ejecución Técnica (Desarrollo) Para conocer la operativa técnica del día a día, la guía de comandos de agentes de IA y la

filosofía de implementación **Lean Software Development** aplicada al uso de IA en código, elequipo se apoya en el documento **METHODOLOGY.md** que detalla la relación granular entre las

- User Stories”, los puntajes de esfuerzo y el flujo de los agentes.
  Plan de Proyecto - CRISP-DM Página **15** de **49**

GRUPO 002

# 5. PROGRAMA DE TRABAJO

El programa de trabajo define la estructura, la secuenciación y la planificación temporal de todaslas actividades necesarias para alcanzar los objetivos de **Viz-App**. Para asegurar el

cumplimiento de los estándares académicos y de calidad, la planificación se sustenta en elmarco metodológico **MÉTRICA v3**, adaptando sus procesos principales (PSI, ASI, DSI, CSI y

Cierre) a la naturaleza innovadora y de ciclo corto de este prototipo funcional.

## 5.1 Estructura de Desglose del Trabajo (EDT / WBS) Para garantizar un control exhaustivo del alcance, el proyecto se ha dividido en paquetes de

trabajo manejables. Esta estructuración permite asignar responsabilidades claras y facilitar la supervisión del flujo híbrido (Humano-IA).

El desglose estructurado de tareas se organiza en las siguientes fases y tareas del proyecto, representadas en el EDT de la figura siguiente.

Plan de Proyecto - CRISP-DM Página **16** de **49**

GRUPO 002

A continuación se presenta la planificación del proyecto, referida a las fases del proyecto, mediante un diagrama de Gantt que integra las fases y tareas descritas en el EDT previamente

expuesto.

Plan de Proyecto - CRISP-DM Página **17** de **49**

GRUPO 002

Plan de Proyecto - CRISP-DM Página **18** de **49**

GRUPO 002

## 5.2 Plan de Tareas

5.2.1 Planificación y Gestión del Sistema de Información (PSI)

Código Nombre Responsable Estimación (horas)

1.1 Reunión con el Jonathan Quishpe 6 cliente y desarrollo

de la idea inicial. Juan Rivas

Representante del Equipo Docente UPO

**Descripción**Sesión estratégica para capturar necesidades de negocio y definir el alcance y visión

preliminar del sistema.

Observaciones

N/A

| Código | Nombre                     | Responsable | Estimación (horas) |
| ------ | -------------------------- | ----------- | ------------------ |
| 1.2    | Definición del alcance del | Juan Rivas  | 6                  |

proyecto.

**Descripción**Delimitación formal de las fronteras del sistema, estableciendo las funcionalidades incluidas y

excluidas para asegurar el control de expectativas y recursos.

**Observaciones**Las secciones 1 y 2 de este documento describen en detalle la definición y el alcance del

proyecto.

Plan de Proyecto - CRISP-DM Página **19** de **49**

GRUPO 002

| Código | Nombre                      | Responsable                       | Estimación (horas) |
| ------ | --------------------------- | --------------------------------- | ------------------ |
| 1.3    | Definición del Seguimiento, | Jonathan Javier Quishpe Maldonado | 6                  |

Control y reuniones de coordinación.

**Descripción**Supervisión continua del progreso y gestión del proyecto mediante una metodología de

trabajo híbrida para garantizar la alineación del equipo y el cumplimiento del cronograma.

**Observaciones**La organización y metodología o marco de trabajo híbrido se definen en las secciones 3 y 4

de este documento.

Código Nombre Responsable Estimación (horas)

1.4 Planificación del Juan Rivas Ibáñez 8 Cronograma (WBS

y Gantt)

**Descripción**Descomposición jerárquica del proyecto en fases (PSI, ASI, DSI, Construcción, Validación y

Cierre). Identificación de dependencias temporales y elaboración del diagrama de Gantt reflejando los hitos de la principales.

Observaciones

**Entregable:** Diagrama de Gantt y Diccionario de la EDT (WBS).

Código Nombre Responsable Estimación (horas)

1.5 Cálculo y Jonathan Javier Quishpe Maldonado 8 estimación inicial de

costes.

**Descripción**Aplicación de modelos métricos y análisis económico para determinar el esfuerzo necesario y

los costes del proyecto.

Observaciones

Plan de Proyecto - CRISP-DM Página **20** de **49**

GRUPO 002

**Entregable:** Presupuesto detallado e informe de viabilidad económica.

| Código | Nombre                  | Responsable      | Estimación (horas) |
| ------ | ----------------------- | ---------------- | ------------------ |
| 1.6    | Asignación de recursos. | Jonathan Quishpe | 6                  |

Juan Rivas Ibáñez

**Descripción**Distribución de la carga de trabajo estimada entre los perfiles humanos y los agentes de IA

(Frontend, Documentador, Tester), asegurando que no haya sobreasignación en las semanas críticas.

Observaciones

**Entregable:** Matriz RAM (Matriz de Asignación de Responsabilidades).

| Código | Nombre                              | Responsable      | Estimación (horas) |
| ------ | ----------------------------------- | ---------------- | ------------------ |
| 1.7    | Plan de Gestión de la Configuración | Jonathan Quishpe | 6                  |

**Descripción**Establecimiento del entorno de control de activos y trazabilidad de cambios para garantizar la

integridad y disponibilidad de las versiones del software.

**Observaciones**La sección 4.3 de este documento detalla cómo se lleva a cabo la gestión de la configuración.

| Código | Nombre                        | Responsable      | Estimación (horas) |
| ------ | ----------------------------- | ---------------- | ------------------ |
| 1.8    | Evaluación y planificación de | Jonathan Quishpe | 8                  |

riesgos. Juan Rivas

**Descripción**Identificación proactiva de amenazas y diseño de estrategias de mitigación para minimizar el

impacto negativo en los objetivos del proyecto.

Plan de Proyecto - CRISP-DM Página **21** de **49**

GRUPO 002

Observaciones**N/A**

Código Nombre Responsable Estimación (horas)

1.9 Planes auxiliares. Juan Rivas 6

**Descripción**Documentos transversales que integran las estrategias de comunicación, calidad y seguridad

para dar soporte y coherencia al plan general del proyecto.

Observaciones**N/A**

Código Nombre Responsable Estimación (horas)

1.10 Consolidación y Equipo Completo 6 Revisión Formal del

Entregable PSI

**Descripción**Revisión de integridad, formato y coherencia de todo el Plan de Proyecto (PSI).

Observaciones**N/A**

Plan de Proyecto - CRISP-DM Página **22** de **49**

GRUPO 002

5.2.2 Análisis del Sistema de Información (ASI)

Código Nombre Responsable Estimación (horas)

2.1 Catálogo de Equipo Completo 12 Requisitos y Actores

**Descripción**Identificación de los perfiles de usuario (Docente, Alumno, Administrador, Sistema Externo).

Captura y priorización (MoSCoW) de requisitos funcionales y no funcionales, incluyendo la obligatoriedad de consumo de API REST y servicio de envío de correos.

Observaciones

**Entregable:** Matriz de trazabilidad y Catálogo de Requisitos (RNF y RF).

| Código | Nombre                         | Responsable       | Estimación (horas) |
| ------ | ------------------------------ | ----------------- | ------------------ |
| 2.2    | Especificación de Casos de Uso | Juan Rivas Ibáñez | 12                 |

**Descripción**Elaboración del Diagrama de Casos de Uso General. Redacción detallada (plantilla formal con

flujos principal/alternativos y pre/post-condiciones) de al menos 20 casos de uso.

Observaciones

**Entregable:** Diagrama UML de Casos de Uso y Documento de Especificación de CU.

Plan de Proyecto - CRISP-DM Página **23** de **49**

GRUPO 002

Código Nombre Responsable Estimación (horas)

2.3 Modelado Conceptual Jonathan Javier Quishpe Maldonado 10 de Datos

**Descripción**Identificación de conceptos del negocio, atributos y asociaciones para estructurar la

información (mínimo 5 entidades fuertes: ej. Usuario, Curso, Módulo, BloqueContenido, Evaluacion). Elaboración del Diagrama de Clases de Análisis.

Observaciones

**Entregable:** Diagrama de Clases de Análisis / Modelo Entidad-Relación Lógico.

| Código | Nombre            | Responsable       | Estimación (horas) |
| ------ | ----------------- | ----------------- | ------------------ |
| 2.4    | Modelado Dinámico | Juan Rivas Ibáñez | 10                 |

**Descripción**Creación de Diagramas de Actividad para representar la lógica de negocio compleja (ej. flujo

de generación de audio TTS). Creación de Diagramas de Secuencia para los Casos de Uso críticos, detallando la interacción entre actores, el sistema y los servicios externos (API,

Email).

Observaciones

**Entregable:** Diagramas UML de Actividad y Secuencia.

Plan de Proyecto - CRISP-DM Página **24** de **49**

GRUPO 002

| Código | Nombre                       | Responsable             | Estimación (horas) |
| ------ | ---------------------------- | ----------------------- | ------------------ |
| 2.5    | Análisis y Especificación de | Jonathan Javier Quishpe | 16                 |

Interfaces (UI/UX) Agente UX

**Descripción**Identificación de entornos de usuario. Definición de la navegación (mapa del sitio), estándares

de usabilidad, paleta de colores (Tailwind) y diseño de pantallas clave (Mockups/Wireframes) para los flujos principales definidos en los Casos de Uso.

Observaciones

**Entregable:** Dossier de Mockups y Mapa de Navegación. (Base para el prototipo).

| Código | Nombre                        | Responsable     | Estimación (horas) |
| ------ | ----------------------------- | --------------- | ------------------ |
| 2.6    | Definición de Integraciones y | Equipo Completo | 10                 |

Arquitectura Lógica

Descripción

Análisis funcional de la interoperabilidad del sistema. Definición formal de los endpoints a consumir de la API RESTful (ej. servicio TTS) y los eventos desencadenantes del servicio

externo de correo electrónico.

Observaciones

**Entregable:** Apartado de Integraciones y Diagrama de Arquitectura Lógica.

Plan de Proyecto - CRISP-DM Página **25** de **49**

GRUPO 002

| Código | Nombre                              | Responsable     | Estimación (horas) |
| ------ | ----------------------------------- | --------------- | ------------------ |
| 2.7    | Consolidación y Revisión Formal del | Equipo Completo | 6                  |

Entregable ASI

Descripción

Consolidación de todos los modelos (UML, Requisitos, Mockups) en el formato final requerido. Verificación de cumplimiento contra las rúbricas de evaluación (20 CU, 5 Entidades, 2

Integraciones).

Observaciones

**Entregable:** Documento Final ASI.

5.2.3 Diseño del Sistema de Información (DSI)

Código Nombre Responsable Estimación (horas)

3.1 Diseño de la Jonathan Javier Quishpe Maldonado 8 Arquitectura del

Sistema Agente Arquitecto

**Descripción**Especificación del entorno tecnológico (React, Vite, TypeScript, Tailwind CSS). Definición de

la estructura de carpetas, patrones de diseño (ej. Custom Hooks, Context API) y políticas de gestión de estado global vs. local.

Observaciones

**Entregable:** Documento de Arquitectura de Software y Diagrama de Componentes UML.

Plan de Proyecto - CRISP-DM Página **26** de **49**

GRUPO 002

| Código | Nombre                            | Responsable       | Estimación (horas) |
| ------ | --------------------------------- | ----------------- | ------------------ |
| 3.2    | Diseño del Motor de Renderizado y | Juan Rivas Ibáñez | 10                 |

Estructura de Datos Físicos

**Descripción**Diseño técnico de la jerarquía de bloques (texto, imagen, línea de tiempo). Transformación del

Modelo de Dominio (ASI) al diseño físico (interfaces TypeScript y esquemas JSON) que soportará la aplicación.

Observaciones

**Entregable:** Esquemas de Datos (JSON/Interfaces TS) y Diagrama de Clases de Diseño.

Código Nombre Responsable Estimación (horas)

3.3 Diseño de Jonathan Javier Quishpe Maldonado 6 Integraciones

(Internas y Externas)

**Descripción**Diseño técnico del servicio de síntesis de voz (agnóstico) y del servicio de mailing. Definición

de contratos de API (cargas útiles JSON), gestión de errores, reintentos y almacenamiento en caché de audios (AudioCache).

**ObservacionesEntregable:** Especificación de Interfaces (APIs) y Diagrama de Secuencia de Integración.

Plan de Proyecto - CRISP-DM Página **27** de **49**

GRUPO 002

Código Nombre Responsable Estimación (horas)

3.4 Diseño de UI/UX Jonathan Javier Quishpe Maldonado 12 Detallado y

Componentes Agente UX Visuales

**Descripción**Evolución de los mockups (ASI) a un diseño "pixel-perfect". Especificación técnica de los

componentes visuales (Storybook o similar), paleta de colores, tipografía, transiciones y comportamiento responsive (Tailwind).

**ObservacionesEntregable:** Guía de Estilos (Design System) y Especificación de Componentes UI.

| Código | Nombre                    | Responsable     | Estimación (horas) |
| ------ | ------------------------- | --------------- | ------------------ |
| 3.5    | Diseño de Arquitectura de | Equipo Completo | 4                  |

Despliegue y Restricciones

**Descripción**Definición del modelo de despliegue (ej. Vercel, Netlify). Análisis y diseño de soluciones

técnicas para operar dentro de las restricciones de un iFrame.

**ObservacionesEntregable:** Diagrama de Despliegue UML y Especificación de Entorno.

Código Nombre Responsable Estimación (horas)

3.6 Diseño de Seguridad Juan Rivas Ibáñez 6 y Control de Acceso

**Descripción**Especificación de los mecanismos de autenticación y autorización. Diseño de la protección de

claves de API, sanitización de entradas para prevenir XSS y políticas de seguridad de contenido (CSP).

Observaciones

Plan de Proyecto - CRISP-DM Página **28** de **49**

GRUPO 002

**Entregable:** Especificación de Requisitos de Operación y Seguridad.

Código Nombre Responsable Estimación (horas)

3.7 Diseño del Plan de Jonathan Javier Quishpe Maldonado 8 Pruebas

Agente QA

**Descripción**Definición de la estrategia de validación. Diseño de casos de prueba unitarios (Vitest/Jest

para hooks y utilidades), pruebas de integración (interacción entre bloques) y pruebas funcionales clave.

Observaciones

**Entregable:** Plan de Pruebas y Casos de Prueba Especificados.

| Código | Nombre                           | Responsable     | Estimación (horas) |
| ------ | -------------------------------- | --------------- | ------------------ |
| 3.8    | Revisión Formal y Generación del | Equipo Completo | 4                  |

Documento DSI

**Descripción**Consolidación de los modelos y especificaciones técnicas. Verificación de trazabilidad

asegurando que cada requisito del ASI tenga su correspondiente componente de diseño en el DSI.

Observaciones

**Entregable:** Especificación de Interfaces (APIs) y Diagrama de Secuencia de Integración.

Plan de Proyecto - CRISP-DM Página **29** de **49**

GRUPO 002

5.2.4 Construcción y Pruebas del Sistema de Información (CSI - Prototipado)

| Código | Nombre                           | Responsable      | Estimación (horas) |
| ------ | -------------------------------- | ---------------- | ------------------ |
| 4.1    | Construcción del Core y Motor de | Jonathan Quishpe | 15                 |

Renderizado Agente Frontend

**Descripción**Programación en React/TypeScript del lienzo principal y el sistema de gestión de estado

(jerarquía de bloques de contenido). Implementación del mecanismo dinámico para renderizar texto, imágenes y líneas de tiempo a partir de un JSON de curso.

Observaciones

**Entregable:** Módulos de código del Core funcional en el repositorio.

| Código | Nombre                      | Responsable | Estimación (horas) |
| ------ | --------------------------- | ----------- | ------------------ |
| 4.2    | Desarrollo e Integración de | Juan Rivas  | 12                 |

Interfaces UI (Vistas) Agente UX

**Descripción**Maquetación con Tailwind CSS de las vistas principales: Entorno del Consumidor (Alumno) y

navegación básica del Entorno Creador (Docente). Integración de los componentes diseñados en el DSI asegurando la adaptabilidad (responsive) y accesibilidad.

Observaciones

**Entregable:** Vistas navegables integradas en la rama principal.

Plan de Proyecto - CRISP-DM Página **30** de **49**

GRUPO 002

| Código | Nombre                          | Responsable      | Estimación (horas) |
| ------ | ------------------------------- | ---------------- | ------------------ |
| 4.3    | Implementación de Integraciones | Jonathan Quishpe | 10                 |

Externas (TTS y API)

**Descripción**Desarrollo de los conectores (servicios/hooks) para consumir la API RESTful de síntesis de

voz (Text-to-Speech) y el servicio de simulación/envío de correos electrónicos, cumpliendo con los requisitos obligatorios de la asignatura.

Observaciones

**Entregable:** Módulos de integración (ej. ttsUtils.ts) operativos.

| Código | Nombre                              | Responsable     | Estimación (horas) |
| ------ | ----------------------------------- | --------------- | ------------------ |
| 4.4    | Ejecución de Pruebas Unitarias y de | Equipo Completo | 8                  |

Componentes Agente QA

**Descripción**Implementación de los casos de prueba diseñados en el DSI utilizando Vitest. Ejecución de

pruebas unitarias sobre utilidades críticas y pruebas de renderizado de componentes para garantizar la estabilidad del prototipo.

Observaciones

**Entregable:** Suite de pruebas en verde (Passed) y reporte de cobertura básico.

Plan de Proyecto - CRISP-DM Página **31** de **49**

GRUPO 002

Código Nombre Responsable Estimación (horas)

4.5 Refactorización Juan Rivas Ibáñez / Agente 5 Asistida y Arquitecto

Optimización

**Descripción**Revisión de código (Code Review) guiada por el Agente IA para mejorar el rendimiento,

eliminar redundancias y aplicar las reglas de estilo (Golden Rules) definidas en el repositorio. Preparación del código para operar sin fricción en el iFrame.

Observaciones

**Entregable:** Código optimizado y estable en la rama main o release.

| Código | Nombre                    | Responsable     | Estimación (horas) |
| ------ | ------------------------- | --------------- | ------------------ |
| 4.6    | Preparación de Entorno de | Equipo Completo | 5                  |

Demostración y Documentación

**Descripción**Despliegue del prototipo en el entorno final (ej. Vercel). Elaboración de los manuales de

usuario simplificados, guiones de demostración y presentación de soporte para la defensa del proyecto ante el tribunal.

Observaciones

**Entregable:** Prototipo desplegado y Presentación lista para el 13 de mayo.

Plan de Proyecto - CRISP-DM Página **32** de **49**

GRUPO 002

5.2.5 Validación y Cierre

| Código | Nombre                                | Responsable | Estimación (horas) |
| ------ | ------------------------------------- | ----------- | ------------------ |
| 5.1    | Pruebas de Validación de Usuario y UX | Juan Rivas  | 6                  |

Jonathan Quishpe

**Descripción**Diseño y ejecución de escenarios de prueba simulando a los usuarios finales (Docente y

Alumno). Validación de la usabilidad, navegación y cumplimiento funcional utilizando los mock de datos generados en la fase CSI.

Observaciones

**Entregable:** Informe de Validación de Usuario y registro de incidencias resueltas.

| Código | Nombre                              | Responsable      | Estimación (horas) |
| ------ | ----------------------------------- | ---------------- | ------------------ |
| 5.2    | Preparación de Entorno Final y Demo | Jonathan Quishpe | 6                  |

**Descripción**Verificación final del despliegue del prototipo en su entorno de producción (iFrame).

Configuración de datos de prueba limpios y preparación de la demostración en vivo.

Observaciones

**Entregable:** Entorno de Demostración estable y verificado.

Plan de Proyecto - CRISP-DM Página **33** de **49**

GRUPO 002

Código Nombre Responsable Estimación (horas)

5.3 Elaboración de Juan Rivas Ibáñez 6 Presentación y Defensa

**Descripción**Diseño de la presentación de soporte para la defensa. Estructuración del discurso para

justificar las decisiones de diseño, la arquitectura y demostrar el cumplimiento de la métrica (MÉTRICA v3) y requisitos de la asignatura.

Observaciones

**Entregable:** Material de Presentación (Diapositivas) y Guion de Defensa.

Código Nombre Responsable Estimación (horas)

5.4 Cierre del Proyecto y Equipo Completo 2 Lecciones Aprendidas

**Descripción**Reunión retrospectiva final para documentar lecciones aprendidas (especialmente sobre el

uso de Agentes IA). Cierre de issues en el repositorio, archivo de documentación final (vFinal) y aceptación del proyecto.

Observaciones

**Entregable:** Acta de Cierre de Proyecto y Documento de Lecciones Aprendidas.

## 5.3 Control y Seguimiento del Trabajo Para garantizar la correcta ejecución de este programa, se establecen los siguientes

mecanismos de control (Gobernanza del Proyecto):

**1.** _Tablero Kanban (Trello):_ Los paquetes de trabajo de la EDT se traducirán a _Tareas_,transitando por los estados _To Do, WIP, Review (Validación Humana)_ y _Done_.
**2.** _Validación de Agentes IA:_ Dado el uso intensivo de IA, ninguna tarea técnica serámarcada como completada sin pasar por un proceso de "Revisión Humana Obligatoria"
que asegure la calidad del código y la no introducción de deuda técnica._3._ **Sincronizaciones Bi-semanales:** Reuniones de control presencial o a través de

Discord para evaluar el avance respecto al cronograma, identificar bloqueos técnicos (ej. problemas con la API de TTS) y reasignar esfuerzo si fuese necesario.

Plan de Proyecto - CRISP-DM Página **34** de **49**

GRUPO 002

## 5.4 Asignación de recursos

En este apartado se detalla la asignación de recursos: quién participa y con qué perfil, su coste por hora y el esfuerzo previsto.

Puesta en marcha del sistema: Del 18 de febrero al 13 de mayo de 2026 (aprox. 3 meses).

Modelo de equipo: Híbrido (Supervisores Humanos + Agentes de IA).

A) Equipo técnico (Fuerza de trabajo)

Esta sección incluye las horas y costes asignados a los perfiles humanos y a los agentes de IA según la tabla de asignación de recursos.

Perfil Horas Totales Tarifa/hora Total (euros)

**Jonathan Quishpe**(Director/Backend/Dev 499 17,00 € 8.483,00 €

Ops)

**Juan Rivas**(Analista/Frontend/Dise 407 17,00 € 6.919,00 €

ñador)

| Agente IA Arquitecto   | 200 | 3,00 € | 600,00 €   |
| ---------------------- | --- | ------ | ---------- |
| Agente IA Frontend     | 384 | 3,00 € | 1.152,00 € |
| Agente IA QA/Tester    | 192 | 3,00 € | 576,00 €   |
| Documentador Agente IA | 199 | 3,00 € | 597,00 €   |

Total 1.881 18.327,00 €

Plan de Proyecto - CRISP-DM Página **35** de **49**

GRUPO 002

B) Otros costes (Infraestructura y servicios externos)

Costes adicionales por servicios externos que están pendientes de cuantificación exacta pero identificados como necesarios.

Concepto Clasificación Precio Est. Justificación

Necesario para cumplir con el**API Text-To-Speech** Coste Directo 120,00 € requisito funcional RF-005

(Generación de Audio).

Coste del entorno de despliegue**Hosting e** Coste Directo 60,00 € (Vercel/Netlify) para los 3 meses de

Infraestructura _desarrollo._

Herramienta de gestión de la PMO; no**Licencias Software (MS** Coste Indirecto 45,00 € forma parte del código final del

**Project)** producto.

| Conectividad y Suministros | Coste Indirecto 30,00 € prorrateados por el trabajo remoto. Gastos de electricidad e internet |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| Formación en React         | Coste Directo 300,00 € supervisión y desarrollo del frontend. Capacitación técnica para la    |

Total sin IVA 555,00 € Total con IVA 671,55 €

Reserva para contingencias: C = 10% (18.327,00 + 555,00) = 1.888,20€

Cálculo Final del BAC (Presupuesto al Finalizar)

BAC = A + B + C BAC = 18.327,00€ + 555,00€ + 1.888,20€ = 20.770,20€

Plan de Proyecto - CRISP-DM Página **36** de **49**

GRUPO 002

## 5.5 Asignación de tareas

Con base en lo anterior, a continuación se detalla la asignación de tareas por miembro del equipo y las horas de dedicación previstas para cada uno.

Fase / Tarea Miembro del Equipo Esfuerzo en Horas

Planificación y Gestión del Sistema de Información (PSI)

| Reunión con el Cliente y                        | (Director/Backend) Jonathan Quishpe | 8 horas  |
| ----------------------------------------------- | ----------------------------------- | -------- |
| Desarrollo de la Idea Inicial                   | (Analista/Frontend) Juan Rivas      | 8 horas  |
| Definición del Alcance del Proyecto             | (Analista/Frontend) Juan Rivas      | 16 horas |
| Definición del Seguimiento, Control y Reuniones | (Director/Backend) Jonathan Quishpe | 16 horas |
| Planificacion del Cronograma (WBS y Gantt)      | (Analista/Frontend) Juan Rivas      | 4 horas  |
| Cálculo y Estimación Inicial de Costes          | (Director/Backend) Jonathan Quishpe | 16 horas |

Jonathan Quishpe 8 horas (Director/Backend)

Asignación de Recursos Juan Rivas 8 horas

(Analista/Frontend)

| Configuración (Repositorio) Plan de Gestión de la | (Director/Backend) Jonathan Quishpe | 8 horas  |
| ------------------------------------------------- | ----------------------------------- | -------- |
| Evaluación y Planificación de                     | (Director/Backend) Jonathan Quishpe | 16 horas |

Riesgos Juan Rivas 16 horas (Analista/Frontend)

Juan Rivas Gestión de Planes Auxiliares 8 horas (Analista/Frontend)

Jonathan Quishpe 16 horas (Director/Backend)

Consolidación y Revisión Juan Rivas 16 horas Formal del Entregable PSI (Analista/Frontend)

| Agente IA Arquitecto   | 16 horas |
| ---------------------- | -------- |
| Agente IA Documentador | 16 horas |

Plan de Proyecto - CRISP-DM Página **37** de **49**

GRUPO 002

| Agente IA Frontend  | 16 horas |
| ------------------- | -------- |
| Agente IA QA/Tester | 16 horas |

Subtotal de horas PSI 228 horas

Análisis del Sistema de Información (ASI)

Jonathan Quishpe 4 horas (Director/Backend)

Catálogo de Requisitos y Juan Rivas Actores 4 horas

(Analista/Frontend)

Agente IA Documentador 24 horas

| Especificación de Casos de Uso | (Analista/Frontend) Juan Rivas      | 32 horas |
| ------------------------------ | ----------------------------------- | -------- |
| Modelado Conceptual de Datos   | (Director/Backend) Jonathan Quishpe | 24 horas |

Juan Rivas Modelado Dinámico 32 horas (Analista/Frontend)

Jonathan Quishpe Análisis y Especificación de (Director/Backend) 88 horas

Interfaces (UI/UX) Agente IA Frontend 88 horas

| (Director/Backend) Jonathan Quishpe | 40 horas |
| ----------------------------------- | -------- |
| (Analista/Frontend) Juan Rivas      | 40 horas |

Definición de Integraciones y Arquitectura Lógica Agente IA Arquitecto 40 horas

| Agente IA Documentador              | 40 horas |
| ----------------------------------- | -------- |
| Agente IA Frontend                  | 40 horas |
| Agente IA QA/Tester                 | 40 horas |
| (Director/Backend) Jonathan Quishpe | 24 horas |
| (Analista/Frontend) Juan Rivas      | 24 horas |

Consolidación y Revisión Formal del Entregable ASI Agente IA Arquitecto 24 horas

| Agente IA Documentador | 24 horas |
| ---------------------- | -------- |
| Agente IA Frontend     | 24 horas |
| Agente IA QA/Tester    | 24 horas |

Plan de Proyecto - CRISP-DM Página **38** de **49**

GRUPO 002

Subtotal de horas ASI 680 horas

Diseño del Sistema de Información (DSI)

Jonathan Quishpe Diseño de la Arquitectura del (Director/Backend) 16 horas

Sistema Agente IA Arquitecto 16 horas

| Renderizado y Estructura Diseño del Motor de  | (Analista/Frontend) Juan Rivas      | 8 horas  |
| --------------------------------------------- | ----------------------------------- | -------- |
| Diseño de Integraciones (Internas y Externas) | (Director/Backend) Jonathan Quishpe | 16 horas |
| Diseño de UI/UX Detallado y                   | (Director/Backend) Jonathan Quishpe | 32 horas |
| Componentes Visuales                          | Agente IA Frontend                  | 32 horas |

| (Director/Backend) Jonathan Quishpe | 16 horas |
| ----------------------------------- | -------- |
| (Analista/Frontend) Juan Rivas      | 16 horas |

Diseño de Arquitectura de Despliegue y Restricciones Agente IA Arquitecto 16 horas

| Agente IA Documentador | 16 horas |
| ---------------------- | -------- |
| Agente IA Frontend     | 16 horas |
| Agente IA QA/Tester    | 16 horas |

| Diseño de Seguridad y Control de Acceso | (Analista/Frontend) Juan Rivas      | 16 horas |
| --------------------------------------- | ----------------------------------- | -------- |
| Diseño del Plan de Pruebas              | (Director/Backend) Jonathan Quishpe | 16 horas |

| Agente IA QA/Tester                 | 16 horas |
| ----------------------------------- | -------- |
| (Director/Backend) Jonathan Quishpe | 8 horas  |
| (Analista/Frontend) Juan Rivas      | 8 horas  |

Consolidación y Revisión Formal del Entregable DSI Agente IA Arquitecto 8 horas

| Agente IA Documentador | 8 horas |
| ---------------------- | ------- |
| Agente IA Frontend     | 8 horas |
| Agente IA QA/Tester    | 8 horas |

Subtotal de horas DSI 312 horas

Plan de Proyecto - CRISP-DM Página **39** de **49**

GRUPO 002

Construcción y Pruebas del Sistema de Información (CSI)

Jonathan Quishpe Construcción del Core y Motor (Director/Backend) 8 horas

de Renderizado Agente IA Frontend 40 horas

| Desarrollo e Integración de                     | (Analista/Frontend) Juan Rivas | 48 horas |
| ----------------------------------------------- | ------------------------------ | -------- |
| Interfaces UI (Vistas)                          | Agente IA Frontend             | 48 horas |
| Integraciones Externas (TTS y Implementación de | Jonathan Quishpe               | 40 horas |

(Director/Backend) APIs)

| (Director/Backend) Jonathan Quishpe | 32 horas |
| ----------------------------------- | -------- |
| (Analista/Frontend) Juan Rivas      | 32 horas |

Ejecución de Pruebas Unitarias y de Componentes Agente IA Arquitecto 32 horas

| Agente IA Documentador | 32 horas |
| ---------------------- | -------- |
| Agente IA Frontend     | 32 horas |
| Agente IA QA/Tester    | 32 horas |

Juan Rivas Refactorización Asistida y (Analista/Frontend) 16 horas

Optimización Agente IA Arquitecto 16 horas

| (Director/Backend) Jonathan Quishpe | 24 horas |
| ----------------------------------- | -------- |
| (Analista/Frontend) Juan Rivas      | 24 horas |

Preparación de Entorno de Demostración y Doc. Agente IA Arquitecto 24 horas

| Agente IA Documentador | 24 horas |
| ---------------------- | -------- |
| Agente IA Frontend     | 24 horas |
| Agente IA QA/Tester    | 24 horas |

Subtotal de horas CSI 552 horas

Validación y Cierre

Pruebas de Validación de Juan Rivas 8 horas Usuario y UX (Analista/Frontend)

Plan de Proyecto - CRISP-DM Página **40** de **49**

GRUPO 002

| Agente IA Frontend                  | 8 horas |
| ----------------------------------- | ------- |
| Agente IA QA/Tester                 | 8 horas |
| (Director/Backend) Jonathan Quishpe | 8 horas |

Juan Rivas 8 horas Preparación de Entorno Final (Analista/Frontend)

y Demo Agente IA Arquitecto 8 horas

| Agente IA Frontend                  | 8 horas |
| ----------------------------------- | ------- |
| Agente IA QA/Tester                 | 8 horas |
| (Director/Backend) Jonathan Quishpe | 8 horas |

Elaboración de Presentación y Juan Rivas Defensa 8 horas

(Analista/Frontend)

| Agente IA Documentador              | 8 horas |
| ----------------------------------- | ------- |
| (Director/Backend) Jonathan Quishpe | 7 horas |

Cierre del Proyecto y Juan Rivas Lecciones Aprendidas 7 horas

(Analista/Frontend)

Agente IA Documentador 7 horas

| Subtotal de horas Validación y Cierre | 109 horas   |
| ------------------------------------- | ----------- |
| Total de horas del proyecto           | 1.881 horas |

Plan de Proyecto - CRISP-DM Página **41** de **49**

GRUPO 002

# 6. EVALUACIÓN Y PLANIFICACIÓN DE RIESGOS

A continuación se expone el Registro de Riesgos detallado para las fases de Construcción (CSI) e Implantación y Aceptación (IAS).

Para cada riesgo se definen acciones de **Mitigación** (para reducir probabilidad o impactoanticipadamente) y de **Contingencia** (acciones reactivas si el riesgo se materializa).

Origen del Id Descripción del Plan de Contingencia Probabilidad Severidad Prioridad Riesgo Riesgo

Aspectos R01 _Mitigación_: Implementar y Media Alta AltaTecnológicos _Cuellos de botella o_ refinar el sistema de TTS

fallos en la API de \_y precargar audios.\_Text-To-Speech (TTS)

**durante la demo.** Ladependencia externa

puede fallar o introducir **Contingencia:** Desactivarlatencia. la llamada a la API y utilizar

exclusivamente los mocks de audio locales (fallback

estático).

Aspectos R02 _Mitigación:_ Realizar Media Alta AltaTecnológicos _Incompatibilidad del_ pruebas de despliegue

| iFrame de Viz-App en el entorno de     | tempranas (Fase 5.2) en un entorno simulado idéntico |
| -------------------------------------- | ---------------------------------------------------- |
| demostración final. Problemas de CORS, | al del cliente/profesor.                             |
| políticas de seguridad o dimensiones   | Transferir: Disponer de                              |
| responsivas rotas.                     | una ejecutándose compilación local en                |

localhost _(\_npm run dev_)lista para compartir\_

pantalla.

Plan de Proyecto - CRISP-DM Página **42** de **49**

GRUPO 002

Aspectos R03 _Mitigación:_ Aplicar Media Media MediaTecnológicos _Rendimiento_ memoization (useMemo,

_deficiente por_ useCallback) y seguir las*re-renderizados en* buenas prácticas

| React. Blocks" (Timeline, Los "Complex | documentadas .agent/skills/vercel-react-b en      |
| -------------------------------------- | ------------------------------------------------- |
| Carousel) causan lentitud al mantener  | est-practices.                                    |
| mucho estado interactivo.              | Contingencia: las animaciones de UI o Simplificar |

desactivar el drag&drop en la vista de alumno.

Aspectos de R04 **Mitigación:** Establecer un Alta Media AltaGestión **Desviación del** "Code Freeze" estricto el 6

**Alcance (Scope** de mayo. Solo se**Creep).** El equipo permitirán correcciones de

invierte demasiado bugs (hotfixes) a partir de tiempo perfeccionando esa fecha.

características visualesen lugar de estabilizar el **Contingencia:** Recortar

MVP para la entrega. funcionalidades secundarias (ej.

configuraciones avanzadas del editor) para la demo.

Aspectos del R05 **Mitigación:** Commits Baja Alta MediaEquipo **Baja temporal de un** diarios granulares.

| miembro del equipo o solapamiento con | Documentación cruzada de componentes críticos (ej. |
| ------------------------------------- | -------------------------------------------------- |
| entregas de otras asignaturas.        | Juan Jonathan y viceversa). revisa el TTS de       |

Contingencia: _Consumir el_

- Buffer" o bolsa de horas de contingencia
  planificadas en el cronograma base.

Plan de Proyecto - CRISP-DM Página **43** de **49**

GRUPO 002

Aspectos de R6 **Mitigación**: Sesión de Media Alta AltaCalidad/Cumpli **Inconsistencia entre** revisión cruzada

miento **el Prototipo** (Auditoría de Trazabilidad)**construido y los** en la Tarea 5.3 al preparar

Documentos \_la defensa.\_MÉTRICA v3 (ASI /

**DSI)**. Lo desarrollado **Contingencia**: Generarno concuerda con los una fe de erratas o

Casos de Uso o actualizar iterativamente Diagramas de Clases los diagramas clave del

entregados DSI para que reflejen el previamente. modelo de datos real

(types/course.ts).

Aspectos de R7 **Mitigación**: Integración de Media Media MediaCalidad/Cumpli **Descubrimiento de** tests unitarios automáticos

miento **bugs críticos** (Vitest) en hooks críticos**("Showstoppers")** (useUnitAudio,

**durante la Tarea 5.1** useTextSequence) desde**(Pruebas de** el inicio.

Validación). Contingencia*: Si un*

bloque complejo falla irremediablemente,

sustituirlo por un componente TextBlock o

ImageBlock estandarizado en la presentación.

Plan de Proyecto - CRISP-DM Página **44** de **49**

GRUPO 002

# 7. PLANES DE GESTIÓN AUXILIARES

En este proyecto se han definido los planes de apoyo esenciales para garantizar la calidad de los entregables, el control de cambios riguroso y la trazabilidad del proyecto, elementos cruciales en

el modelo de desarrollo híbrido de Viz-App.

## 7.1 Plan de Gestión de la Configuración

Define la metodología de control de versiones y gestión de activos para asegurar la integridad de la rama principal de producción y proteger el código generado automáticamente por los Agentes

de Inteligencia Artificial.

- **●** Control de Versiones y Ramificación*:*
- **●** Se utilizará un repositorio Git bajo el modelo de ramificación Git Flow.
- **●** Los Agentes IA trabajarán en Ramas Efímeras (feature/_, fix/_, refactor/\*),aislando los cambios de cada tarea.
- **●** El código generado por IA debe pasar por una Pull Request (PR) hacia lasramas de prueba (test o pre-prod) antes de integrarse al main, garantizando la
  validación estricta por parte de los supervisores humanos.

- **●** _Identificación de Elementos de Configuración (IEC)_: Serán formalmente controladosy versionados el código fuente, la documentación técnica y funcional, los mocks (JSON)
  de datos, y los scripts de entorno.

## 7.2 Plan de Gestión de Pruebas y Calidad

Establece las directrices y herramientas para verificar que el sistema cumpla con todos los Requisitos Funcionales (RF) y No Funcionales (RNF), con especial énfasis en la calidad del

código y la funcionalidad TTS.

- **●** Estrategia de Pruebas*:*
- **●** Pruebas Unitarias: Se utilizará Vitest para garantizar una cobertura mínima depruebas unitarias superior al 70% (RNF-004), siendo un indicador clave para
  validar el código producido por los agentes IA.

- **●** Pruebas End-to-End (E2E): Se empleará Playwright para simular la experienciacompleta del usuario y asegurar la correcta funcionalidad en el entorno de un
  LMS (iFrame), incluyendo el flujo del Modo Editor/Lector y la Generación de Audio (TTS).

- **●** Revisiones Documentales: Se mantendrán revisiones planificadas de losInformes de Seguimiento para verificar la estructura, coherencia con la EDT,
  objetivos y formato del documento.

- **●** _Responsables de la Calidad_: Cada integrante del grupo es responsable de la revisiónde su parte, además de realizar una revisión cruzada con otro miembro para detectar
  incoherencias.

Plan de Proyecto - CRISP-DM Página **45** de **49**

GRUPO 002

## 7.3 Plan de Comunicación

Define los canales y la frecuencia de los flujos de comunicación interna y externa para asegurar una coordinación transparente y eficaz del equipo.

- **●** _Comunicación Interna_: Se establecerán reuniones semanales de equipo para revisaravances, coordinar tareas y detectar incidencias, utilizando la plataforma Discord para
  conversaciones de voz y presentaciones por pantalla.

- **●** _Comunicación Externa_: Se generarán informes periódicos de avance para losinteresados (stakeholders). Toda la información relevante y las actas de las reuniones se
  registrarán en Google Drive para asegurar la trazabilidad de las decisiones.

## 7.4 Plan de Seguridad

Detalla las medidas para garantizar la confidencialidad, integridad y disponibilidad de la información y los activos del proyecto.

- **●** _Control de Acceso_: El documento y sus anexos se guardarán en Google Drive conacceso restringido.
- **●** _Copias de Seguridad_: Se realizarán copias de seguridad semanales en una carpeta derespaldo y una copia externa antes de cada entrega, con un protocolo de restauración
  inmediata en caso de pérdida o error.

- **●** _Control de Canales_: El servidor de Discord se configurará como privado, limitando elacceso únicamente a los integrantes del equipo.

# 8. TEMAS ABIERTOS Y DECISIONES PENDIENTES

Este apartado recoge los elementos del proyecto cuya definición está incompleta o requiere la aprobación final de los interesados (stakeholders) antes de proceder con las fases de ejecución.

## 8.1 Decisiones Pendientes

Tema Abierto Descripción Impacto Potencial Fecha Límite Sugerida

**Presupuesto APIs** Definición y Afecta la Finalización de la**(TTS)** asignación del interoperabilidad y la fase ASI

presupuesto final disponibilidad del para los proveedores requisito FR-005.

de servicios de Text-to-Speech

(TTS). Es crucial para determinar el

proveedor principal y

Plan de Proyecto - CRISP-DM Página **46** de **49**

GRUPO 002

el sistema fallback (RNF-006).

**Infraestructura de** Decisión final sobre Riesgo de retraso en Finalización de la**Despliegue** el entorno de hosting la fase CSI y fase DSI

de producción y despliegue del pre-producción. prototipo.

Afecta la estrategia de CI/CD.

**Validación de** Aprobación formal Bloquea el inicio de Próxima reunión de**Requisitos** del conjunto las tareas de seguimiento

completo de codificación de la Requisitos fase DSI.

Funcionales (RF-001 a RF-006) y No

Funcionales (RNF-001 a

RNF-006), los cuales figuran actualmente

como Pendiente de revisión.

## 8.2 Temas Abiertos

Tema Abierto Descripción Fase de Definición Sugerida

**Modelo de Gobernanza de** Detallar los criterios de Fase DSI**Agentes IA** validación y las métricas de

supervisión humana específicas para el código

generado por los agentes IA, asegurando la calidad y el

cumplimiento del 70% de cobertura de pruebas

unitarias (RNF-004).

**Estrategia de Interacción** Definir el plan detallado para Fase CSI**con Usuarios** la recopilación de feedback y

validación con los usuarios externos (Docentes y

Estudiantes) una vez se disponga del prototipo

funcional.

Plan de Proyecto - CRISP-DM Página **47** de **49**

GRUPO 002

_Evolución a LTI v1.3_ Elaborar un plan de ruta Fase PSI/ASI(roadmap) a corto/medio

plazo para migrar de la integración mediante iFrames

a la implementación completa del estándar LTI v1.3

(RNF-005).

# 9. OTROS ASPECTOS DEL PROYECTO

Para asegurar la correcta ejecución, control de versiones y calidad del prototipo "Viz-App", se ha definido un stack tecnológico y de gestión estandarizado para todo el equipo.

## 9.1 Herramientas de desarrollo

Cada participante contará con su propio equipo personal, así como con los recursos y materiales proporcionados por la Universidad Pablo de Olavide. De este modo, se garantizará que todos los

miembros del equipo dispongan de los medios necesarios para el correcto desarrollo del proyecto, la compilación de la aplicación en React y la redacción de los documentos ASI y DSI.

## 9.2 Herramientas de software

Durante el transcurso del proyecto se emplearán las siguientes herramientas:

**➤** Entorno de Desarrollo y Código (Frontend)

- **●** _Vite + React (TypeScript):_ Framework y librería principal para la construcción delprototipo interactivo garantizando un alto rendimiento y modularidad mediante bloques.
- **●** _GitHub:_ Plataforma para el control de versiones distribuido. Permite la colaboración enel código, gestión de ramas (_branches_) y revisión de cambios.
  **➤** Gestión Documental y Colaborativa

- **●** _Google Drive:_ Se empleará para almacenar y compartir documentos (versiones PDF deASI, DSI, Plan de Proyecto). Asegura que el acceso a la información sea seguro y
  rápido.

- **●** _Google Docs:_ Funcionará como la herramienta principal para crear y editar documentosde forma colaborativa, permitiendo que ambos miembros trabajen al mismo tiempo
  gestionando versiones en tiempo real.

**➤** Gestión de Proyecto y Modelado

- **●** _Microsoft Project / Excel:_ Permitirá una planificación y gestión de las tareas delproyecto (WBS, Gantt) de forma detallada, facilitando el seguimiento de horas (como las
  detalladas en la fase 5).

Plan de Proyecto - CRISP-DM Página **48** de **49**

GRUPO 002

- **●** _Draw.io / Lucidchart/ StarUML:_ Se utilizará para elaborar el organigrama, el EDT,Diagramas de Clases, Casos de Uso y otros diagramas UML exigidos por MÉTRICA v3,
  manteniendo un formato uniforme.

**➤** Comunicación

- **●** _Discord:_ Será el canal de comunicación más importante del equipo, favoreciendo lasreuniones, el intercambio de ideas, la resolución de impedimentos (Daily Stand-ups
  adaptados) y la coordinación diaria.

Plan de Proyecto - CRISP-DM Página **49** de **49**

GRUPO 002
