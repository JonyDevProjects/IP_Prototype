import React from 'react';
import type { ContentBlock, ContentBlockType } from '../../types/course';

export interface BlockDefinition {
    type: ContentBlockType;
    label: string;
    icon: string;
    /** Returns the default data for a new block */
    createBlock: (id: string) => ContentBlock;
    /** Component to render the block on the canvas */
    Component: React.FC<{
        block: ContentBlock;
        isSelected: boolean;
        isEditable?: boolean;
        highlightItemId?: string | null;
        playMode?: 'auto' | 'manual';
        isActiveBlock?: boolean; // New prop to track if block is the current active one in Player
        onTTSComplete?: () => void;
        onClick: (e: React.MouseEvent) => void;
        onUpdate: (updates: Partial<ContentBlock>) => void;
        rate?: number;
        volume?: number;
    }>;
    /** Component to render the properties panel */
    Properties: React.FC<{
        block: ContentBlock;
        onUpdate: (updates: Partial<ContentBlock>) => void;
    }>;
}
