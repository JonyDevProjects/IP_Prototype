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
