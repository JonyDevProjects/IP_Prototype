# Documento Base: Análisis del Sistema de Información (ASI) - VizApp

## 1. Introducción y Objetivo del Documento
Este documento establece las bases y directrices para llevar a cabo el proceso de Análisis del Sistema de Información (ASI) del proyecto **VizApp**, siguiendo el marco metodológico de **MÉTRICA v3** bajo un **enfoque Orientado a Objetos (OO)**.

El objetivo general del proceso ASI es obtener una especificación detallada del sistema que satisfaga las necesidades de los usuarios y sirva como base sólida para la posterior fase de Diseño de Sistemas de Información (DSI). Dado que actualmente contamos con un **prototipo funcional** (desarrollado en React), este documento asienta cómo dicho prototipo se integra metodológicamente y justifica el análisis previo.

## 2. Enfoque Metodológico: Orientado a Objetos (OO) y Prototipado
Tras el análisis inicial del Plan de Proyecto (PSI) y la construcción visual del prototipo en React, TypeScript y gestión de estados globales, la vertiente principal del análisis se alinea metodológicamente con la **Orientación a Objetos (OO)**. Esto se debe a que el modelado inicial del frontend interactivo requiere de Diagramas de Clases de Análisis, Diagramas de Casos de Uso y Diagramas de Secuencia (Herramientas OO en MÉTRICA v3). 

**Sin embargo, se debe dejar constancia de que el enfoque global del Sistema VizApp adopta una naturaleza Híbrida escalable:**

> [!NOTE] 
> **Nota Metodológica para el ASI (Perspectiva Backend y Persistencia):**
> Aunque el alcance prioritario del prototipo actual es mostrar un frontend orgánico y funcional, el Análisis del Sistema de Información (ASI) no debe descuidar la arquitectura final completa de la solución.
> 
> En etapas de diseño técnico (DSI) concurrentes o futuras, cuando el desarrollo profundice más allá del frontend, será indispensable incorporar **Modelado Estructurado**. La implementación de la lógica transaccional de servidor, la integración de APIs (como los servicios de TTS o envíos de email) y la creación de los futuros *CRUDs* (Crear, Leer, Actualizar, Borrar) para la persistencia real de cursos, reportes y usuarios requerirán ineludiblemente la elaboración de:
> *   **Modelos Entidad-Relación (MER):** Para estructurar físicamente las bases de datos subyacentes.
> *   **Diagramas de Flujo de Datos (DFD):** Para mapear el tránsito de la información en integraciones complejas (LMS / OAuth2 / Servicios Externos).

En este contexto mixto, el prototipo actual actúa como la pieza central concurrente de la *Parte Visual/OO*. Esta aproximación permite:
*   Descubrir, consolidar y refinar requisitos de forma ágil apoyados en una representación visual tangible (ASI 9).
*   Extraer de manera dinámica ("ingeniería inversa") el modelo de clases (ASI 5) y los flujos de casos de uso (ASI 4) a partir de la interacción real con el prototipo, asegurando que el análisis nace de una base interactivamente viable, y que sentará las reglas lógicas para el posterior estructurado del Backend.

## 3. Relación y Secuenciación de Actividades (ASI) en VizApp

A continuación, se detalla cómo se abordarán las actividades del proceso ASI en VizApp, distinguiendo la fase paralela de construcción de la fase secuencial de cierre.

### 3.1. Fase 1: Actividades Iterativas y en Paralelo (En curso / A consolidar)
Estas actividades se han retroalimentado mutuamente durante la construcción iterativa del prototipo y deben formalizarse documentalmente a la par.

1.  **ASI 1 - Definición del Sistema:**
    *   **Objetivo:** Delimitar el alcance general de VizApp, identificar a los usuarios/actores principales y definir el contexto de la aplicación.
    *   **Aplicación en VizApp:** Formalizar el propósito del simulador visual y sus fronteras de integración.

2.  **ASI 9 - Definición de Interfaces de Usuario:**
    *   **Objetivo:** Especificar el formato y comportamiento de los diálogos usuario-sistema.
    *   **Aplicación en VizApp:** **Esta ha sido la actividad tractora.** El prototipo desarrollado en React constituye el artefacto principal de validación. La tarea consistirá en documentar formalmente las pantallas clave, flujos de navegación y elementos de interacción del Canvas y demás componentes. Además, **se debe incluir y documentar explícitamente el diseño de la Interfaz de Reportes** del sistema (fundamental para la consulta y análisis de resultados de la simulacion o gestión), asegurando su trazabilidad en el análisis aunque no figurase en el Plan de Sistemas de Información (PSI) original.

3.  **ASI 2 - Establecimiento de Requisitos:**
    *   **Objetivo:** Recopilar e inventariar los requisitos funcionales, no funcionales y de información.
    *   **Aplicación en VizApp:** Traducir las capacidades observadas y previstas en el prototipo a un **Catálogo Formal de Requisitos**. Esta tarea se nutre directamente y en paralelo de los descubrimientos hechos en ASI 9 y ASI 4.

4.  **ASI 4 - Análisis de Casos de Uso (Enfoque OO):**
    *   **Objetivo:** Identificar los actores y los escenarios principales de uso del sistema.
    *   **Aplicación en VizApp:** Extraer y detallar los flujos fundamentales a partir de la interacción con el prototipo. (Ejemplos: *Añadir componente al canvas, Configurar propiedades de nodo, Ejecutar simulación, Iniciar audioguía, **Generar y Exportar Reportes del Sistema***).

