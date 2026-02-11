import React, { useEffect } from 'react';
import type { ContentBlock } from '../../../types/course';
import { TimelineLayout } from './TimelineLayout';
import { useTimelineTTS } from './hooks/useTimelineTTS';
import { useTextSequence } from '../../../features/player/hooks/useTextSequence';

export const TimelineComponent: React.FC<{
    block: ContentBlock;
    isSelected: boolean;
    isEditable?: boolean;
    highlightItemId?: string | null;
    playMode?: 'auto' | 'manual';
    isActiveBlock?: boolean;
    onTTSComplete?: () => void;
    onClick: (e: React.MouseEvent) => void;
    onUpdate: (updates: Partial<ContentBlock>) => void;
    rate?: number;
    volume?: number;
}> = ({ block, onUpdate, isEditable = true, highlightItemId, playMode, isActiveBlock, onTTSComplete, rate, volume }) => {

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

    // TTS Integration
    const { ttsSteps, activeReadingId, handleTTSStepChange } = useTimelineTTS({
        block,
        onUpdate
    });

    // Auto-play TTS sequencing (similar to PlayerMain.tsx pattern)
    const { activeItemId: activeTTSItemId } = useTextSequence({
        items: ttsSteps,
        autoPlay: playMode === 'auto' && isActiveBlock === true,
        onComplete: onTTSComplete,
        rate,
        volume
    });

    // Sync TTS step changes with timeline
    useEffect(() => {
        handleTTSStepChange(activeTTSItemId);
    }, [activeTTSItemId, handleTTSStepChange]);

    // Auto-scroll to active item during TTS playback
    useEffect(() => {
        if (playMode === 'auto' && activeReadingId) {
            const el = document.getElementById(activeReadingId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [playMode, activeReadingId]);

    // Use global highlight if provided, otherwise local TTS (similar to StepBlockView pattern)
    const activeHighlightId = highlightItemId || activeReadingId;

    const getEffectiveHighlightClass = (targetId: string) => {
        if (!activeHighlightId) return "";
        return activeHighlightId === targetId
            ? "ring-2 ring-indigo-400 scale-[1.01] shadow-lg z-20 bg-white dark:bg-black/20 relative transition-all duration-300"
            : "opacity-30 blur-[1px] grayscale transition-all duration-300";
    };

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
            getHighlightClass={getEffectiveHighlightClass}
            stepIdPrefix="step"
        />
    );
};
