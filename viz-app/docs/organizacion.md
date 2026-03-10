# Organización Formal del Proyecto Viz-App

## 1. Corrección Conceptual: El Rol de QA

Tienes toda la razón. Analizando la estructura formal del proyecto, **el Agente QA / Tester no es un subordinado del Frontend**. Se encuentra exactamente en el mismo nivel jerárquico (**Nivel 3: Implementación y Ejecución**). 

*   El **Frontend** se encarga de *construir* (React, Tailwind).
*   El **QA / Tester** se encarga de *destruir y verificar* (Vitest, Playwright, flujos visuales). 

Son fuerzas contrarias pero complementarias que actúan al mismo nivel. El QA audita al Frontend (y también al Backend o la Lógica del Arquitecto si fuera necesario).

Por lo tanto, la verdadera jerarquía no es que "QA dependa de Frontend", sino que **existen Agentes Generales (Nivel 3)** y, por debajo de ellos, **Sub-agentes Especializados (Nivel 4)**.

---

## 2. Diagrama de Estructura Organizativa (Híbrida)

A continuación, el diagrama actualizado que refleja correctamente los niveles de humanos, el nodo de validación cruzada y la relación entre Agentes y Sub-agentes:

```mermaid
graph TD
    %% NIVEL 1: SERES HUMANOS
    subgraph Nivel_1 ["Nivel 1: Dirección y Supervisión (Humanos)"]
        direction LR
        JJ["Jonathan J. Quishpe<br/>(Director / Backend / DevOps)"]
        JR["Juan Rivas Ibáñez<br/>(Analista / Frontend / Diseñador)"]
    end

    %% NIVEL 2: VALIDACIÓN
    subgraph Nivel_2 ["Nivel 2: Propuesta y Valoración"]
        HITL{"Validación<br/>Human-in-the-loop"}
    end

    JJ --> HITL
    JR --> HITL

    %% NIVEL 3: AGENTES COORDINADORES (IA)
    subgraph Nivel_3 ["Nivel 3: Implementación y Ejecución (Agentes)"]
        direction LR
        Arq["Agente Arquitecto<br/>(Estructura y Lógica)"]
        Front["Agente Frontend<br/>(React / Tailwind)"]
        QA["Agente QA / Tester<br/>(Vitest / Playwright)"]
        Doc["Agente Documentador<br/>(Métrica v3 / Content)"]
    end

    HITL --> Arq
    HITL --> Front
    HITL --> QA
    HITL --> Doc

    %% NIVEL 4: SUB-AGENTES ESPECIALIZADOS (IA)
    subgraph Nivel_4 ["Nivel 4: Sub-agentes (Especialistas de Dominio)"]
        direction LR
        UX["/sub-agente-ux-expert<br/>(Asesora UI/UX)"]
        Opt["/agente-optimizador<br/>(Mejora Continua)"]
        Insp["/sub-agente-qa<br/>(Inspector Visual / Playwright)"]
        Cien["/sub-agente-tester<br/>(Tests Unitarios / Vitest)"]
    end

    %% RELACIONES DE DOMINIO (Líneas punteadas para indicar dependencia técnica)
    Front -.->|Coordina a| UX
    Arq -.->|Supervisado por| Opt
    QA -.->|Ejecuta| Insp
    QA -.->|Ejecuta| Cien

    %% ESTILOS
    classDef N1 fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#004d40;
    classDef Human fill:#b2dfdb,stroke:#00796b,stroke-width:1px,color:#004d40;
    classDef HITL fill:#fbe9e7,stroke:#d84315,stroke-width:2px,color:#bf360c,shape:rhombus;
    classDef Agente_Arq fill:#f1f8e9,stroke:#558b2f,stroke-width:2px,color:#33691e;
    classDef Agente_Front fill:#fff8e1,stroke:#ff8f00,stroke-width:2px,color:#ff6f00;
    classDef Agente_QA fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px,color:#4a148c;
    classDef Agente_Doc fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1;
    classDef SubAgente fill:#ffffff,stroke:#757575,stroke-width:1px,stroke-dasharray: 5 5;

    class JJ,JR Human;
    class HITL HITL;
    class Arq Agente_Arq;
    class Front Agente_Front;
    class QA Agente_QA;
    class Doc Agente_Doc;
    class UX,Opt,Insp,Cien SubAgente;
```

---

## 3. Comprendiendo la Jerarquía (Agentes vs Sub-agentes)

Para que el modelo escale, hemos dividido a la Inteligencia Artificial en dos capas operativas (Nivel 3 y Nivel 4):

### Nivel 3: Agentes (Coordinadores de Dominio)
Son los equivalentes a los "Tech Leads" de cada área. Tienen una visión global de su dominio y son los responsables de entregar el bloque de trabajo al Nivel 2 (Validación Humana).
*   Ejemplo: El **Agente QA / Tester** sabe que un componente necesita tanto validación lógica (*Unit Testing*) como validación de interfaz (*E2E/Visual*).

### Nivel 4: Sub-agentes (Especialistas / Prompts Específicos)
Son herramientas o perfiles hiper-especializados (invocados vía *slash commands* como `/sub-agente-ux-expert` o `/sub-agente-tester`). 
*   No tienen una visión de todo el proyecto, solo de su tarea concreta.
*   **Dependen de un Agente de Nivel 3**. Por ejemplo, el *Agente Frontend*, mientras codifica un modal complejo, invocará temporalmente al *Sub-agente UX* para pedirle consejo sobre accesibilidad de colores, pero el código final lo ensambla el Frontend. Del mismo modo, el *Agente QA* delegará la creación de los tests de Vitest al *Sub-agente Científico/Tester*.
