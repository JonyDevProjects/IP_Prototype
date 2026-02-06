---
name: Create New Editor Block
description: Instructions for
## Checklist de Compliance para Player (CRÍTICO)
Antes de dar por finalizado un nuevo bloque, verifica:
1.  [ ] **Props**: Acepta `playMode` ('auto'|'manual'), `rate`, `volume`, `onTTSComplete`.
2.  [ ] **TTS**: Implementa lógica para leer su contenido usando `window.speechSynthesis`.
3.  [ ] **UX**: Soporta cambio de velocidad/volumen en tiempo real (sin reiniciar desde cero).
4.  [ ] **Eventos**: Llama a `onTTSComplete()` cuando termina de leer.

## Pasos para crear un nuevo bloque
---

# Create New Editor Block

This skill guides you through adding a new block type to the Editor. The editor uses a **Plugin/Registry Architecture**. You should NEVER modify `EditorLayout.tsx` to add a block.
**Architecture Rule**: Always adhere to `.agent/rules/architecture.md`. If a block's properties panel becomes too complex, consider moving its UI sub-components to `src/features/editor/components/`.
## Steps

### 1. Create Block Module (Folder Structure)
Create a new directory: `src/components/blocks/[block_name]/`.
Inside, create the following files to ensure separation of concerns:

#### `index.ts` (Definition)
```typescript
import { BlockDefinition } from '../../registry';
import { SidebarComponent } from './Sidebar'; // or Properties
import { ViewComponent } from './View';

export const [BlockName]Definition: BlockDefinition = {
    type: '[type_id]',
    label: '[Label]',
    icon: '[material_icon_name]',
    createBlock: (id) => ({
        id,
        type: '[type_id]',
        content: {}
    }),
    Component: ViewComponent,
    Properties: SidebarComponent
};
```

#### `View.tsx` (Visuals)
```tsx
export const ViewComponent = ({ block, isSelected, onClick }) => {
    return <div onClick={onClick}>Visual Representation</div>;
};
```

#### `Properties.tsx` (Configuration)
```tsx
export const PropertiesComponent = ({ block, onUpdate }) => {
    return <input value={block.content} onChange={...} />;
};
```

### 2. Register Block
Edit `src/components/blocks/registry.ts`:
1.  Import your new definition.
2.  Add it to `BLOCK_REGISTRY`.

```typescript
import { [BlockName]BlockDefinition } from './[BlockName]Block';

const BLOCK_REGISTRY = {
    // ... existing blocks
    [[BlockName]BlockDefinition.type]: [BlockName]BlockDefinition,
};
```

### 3. Verify
-   Reload the Editor.
-   The new tool should automatically appear in the Sidebar (Toolbox).
-   Drag and drop it to test.
