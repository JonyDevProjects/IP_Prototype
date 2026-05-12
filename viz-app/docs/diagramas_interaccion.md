# Diagramas de Interacción (DSI)

## Subsistema SUB-01: Editor de Contenidos

El siguiente diagrama de interacción secuencial corresponde a la Figura 4.2 descrita en el documento DSI. Modela la interacción entre los componentes Boundary (Páginas y controladores) y las operaciones de persistencia delegadas a la clase de servicio.

### Diagrama de Secuencia

```mermaid
sequenceDiagram
    actor Usuario
    
    box Front-end / Backing Beans
    participant Canvas as <<boundary>><br/>IU-100 Lienzo de Edición
    participant CanvasBean as <<control>><br/>canvasEditorBackingBean.java
    participant Props as <<boundary>><br/>IU-101 Panel de Propiedades
    participant PropsBean as <<control>><br/>propiedadesNodoBackingBean.java
    end
    
    box Back-end / Servicios
    participant Servicio as <<control>><br/>EditorContenidosServicio
    end

    %% Interacción con el Lienzo de Edición
    Usuario->>Canvas: Modificar elemento en el lienzo
    activate Canvas
    Canvas->>CanvasBean: procesarEdicionLienzo()
    activate CanvasBean
    CanvasBean->>Servicio: persistirCambiosLienzo(datos)
    activate Servicio
    Servicio-->>CanvasBean: Confirmación de persistencia
    deactivate Servicio
    CanvasBean-->>Canvas: Actualizar vista del lienzo
    deactivate CanvasBean
    Canvas-->>Usuario: Vista del lienzo actualizada
    deactivate Canvas

    %% Interacción con el Panel de Propiedades
    Usuario->>Props: Cambiar propiedad de elemento seleccionado
    activate Props
    Props->>PropsBean: actualizarPropiedadElemento()
    activate PropsBean
    PropsBean->>Servicio: persistirPropiedad(datos)
    activate Servicio
    Servicio-->>PropsBean: Confirmación de persistencia
    deactivate Servicio
    PropsBean-->>Props: Actualizar vista del panel
    deactivate PropsBean
    Props-->>Usuario: Vista de propiedades actualizada
    deactivate Props
```

**Descripción de los Componentes:**
- **IU-100 – Lienzo de Edición (`canvasEditorBackingBean.java`):** Componente de tipo *Boundary / Controller* responsable de capturar los eventos y acciones directas del usuario sobre el lienzo (como mover, crear o conectar nodos).
- **IU-101 – Panel de Propiedades (`propiedadesNodoBackingBean.java`):** Componente de tipo *Boundary / Controller* que permite al usuario visualizar y editar los atributos específicos del nodo seleccionado.
- **`EditorContenidosServicio`:** Clase de servicio encargada de abstraer y ejecutar todas las operaciones de persistencia o transacciones complejas, separando la lógica de negocio y persistencia de los controladores de la interfaz gráfica.

---

## Subsistema SUB-02: Player / Motor de Ejecución

El siguiente diagrama de interacción secuencial corresponde a la Figura 4.4 descrita en el documento DSI para el Player. Destaca el flujo de ejecución y cómo se delega la lógica central de procesamiento (específicamente la de los mensajes 2 y 3) al servicio del motor en tiempo de ejecución.

### Diagrama de Secuencia

```mermaid
sequenceDiagram
    actor Usuario
    
    box Front-end / Backing Beans
    participant Player as <<boundary>><br/>IU-200 Player Principal
    participant PlayerBean as <<control>><br/>playerBackingBean.java
    end
    
    box Back-end / Servicios
    participant Motor as <<control>><br/>MotorRuntimeServicio.java
    end

    Usuario->>Player: Interactúa con la actividad (ej. enviar respuesta)
    activate Player
    Player->>PlayerBean: procesarInteraccionPlayer()
    activate PlayerBean
    
    %% Lógica de mensajes 2 y 3 delegada al Motor
    PlayerBean->>Motor: ejecutarLogicaRuntime()
    activate Motor
    Note over Motor: Implementación de la lógica<br/>de los mensajes 2 y 3
    Motor-->>PlayerBean: Resultado y próximo estado
    deactivate Motor
    
    PlayerBean-->>Player: Actualizar interfaz del Player
    deactivate PlayerBean
    Player-->>Usuario: Mostrar feedback o siguiente contenido
    deactivate Player
```

**Descripción de los Componentes:**
- **IU-200 – Player Principal (`playerBackingBean.java`):** Componente de tipo *Boundary / Controller* encargado de presentar el contenido interactivo al usuario y capturar sus respuestas o eventos.
- **Controlador Central (`MotorRuntimeServicio.java`):** Servicio (Control) que implementa el motor de ejecución en tiempo real. Es el responsable de recibir el evento, evaluar la lógica asociada al nodo actual (mensajes 2 y 3) y devolver el estado resultante para que la vista se actualice.

---

## Subsistema SUB-03: Seguridad y Autenticación

El siguiente diagrama de interacción secuencial corresponde a la Figura 4.6 descrita en el documento DSI. Modela el flujo de seguridad, destacando la interacción con la pantalla de login y la delegación de la autenticación al servicio de tokens.

### Diagrama de Secuencia

```mermaid
sequenceDiagram
    actor Usuario
    
    box Front-end / Backing Beans
    participant Login as <<boundary>><br/>IU-001 Pantalla de Login
    participant LoginBean as <<control>><br/>loginBackingBean.java
    end
    
    box Back-end / Servicios
    participant JWT as <<control>><br/>ServicioAutenticacionJWT
    end

    Usuario->>Login: Ingresa credenciales (usuario/contraseña)
    activate Login
    Login->>LoginBean: iniciarSesion(credenciales)
    activate LoginBean
    
    %% Generación de token (Mensaje 4)
    LoginBean->>JWT: generarTokenAcceso(credenciales)
    activate JWT
    Note over JWT: Cifrado y generación<br/>de token de acceso (Mensaje 4)
    JWT-->>LoginBean: Retorna Token JWT (o error)
    deactivate JWT
    
    LoginBean-->>Login: Manejo de respuesta (redirección o error)
    deactivate LoginBean
    Login-->>Usuario: Redirige al Dashboard o muestra error de login
    deactivate Login
```

**Descripción de los Componentes:**
- **IU-001 – Pantalla de Login (`loginBackingBean.java`):** Componente de tipo *Boundary / Controller* que representa la interfaz de autenticación. Captura las credenciales ingresadas por el usuario y gestiona la respuesta (acceso concedido o denegado).
- **Servicio Externo (`ServicioAutenticacionJWT`):** Servicio encargado de la seguridad de la aplicación. Centraliza la lógica de validación, cifrado y generación de tokens de acceso (referenciado como el mensaje 4), permitiendo un manejo de sesiones seguro e independiente de los controladores de vista.


