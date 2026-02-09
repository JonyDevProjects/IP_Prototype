import React, { useEffect } from 'react';
import type { ContentBlock } from '../../../types/course';
import { TimelineLayout } from './TimelineLayout';

export const TimelineComponent: React.FC<{
    block: ContentBlock;
    isSelected: boolean;
    isEditable?: boolean;
    onClick: (e: React.MouseEvent) => void;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, onUpdate, isEditable = true }) => {

    // Type Guard / Narrowing
    if (block.type !== 'timeline') {
        return <div className="p-4 text-red-500">Invalid Block Type</div>;
    }

    const [activeStepIndex, setActiveStepIndex] = React.useState(0);

    // Reset local state when block changes or on initial mount if needed, 
    // though for this specific issue we want it to reset on mount (view change).
    // If we wanted to persist within the same editing session we could initialize from metadata.
    // For now, ensuring it starts at 0 or a sensible default is key.

    // Optional: Sync with metadata if we want the *initial* state to be configurable, 
    // but updates should be local to avoid the "persisting across views" annoyance.
    useEffect(() => { setActiveStepIndex(block.metadata?.activeStepIndex || 0); }, [block.id]);

    return (
        <TimelineLayout
            data={block.content}
            onUpdate={onUpdate}
            isEditable={isEditable}
            activeStepIndex={activeStepIndex}
            onStepClick={(index) => {
                setActiveStepIndex(index);
                // Optionally still save to metadata if we want to "remember" it for *this* session? 
                // But the user specifically asked for it NOT to persist in a confusing way. 
                // Local state is the safest bet for "session" view behavior.
            }}
        />
    );
};
