import { BlockDefinition } from './types';
import { TimelineBlockDefinition } from './TimelineBlock';
import { TextBlockDefinition } from './TextBlock';
import { ImageBlockDefinition } from './ImageBlock';
import { AlertBlockDefinition } from './AlertBlock';

// Registry Map
const BLOCK_REGISTRY: Record<string, BlockDefinition> = {
    [TimelineBlockDefinition.type]: TimelineBlockDefinition,
    [TextBlockDefinition.type]: TextBlockDefinition,
    [ImageBlockDefinition.type]: ImageBlockDefinition,
    [AlertBlockDefinition.type]: AlertBlockDefinition,
};

// Helpers
export const getBlockDefinition = (type: string): BlockDefinition | undefined => {
    return BLOCK_REGISTRY[type];
};

export const getAllBlockDefinitions = (): BlockDefinition[] => {
    return Object.values(BLOCK_REGISTRY);
};
