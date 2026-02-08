
import React from 'react';
import type { ContentBlock } from '../../../types/course';
import { StepDetailView } from '../timeline/StepDetailView';
import TextToSpeechButton from '../../shared/TextToSpeechButton';
import { useStepTTS } from './hooks/useStepTTS';

export const StepBlockView: React.FC<{
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
}> = ({ block, highlightItemId, playMode, isActiveBlock, onTTSComplete, isEditable = true, onClick, onUpdate, rate, volume }) => {

    if (block.type !== 'step') return null;
    const step = block.content;

    const { ttsSteps, activeReadingId, handleTTSStepChange } = useStepTTS({
        step,
        stepId: block.id,
        autoPlay: playMode === 'auto',
        isActive: isActiveBlock, // Use the specific block active state, not just autoPlay
        onComplete: onTTSComplete,
        rate,
        volume
    });

    // Auto-scroll to active item
    React.useEffect(() => {
        if (playMode === 'auto' && activeReadingId) {
            const el = document.getElementById(activeReadingId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [playMode, activeReadingId]);

    // Use global highlight if provided, otherwise local TTS
    const activeHighlightId = highlightItemId || activeReadingId;

    const getEffectiveHighlightClass = (targetId: string) => {
        if (!activeHighlightId) return "";
        return activeHighlightId === targetId
            ? "ring-2 ring-indigo-400 scale-[1.01] shadow-lg z-20 bg-white dark:bg-black/20 relative transition-all duration-300"
            : "opacity-30 blur-[1px] grayscale transition-all duration-300";
    };

    const handleUpdate = (field: string, val: string) => {
        const newStep = { ...step };

        // Similar logic to properties, but usually updates come from InlineText which sends flat updates usually?
        // Actually InlineText sends what onChange expects.
        // In StepDetailView, it calls `onUpdate('detailTitle', val)` or `onUpdate('cards.0.title', val)`.

        if (field.includes('.')) {
            const parts = field.split('.');
            if (parts.length === 3 && parts[0] === 'cards') {
                // cards.0.title
                const [_, indexStr, child] = parts;
                const index = parseInt(indexStr, 10);
                const cards = [...(newStep.cards || [])];
                const card = cards[index];
                if (card) {
                    cards[index] = { ...card, [child]: val } as any; // TimelineCard doesn't have index signature, simpler to use any here for the spread
                }
                newStep.cards = cards;
            }
        } else {
            (newStep as unknown as Record<string, unknown>)[field] = val;
        }

        onUpdate({ content: newStep });
    };

    return (
        <div
            className="relative group transition-all duration-200"
            onClick={onClick}
        >
            {/* Header with TTS DO NOT REMOVE -> This is new */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
                <TextToSpeechButton
                    steps={ttsSteps}
                    onStepChange={handleTTSStepChange}
                    className="shadow-sm"
                />
            </div>

            <StepDetailView
                step={step}
                stepNumber={1}
                stepId={block.id}
                showNumber={false}
                isEditable={isEditable}
                onUpdate={handleUpdate}
                getHighlightClass={getEffectiveHighlightClass}
            />
        </div>
    );
};
