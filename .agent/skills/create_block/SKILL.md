---
name: Create New Editor Block
description: Instructions for adding a new content block type (e.g., Video, Quiz) to the Editor using the Registry Architecture.
---

# Create New Editor Block

This skill guides you through adding a new block type to the Editor. The editor uses a **Plugin/Registry Architecture**. You should NEVER modify `EditorLayout.tsx` to add a block.
**Architecture Rule**: Always adhere to `.agent/rules/architecture.md`. If a block's properties panel becomes too complex, consider moving its UI sub-components to `src/features/editor/components/`.
## Steps

### 1. Create Block Module
Create a new file: `src/components/blocks/[BlockName]Block.tsx`.
It must export a `BlockDefinition`.

```typescript
import { BlockDefinition } from './types';
import { PropertySection } from '../ui/PropertySection';

const [BlockName]Component = ({ block, isSelected, onClick, onUpdate }) => {
    // Render your block here
    return <div onClick={onClick}>...</div>;
};

const [BlockName]Properties = ({ block, onUpdate }) => {
    // Render properties panel here
    return (
        <PropertySection title="Settings" isOpen>
            <input value={block.content} onChange={...} />
        </PropertySection>
    );
};

export const [BlockName]BlockDefinition: BlockDefinition = {
    type: '[type_id]', // e.g., 'video'
    label: '[Label]',  // e.g., 'Video Player'
    icon: '[material_icon_name]',
    createBlock: (id) => ({
        id,
        type: '[type_id]',
        content: {} // Default content
    }),
    Component: [BlockName]Component,
    Properties: [BlockName]Properties
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
