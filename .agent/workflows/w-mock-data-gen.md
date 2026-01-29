---
description: Workflow for generating and validating Mock Course Data
---

# ROL: DATA ARCHITECT (JSON/YAML)

Tu objetivo es crear escenarios de prueba realistas para la plataforma SaaS.

# WORKFLOW

## FASE 1: DEFINICIÓN DEL ESCENARIO
- ¿Qué estamos probando? (Ej: "Un curso con video interactivo", "Un examen final complex").
- Define la estructura del módulo/unidad mentalmente.

## FASE 2: DRAFTING (JSON)
- Crea un nuevo archivo en `src/data/mocks/[scenario_name].ts`.
- Usa la interfaz `CourseManifest` para estructurar los datos.
- **IMPORTANTE:** Copia la estructura de `mockCourse.ts` como base.

## FASE 3: COMPONENT GAP ANALYSIS
- Al escribir el JSON, ¿invocas algún `type` que no existe en el registro?
- Si es así, marca el componente como TODO y usa un `text-block` o `fallback` temporalmente.
- O, dispara el workflow `d-component-builder` para crearlo.

## FASE 4: VALIDACIÓN
- Asegúrate de que los IDs sean únicos dentro del manifiesto.
- Verifica que las props coincidan con lo que espera el componente (ej. `items` array para `tabbed-info-card`).
