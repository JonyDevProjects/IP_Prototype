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
}> = ({ block, onUpdate, isEditable = true, highlightItemId, playMode, isActiveBlock, onTTSComplete, rate, volume, onClick }) => {

    // Type Guard / Narrowing
    if (block.type !== 'timeline') {
        return <div className="p-4 text-red-500">Invalid Block Type</div>;
    }

    const [activeStepIndex, setActiveStepIndex] = React.useState(-1);

    // Reset local state when block changes or on initial mount if needed, 
    // though for this specific issue we want it to reset on mount (view change).
    // If we wanted to persist within the same editing session we could initialize from metadata.
    // For now, ensuring it starts at -1 (no selection) or a sensible default is key.

    // We use a ref to track if this is the first render for this block instance.
    // On the first render (mount), we want to FORCE the active step to -1 (unselected),
    // ignoring any persisted metadata. This ensures a clean slate when viewing the timeline.
    const isFirstRender = React.useRef(true);

    useEffect(() => {
        // If the block ID changes, treat it as a new "first render" for that block
        isFirstRender.current = true;
    }, [block.id]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            setActiveStepIndex(-1);
            return;
        }

        // Only on subsequent updates (e.g. from editor sidebar), sync with metadata
        if (block.metadata?.activeStepIndex !== undefined) {
            setActiveStepIndex(block.metadata.activeStepIndex);
        }
    }, [block.metadata?.activeStepIndex, block.id]);

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
            onStepClick={(index, e) => {
                setActiveStepIndex(index);
                // Sync with metadata to allow Editor Sidebar to reflect the selected step
                onUpdate({ metadata: { ...block.metadata, activeStepIndex: index } });

                // Also trigger the parent block click handler to ensure the block itself is selected
                if (e && onClick) {
                    onClick(e);
                }
            }}
            getHighlightClass={getEffectiveHighlightClass}
            stepIdPrefix="step"
        />
    );
};