5.  **ASI 5 - Análisis de Clases (Enfoque OO):**
    *   **Objetivo:** Identificar las entidades conceptuales, sus atributos y relaciones estáticas.
    *   **Aplicación en VizApp:** A partir del estado gestionado en el prototipo React (Redux, Context, State), modelar las abstracciones de negocio correspondientes (Ej. diagrama de clases conceptual con entidades como `Node`, `Connection`, `InfrastructureGraph`, `SimulationResult`).

6.  **ASI 6 - Análisis del Comportamiento de Clases (Enfoque OO):**
    *   **Objetivo:** Describir la dinámica y cómo interactúan las instancias de las clases en el tiempo, especialmente para escenarios complejos.
    *   **Aplicación en VizApp:** Desarrollar Diagramas de Estado para los componentes clave sujetos a cambios (p.ej., el flujo de los nodos en tiempo de simulación) o Diagramas de Secuencia para el proceso asíncrono de TTS (Audio).

7.  **ASI 3 - Identificación de Subsistemas de Análisis:**
    *   **Objetivo:** Descomponer lógicamente el sistema en módulos abarcables.
    *   **Aplicación en VizApp:** Ejecutado de forma transversal mientras crecen los modelos. Posible agrupación en subsistemas analíticos: *Subsistema de Renderizado Canvas*, *Subsistema de Lógica de Negocio/Simulación*, *Subsistema de Audio y Accesibilidad*, y el **Subsistema de Reportes e Informes**.

### 3.2. Fase 2: Actividades de Cierre y Formalización (Secuenciales)
Una vez estabilizados los modelos lógicos y habiendo validado las funcionalidades iteradas en el prototipo, se procede **secuencialmente** al cierre formal del Análisis.

8.  **ASI 10 - Análisis de Consistencia y Especificación de Requisitos:**
    *   **Secuencialidad:** Solo puede finalizarse tras completar satisfactoriamente la Fase 1 (Modelado y Requisitos).
    *   **Aplicación en VizApp:** Tarea de revisión cruzada para asegurar que ningún modelo de Clases/Casos de uso contradice al Catálogo de Requisitos, ni a la interfaz. Resultado final: **Documento de Especificación de Requisitos del Sistema (SRS)**.

9.  **ASI 11 - Especificación del Plan de Pruebas:**
    *   **Secuencialidad:** Se ejecuta apoyándose en el Catálogo de Requisitos y los Casos de Uso consolidados.
    *   **Aplicación en VizApp:** Diseño de la estrategia de validación conceptual (qué probar y con qué escenarios mínimos) para asegurar la trazabilidad con los requisitos definidos.

10. **ASI 12 - Aprobación del Análisis del Sistema de Información:**
    *   **Secuencialidad:** La actividad de cierre absoluto del proceso ASI.
    *   **Aplicación en VizApp:** Hito final de evaluación. Presentación conjunta del Prototipo funcional, Catálogo de Requisitos, Modelo OO (Clases/Casos de Uso) para obtener la validación directiva/cliente y dar luz verde al inicio del proceso de Diseño Técnico (DSI).

### 3.3. Trazabilidad con el Plan de Proyecto (PSI) Aprobado
Dado que el Plan de Proyecto (PSI) ya ha sido entregado (**Versión 1, 18 de febrero de 2026**), la inclusión de la funcionalidad de *Reportes del Sistema* no requiere una modificación del alcance estructural, sino que se justifica como un desarrollo orgánico derivado de los requisitos y actividades ya planificadas.

Específicamente, el análisis y diseño de la **Interfaz de Reportes** tiene un encaje natural explícito en la fase de Diseño (DSI) dentro del **Paquete de Trabajo 3.4: Diseño de UI/UX Detallado y Componentes Visuales (Estimado: 12h)**.

**Justificación metodológica del encaje en el PT 3.4:**
1.  **Evolución interactiva:** El PT 3.4 contempla la "Evolución de los mockups (ASI) a un diseño pixel-perfect". La necesidad de visualizar resultados (reportes) es una consecuencia directa del Caso de Uso *Ejecutar Simulación*, por lo que el diseño de las pantallas o modales de resultados de dicha simulación se absorberá contablemente bajo las horas asignadas a este paquete de la EDT.
2.  **Cumplimiento del RNF-001 (Usabilidad UX/UI):** Dotar al docente/alumno de un reporte estructurado tras una simulación interactiva forma parte de la directriz de mantener un diseño funcional y limpio establecido en el Plan original, por tanto, en el ASI se modelará el origen de los datos de este informe, pero será en la tarea **3.4** del DSI donde se materialice su componente visual.

---

## 4. Próximos Pasos Recomendados (Plan de Acción Inmediato)
Para transicionar de la experimentación del prototipo a la formalización metodológica del análisis, se proponen los siguientes pasos paralelos como arranque:

1.  **Mapeo de Funcionalidades (ASI 2 / ASI 4):** Redactar un primer borrador de Casos de Uso basado estrictamente en lo que el prototipo de VizApp ya permite hacer y documentar los casos futuros que están previstos.
2.  **Levantamiento del Modelo de Dominio (ASI 5):** Analizar el estado global actual en frontend (`store`/estado de componentes) para dibujar un Diagrama de Clases Conceptuales.
3.  **Catálogo de Vistas (ASI 9):** Extraer capturas (o esquemas conceptuales interactivos) del prototipo actual y enlistarlas como los artefactos de la Definición de Interfaz validados. **Esto deberá incluir un wireframe o maqueta inicial que defina la Interfaz de Reportes.**
