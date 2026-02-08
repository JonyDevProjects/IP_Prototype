import React from 'react';
import type { ContentBlock, ThemeColor } from '../../../types/course';
import { InlineText } from '../../ui/InlineText';
import { STEP_THEMES } from './constants';
import type { TimelineStep } from './types';
import TextToSpeechButton from '../../shared/TextToSpeechButton';
import { useTimelineTTS } from './hooks/useTimelineTTS';

import { StepDetailView } from './StepDetailView';

export const TimelineComponent: React.FC<{
    block: ContentBlock;
    isSelected: boolean;
    isEditable?: boolean;
    onClick: (e: React.MouseEvent) => void;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, isSelected, isEditable = true, onClick, onUpdate }) => {

    // Type Guard / Narrowing
    if (block.type !== 'timeline') {
        return <div className="p-4 text-red-500">Invalid Block Type</div>;
    }

    const handleStepClick = (i: number) => {
        const metadata = block.metadata;
        const isSequential = metadata?.sequential;
        const maxUnlocked = metadata?.maxUnlockedIndex ?? 0;
        const isLocked = isSequential && i > maxUnlocked;

        if (isLocked) return;

        const newMaxUnlocked = isSequential ? Math.max(block.metadata?.maxUnlockedIndex ?? 0, i + 1) : undefined;

        onUpdate({
            metadata: {
                ...block.metadata,
                activeStepIndex: i,
                ...(newMaxUnlocked !== undefined ? { maxUnlockedIndex: newMaxUnlocked } : {})
            }
        });
    };

    const activeIndex = block.metadata?.activeStepIndex ?? 0;
    const steps = block.content;
    const activeStep = steps[activeIndex];

    // Use Custom Hook for TTS Logic
    const { ttsSteps, handleTTSStepChange, getHighlightClass } = useTimelineTTS({
        block,
        onUpdate
    });

    const updateActiveStep = (field: string, val: string) => {
        if (!activeStep) return;
        const newContent = [...steps];

        if (field.includes('.')) {
            const [p, c] = field.split('.') as [string, string];
            // Simple nested update logic (safe-ish for now)
            if (p === 'cards') return;

            // We know p is keyof TimelineStep, but TS doesn't know 'c' is keyof TimelineStep[p]
            // We'll use a safer cast than 'any' -> Record<string, unknown>
            if (newContent[activeIndex]) {
                const parent = newContent[activeIndex][p as keyof TimelineStep];
                if (typeof parent === 'object' && parent !== null) {
                    (parent as unknown as Record<string, unknown>)[c] = val;
                }
            }
        } else {
            (newContent[activeIndex] as unknown as Record<string, unknown>)[field] = val;
        }
        onUpdate({ content: newContent });
    };

    return (
        <div
            className={`relative group rounded-xl transition-all duration-200 ${isSelected ? 'ring-2 ring-[#7f13ec] ring-offset-4 ring-offset-slate-50 dark:ring-offset-[#150a1f]' : ''}`}
            onClick={onClick}
        >
            <div className="space-y-8">
                {/* Header with TTS */}
                <div className="flex justify-between items-center px-2">
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Linea de Tiempo</div>
                    <TextToSpeechButton
                        steps={ttsSteps}
                        onStepChange={handleTTSStepChange}
                        className="scale-90 origin-right"
                    />
                </div>

                {/* Top Row: Navigation Steps */}
                <div className="flex flex-wrap gap-4 justify-center">
                    {steps.map((step: TimelineStep, i: number) => {
                        let themeKey: ThemeColor = step.theme || 'slate';

                        const metadata = block.metadata;
                        const isSequential = metadata?.sequential;
                        const maxUnlocked = metadata?.maxUnlockedIndex ?? 0;
                        const isLocked = isSequential && i > maxUnlocked;

                        const theme = STEP_THEMES[themeKey];
                        const isActive = activeIndex === i;

                        // Visual hierarchy based on reference
                        const containerClass = isActive
                            ? `${theme.bg} ${theme.border} ring-1 ring-offset-0` // Highlighted
                            : `bg-white border-slate-100 hover:border-slate-200`; // Default

                        const iconClass = isActive
                            ? `${theme.iconBg}`
                            : `text-slate-400 bg-slate-50`;

                        const textClass = isActive ? `${theme.text} font-bold` : `text-slate-600 font-medium`;

                        if (isLocked) {
                            return (
                                <div key={i} className="flex-1 min-w-[200px] p-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed flex flex-col items-center gap-3 text-center">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                                        <span className="material-symbols-outlined">lock</span>
                                    </div>
                                    <span className="text-sm font-medium text-slate-400">Locked</span>
                                </div>
                            )
                        }

                        return (
                            <div
                                key={i}
                                className={`flex-1 min-w-[200px] p-6 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-4 text-center group/card ${containerClass} ${isActive ? theme.border.replace('border-', 'ring-') : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleStepClick(i);
                                }}
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${iconClass}`}>
                                    <span className="material-symbols-outlined text-3xl">{step.icon || 'circle'}</span>
                                </div>
                                <InlineText
                                    tagName="span"
                                    className={`text-sm ${textClass}`}
                                    value={step.title}
                                    disabled={!isEditable}
                                    onChange={(val) => {
                                        const newContent = [...steps];
                                        newContent[i] = { ...newContent[i], title: val };
                                        onUpdate({ content: newContent });
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Active Step Detail View */}
                {activeStep && (
                    <StepDetailView
                        step={activeStep}
                        stepNumber={activeIndex + 1}
                        showNumber={true}
                        isEditable={isEditable}
                        onUpdate={updateActiveStep}
                        getHighlightClass={getHighlightClass}
                    />
                )}
            </div>
        </div>
    );
};
