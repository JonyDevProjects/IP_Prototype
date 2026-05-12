# Diagramas de Secuencia del Sistema VizApp

Este documento describe la interacción dinámica entre los objetos del sistema para cumplir con los procesos de negocio críticos, utilizando los subsistemas y clases definidos en la fase de análisis.

---

## 1. CU-08: Configuración de Lógica Reactiva de Nodos
Modelado de la interacción para programar comportamientos dinámicos en el Canvas.

```mermaid
sequenceDiagram
    actor Docente
    participant UI as EditorCanvas (Boundary)
    participant VAL as RuleValidator (Control)
    participant ENT as Nodo (Entity)
    participant STO as Storage (Entity)

    Docente->>UI: Seleccionar Nodo
    UI->>VAL: Solicitar Schema de Reglas
    VAL-->>UI: Retornar Gramática
    Docente->>UI: Ingresar Regla (Ej: "If X then Y")
    UI->>VAL: Validar Sintaxis(Regla)
    activate VAL
    VAL->>VAL: Chequeo Semántico
    VAL-->>UI: Validación Exitosa
    deactivate VAL
    Docente->>UI: Guardar Configuración
    UI->>ENT: ActualizarLógica(Regla)
    ENT->>STO: Persistir en JSON
    STO-->>UI: Confirmación de Guardado
    UI-->>Docente: Mostrar "Éxito"
```

---

## 2. CU-04: Reproducción de Audio TTS con Gestión de Resiliencia
Orquestación del servicio de voz con estrategia de caché y fallback.

```mermaid
sequenceDiagram
    actor Estudiante
    participant PLY as PlayerUI (Boundary)
    participant ENG as AudioEngine (Control)
    participant CSH as CacheManager (Entity/Control)
    participant API as TTS_API (External)

    Estudiante->>PLY: Clic en Icono Audio
    PLY->>ENG: ReproducirTexto(idBloque)
    activate ENG
    ENG->>CSH: ¿Existe Audio en Caché?
    alt Audio en Caché
        CSH-->>ENG: Retornar URL AudioLocal
    else Audio NO existe
        ENG->>API: SintetizarVoz(texto, perfil)
        API-->>ENG: Stream de Audio (MP3)
        ENG->>CSH: Guardar en Caché(idBloque, stream)
    end
    ENG->>PLY: Cargar Stream de Audio
    ENG->>PLY: Iniciar Highlight de Texto
    PLY-->>Estudiante: Reproducir Audio
    deactivate ENG
```

---

## 3. CU-14: Publicación y Versionado (Cierre de Edición)
Flujo de validación e integridad previo a la exportación SCORM.

```mermaid
sequenceDiagram
    actor Docente
    participant DB as Dashboard (Boundary)
    participant PM as PublishManager (Control)
    participant IC as IntegrityChecker (Control)
    participant AUD as AuditLogger (Service)

    Docente->>DB: Solicitar Publicación (Version vX.X)
    DB->>PM: IniciarProcesoPublicacion()
    activate PM
    PM->>IC: ValidarIntegridadCurso(cursoId)
    IC->>IC: Chequear páginas vacías
    IC->>IC: Verificar enlaces multimedia
    IC-->>PM: Informe de Integridad (OK)
    
    PM->>PM: Generar SCORM/LTI Package (.zip)
    PM->>AUD: RegistrarEvento("Publicación", cursoId, version)
    AUD-->>PM: Registro Forense Creado
    
    PM-->>DB: Retornar Link de Descarga
    deactivate PM
    DB-->>Docente: Mostrar "Publicación Exitosa"
```

---

## 4. CU-02: Configuración de Bloques Multimedia
Interacción para añadir y parametrizar componentes en el editor.

```mermaid
sequenceDiagram
    actor Docente
    participant UI as EditorUI (Boundary)
    participant BM as BlockManager (Control)
    participant ENT as Bloque (Entity)
    participant STO as Storage (Entity)

    Docente->>UI: Arrastrar Bloque al Canvas
    UI->>BM: CrearInstanciaBloque(tipo)
    BM->>ENT: Initialize()
    ENT-->>UI: Bloque Creado
    Docente->>UI: Configurar Parámetros (Imagen/Texto)
    UI->>BM: ValidarPropiedades(params)
    BM-->>UI: Parámetros Válidos
    Docente->>UI: Aplicar Cambios
    UI->>STO: PersistirEstadoTemporal()
    STO-->>UI: Success
    UI-->>Docente: Refrescar Vista de Canvas
```
