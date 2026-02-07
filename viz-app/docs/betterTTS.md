# betterTTS: Sincronización Texto-Voz (Karaoke Style)

## Objetivo
Implementar una experiencia de lectura inmersiva tipo "ElevenReader", donde cada palabra se resalta visualmente en tiempo real mientras es pronunciada por el motor TTS nativo.

## Análisis Técnico Actual
Actualmente, nuestro sistema (`useUnitAudio`, `useStepTTS`, `useTextSequence`):
1.  **Nivel de Granularidad**: Bloque/Item. Sabemos qué *bloque* se está leyendo, pero no qué *palabra*.
2.  **Infraestructura Existente**:
    *   `useStepTTS.tsx` ya escucha el evento `onboundary` para la funcionalidad de "Resume-on-Change", guardando el `charIndex`.
    *   `useTextSequence.tsx` no utiliza `onboundary`.

## Estrategia de Implementación

### 1. El Motor: `SpeechSynthesisUtterance.onboundary`
La API Web Speech nativa dispara eventos cuando alcanza límites de palabras o frases.
```typescript
utterance.onboundary = (event) => {
    if (event.name === 'word') {
        const charIndex = event.charIndex;
        const charLength = event.charLength; // Nota: No siempre preciso en todos los navegadores
        // Actualizar estado global/contexto
    }
};
```

### 2. El Desafío del Estado (Performance)
Actualizar el estado de React 3-5 veces por segundo (velocidad de lectura) puede causar re-renders costosos si no se optimiza.
*   **Solución Propuesta**: Usar un store ligero (Zustand) o `refs` directos para evitar re-renderizar todo el árbol de componentes, solo el componente de texto activo.

### 3. Mapeo DOM (Highlighter)
Para resaltar una palabra específica, el texto plano debe ser "tokenizado".
*   **Enfoque A (Spans Estáticos)**: Pre-procesar el texto envolviendo cada palabra en un `<span>` con ID único.
    *   *Pros*: Fácil de estilizar con CSS clases.
    *   *Contras*: Ensucia el DOM.
*   **Enfoque B (Overlay Dinámico)**: Renderizar el texto normal y superponer un "mask" o clonar el texto en una capa oculta para calcular coordenadas.
*   **Recomendación**: **Enfoque A (Spans)** por robustez y accesibilidad.

## Plan de Acción (Roadmap)

### Fase 1: Core Logic Hook (`useWordSync`)
Crear un hook que exponga `currentWordIndex` y `currentWordRange`.
```typescript
const { currentRange } = useWordSync({ 
    text: "Hola mundo", 
    isPlaying: true 
}); 
// currentRange -> { start: 0, end: 4 } ("Hola")
```

### Fase 2: Componente `SmartText`
Reemplazar los renderizados de texto plano (`<p>{text}</p>`) con un componente inteligente.
```tsx
<SmartText content={step.text} highlightRange={currentRange} />
```
Este componente dividiría el string en palabras y aplicaría la clase `bg-yellow-200` (o estilo ElevenLabs) a la palabra que coincida con el rango actual.

### Fase 3: Integración en Player
1.  Actualizar `useTextSequence` para emitir eventos `onWordBoundary`.
2.  Conectar `PlayerBlockWrapper` para recibir estos eventos y pasarlos al componente visual.

## Limitaciones Conocidas
*   **Precisión**: El evento `onboundary` depende del motor del navegador. Chrome/Edge es muy preciso. Firefox/Safari a veces agrupan palabras pequeñas.
*   **Latencia**: Puede haber un ligero desajuste (ms) entre el audio y el visual, ajustable con un `offset` configurado manualmente si es necesario.

## Conclusión
Es totalmente viable lograr el efecto "ElevenReader" con nuestra arquitectura actual sin librerías externas pesadas. La clave es la tokenización del texto y la gestión eficiente de eventos `onboundary`.
