import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ContentBlock } from '../../../types/course';
import { getBlockDefinition } from '../../../components/blocks/registry';

interface PlayerBlockWrapperProps {
    block: ContentBlock;
    highlightItemId?: string | null;
    playMode?: 'auto' | 'manual';
    isActiveBlock?: boolean;
    onTTSComplete?: () => void;
    rate?: number;
    volume?: number;
}

export const PlayerBlockWrapper: React.FC<PlayerBlockWrapperProps> = ({ block: initialBlock, highlightItemId, playMode, isActiveBlock, onTTSComplete, rate, volume }) => {
    // We maintain a local version of the block state to allow for interactivity 
    // (e.g., changing tabs, checking boxes) without modifying the actual course source.
    const [block, setBlock] = useState<ContentBlock>(initialBlock);

    // Get the component definition from the registry
    const def = getBlockDefinition(block.type);

    if (!def) {
        return <div className="p-4 text-red-500">Unknown block type: {block.type}</div>;
    }

    const handleUpdate = (updates: Partial<ContentBlock>) => {
        setBlock(prev => ({ ...prev, ...updates }));
    };

    // We pass `isSelected={false}` since we are in Player mode.
    // We pass our local `handleUpdate` so interactions (like tab switching) work visually.

    // We pass `isSelected={false}` since we are in Player mode.
    // We pass our local `handleUpdate` so interactions (like tab switching) work visually.

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8"
        >
            <def.Component
                block={block}
                isSelected={false}
                isEditable={false}
                highlightItemId={highlightItemId}
                playMode={playMode}
                isActiveBlock={isActiveBlock}
                onTTSComplete={onTTSComplete}
                onClick={() => { }} // No-op for selection
                onUpdate={handleUpdate}
                rate={rate}
                volume={volume}
            />
        </motion.div>
    );
};
