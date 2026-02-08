
import React from 'react';
import type { ContentBlock } from '../../../types/course';
import { StepProperties } from '../timeline/StepProperties';
import type { TimelineStep } from '../timeline/types';

export const StepBlockProperties: React.FC<{
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, onUpdate }) => {
    // The block content is directly a TimelineStep object (plus extra props maybe)
    // treating it as unknown -> TimelineStep for type safety
    const step = block.content as unknown as TimelineStep;

    const handleChange = (field: string, value: unknown) => {
        const newStep = { ...step };

        if (field.includes('.')) {
            const parts = field.split('.');
            if (parts.length === 3 && parts[0] === 'cards') {
                // cards.0.title
                const [_, indexStr, child] = parts;
                const index = parseInt(indexStr, 10);
                const cards = [...(newStep.cards || [])];

                if (cards[index]) {
                    cards[index] = {
                        ...cards[index],
                        [child]: value
                    };
                    newStep.cards = cards;
                }
            } else {
                // warning: simple path handling only for now
                // In TimelineProperties we had specialized handling
                // Here we reuse that logic or adapt it.
                // StepProperties expects `onChange` to handle everything.

                // If StepProperties calls onChange('detailTitle', 'val') -> field='detailTitle'
            }
        } else {
            // direct property
            // We trust the field name matches a key in TimelineStep because it comes from StepProperties
            (newStep as Record<string, unknown>)[field] = value;
        }

        onUpdate({ content: newStep });
    };

    return (
        <StepProperties
            step={step}
            index={0} // Only 1 step effectively
            onChange={handleChange}
        />
    );
};
