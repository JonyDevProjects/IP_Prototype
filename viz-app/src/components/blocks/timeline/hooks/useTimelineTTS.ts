import { useMemo, useState } from 'react';
import type { ContentBlock } from '../../../../types/course';


interface UseTimelineTTSProps {
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}

export const useTimelineTTS = ({ block, onUpdate }: UseTimelineTTSProps) => {
    const [activeReadingId, setActiveReadingId] = useState<string | null>(null);

    // Default empty if wrong type, though View should handle it
    const activeIndex = block.type === 'timeline' ? (block.metadata?.activeStepIndex ?? 0) : 0;

    const steps = useMemo(() => {
        return block.type === 'timeline' ? block.content : [];
    }, [block]);

    // Generate TTS Steps
    const ttsSteps = useMemo(() => {
        return steps.flatMap((step, i) => {
            const stepPrefix = `step-${i}`;
            const stepItems = [];

            // Title & Subtitle logic
            const titleText = step.detailTitle || step.title;
            if (titleText) {
                stepItems.push({
                    id: `${stepPrefix}-title`,
                    text: titleText
                });
            }

            if (step.detailSubtitle) {
                stepItems.push({
                    id: `${stepPrefix}-subtitle`,
                    text: step.detailSubtitle
                });
            }

            // Cards
            (step.cards || []).forEach((card, cardIndex) => {
                if (card.title || card.text) {
                    stepItems.push({
                        id: `${stepPrefix}-card-${cardIndex}`,
                        text: `${card.title}. ${card.text}`
                    });
                }
            });

            // Footer
            if (step.footerTip && step.footerTip.trim().length > 0) {
                stepItems.push({
                    id: `${stepPrefix}-footer`,
                    text: `Nota: ${step.footerTip}`
                });
            }

            return stepItems;
        });
    }, [steps]);

    // TTS Handler
    const handleTTSStepChange = (stepId: string | null) => {
        setActiveReadingId(stepId);

        if (stepId) {
            // Parse step index from ID "step-{i}-..."
            const match = stepId.match(/step-(\d+)/);
            if (match) {
                const stepIndex = parseInt(match[1], 10);
                // Switch to the step being read if different
                if (stepIndex !== activeIndex) {
                    onUpdate({
                        metadata: {
                            ...block.metadata,
                            activeStepIndex: stepIndex
                        }
                    });
                }
            }
        }
    };

    const getHighlightClass = (targetId: string) => {
        if (!activeReadingId) return "";
        return activeReadingId === targetId
            ? "ring-2 ring-indigo-400 scale-[1.01] shadow-lg z-20 bg-white dark:bg-black/20 relative transition-all duration-300"
            : "opacity-30 blur-[1px] grayscale transition-all duration-300";
    };

    return {
        ttsSteps,
        activeReadingId,
        handleTTSStepChange,
        getHighlightClass
    };
};
