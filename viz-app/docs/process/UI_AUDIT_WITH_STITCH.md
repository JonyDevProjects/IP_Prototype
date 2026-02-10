# Auditoría y Rediseño UI/UX con Stitch (Workflow Extendido)

Este documento detalla el procedimiento para utilizar **Google Labs Stitch** como herramienta de auditoría externa y generación de referencias de diseño para nuestras aplicaciones locales (localhost).

## 1. El Problema
Stitch (especialmente vía MCP) opera en un entorno aislado y no puede "ver" aplicaciones corriendo en `localhost`. Sin embargo, su interfaz web ofrece potentes herramientas de "Redesign" y "Predictive Heatmaps" que queremos aprovechar.

## 2. Solución: Cloudflare Tunnel + Stitch Web UI

Para sortear las limitaciones de conectividad, utilizamos un túnel seguro para exponer temporalmente la aplicación local a internet.

### Paso 1: Configurar Vite para Túneles
Para evitar el error "Invalid Host Header" al acceder vía túnel, debemos permitir hosts externos en la configuración de Vite.

**Archivo:** `vite.config.ts`
```typescript
server: {
  allowedHosts: true, // Permite cualquier host (incluyendo *.trycloudflare.com)
  host: true,         // Expone el servidor a la red local/docker
},
```

### Paso 2: Exponer la Aplicación
Con la aplicación corriendo (`npm run dev`), abrimos un túnel:
```bash
cloudflared tunnel --url http://localhost:5173
```
*Esto generará una URL pública temporal, ej: `https://random-name.trycloudflare.com`.*

### Paso 3: Auditoría en Stitch Web
1.  Acceder a **[stitch.withgoogle.com](https://stitch.withgoogle.com/)**.
2.  Crear un nuevo proyecto.
3.  En el chat o input, proporcionar la **URL pública del túnel**.
4.  **Prompt de Auditoría:** Pedir explícitamente una crítica o rediseño.
    > *"Audita esta UI enfocándote en la jerarquía visual y el espaciado. Propón una versión más moderna."*

### Paso 4: Generación de Referencias (Desktop & Mobile)
Una vez Stitch genera el primer rediseño:
1.  **Seleccionar** la mejor variante propuesta.
2.  Solicitar la versión móvil: *"Genera la versión móvil de este diseño"*.
3.  **Resultado:** Tendrás en el canvas de Stitch:
    -   El diseño Desktop de referencia.
    -   El diseño Mobile de referencia.

## 3. Resultado Obtenido (Ejemplo Real)
**Proyecto:** "Glassmorphism Course Player Variant"
**Referencias Generadas:**
-   **Desktop:** Diseño con sidebar oscura y tarjetas con efecto *glassmorphism*.
-   **Mobile:** Adaptación vertical (`630x1166`) conservando la estética.

Estas referencias visuales sirven ahora como "Mockups Vivos" para la implementación en código.
