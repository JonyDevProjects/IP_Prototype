import React from 'react';
import type { ContentBlock } from '../../../types/course';
import { InlineText } from '../../ui/InlineText';
import { STEP_THEMES, type ThemeColor } from './constants';
import type { TimelineStep } from './types';
import TextToSpeechButton from '../../shared/TextToSpeechButton';
import { useTimelineTTS } from './hooks/useTimelineTTS';

export const TimelineComponent: React.FC<{
    block: ContentBlock;
    isSelected: boolean;
    isEditable?: boolean;
    onClick: (e: React.MouseEvent) => void;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, isSelected, isEditable = true, onClick, onUpdate }) => {

    const handleStepClick = (i: number) => {
        const metadata = block.metadata as any;
        const isSequential = metadata?.sequential;
        const maxUnlocked = metadata?.maxUnlockedIndex ?? 0;
        const isLocked = isSequential && i > maxUnlocked;

        if (isLocked) return;

        const newMaxUnlocked = isSequential ? Math.max((block.metadata as any)?.maxUnlockedIndex ?? 0, i + 1) : undefined;

        onUpdate({
            metadata: {
                ...block.metadata,
                activeStepIndex: i,
                ...(newMaxUnlocked !== undefined ? { maxUnlockedIndex: newMaxUnlocked } : {})
            }
        });
    };

    const activeIndex = (block.metadata as any)?.activeStepIndex ?? 0;
    const steps = (block.content as unknown as TimelineStep[]);
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
            const [p, c] = field.split('.') as [keyof TimelineStep, keyof TimelineStep];
            // Note: Simplification for demo, strict typing nested dynamic keys is complex in TS
            if (p === 'cards') return; // handle cards separately
            (newContent[activeIndex] as any)[p][c] = val;
        } else {
            (newContent[activeIndex] as any)[field] = val;
        }
        onUpdate({ content: newContent as any });
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

                        const metadata = block.metadata as any;
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
                {activeStep && (() => {
                    const themeKey: ThemeColor = activeStep.theme || 'amber'; // Default to amber to match reference
                    const theme = STEP_THEMES[themeKey];
                    const stepNumber = (activeIndex + 1).toString().padStart(2, '0');
                    const currentStepId = `step-${activeIndex}`;

                    return (
                        <div className={`p-8 rounded-3xl border ${theme.detail.border} ${theme.bg} relative overflow-hidden transition-all duration-500`}>
                            {/* Watermark Number */}
                            <div className={`absolute top-2 right-6 text-[120px] font-bold select-none pointer-events-none leading-none ${theme.text} opacity-5`}>
                                {stepNumber}
                            </div>

                            <div className="relative z-10">
                                {/* Header */}
                                <div className="flex items-start gap-5 mb-10">
                                    <div className={`w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center ${theme.iconBg}`}>
                                        <span className="material-symbols-outlined text-5xl">{activeStep.detailIcon || 'lightbulb'}</span>
                                    </div>
                                    <div className="pt-2 flex-1">
                                        <div className={`flex items-center gap-3 mb-1 p-2 rounded-lg ${getHighlightClass(`${currentStepId}-title`)}`}>
                                            <span className="text-3xl font-bold text-slate-800">{activeIndex + 1}.</span>
                                            <InlineText
                                                tagName="h3"
                                                className={`text-3xl font-bold ${theme.text}`}
                                                value={activeStep.detailTitle || activeStep.title}
                                                disabled={!isEditable}
                                                onChange={(val) => updateActiveStep('detailTitle', val)}
                                            />
                                        </div>
                                        <div className={`p-2 rounded-lg ${getHighlightClass(`${currentStepId}-subtitle`)}`}>
                                            <InlineText
                                                tagName="p"
                                                className="text-lg text-slate-700"
                                                value={activeStep.detailSubtitle || ''}
                                                disabled={!isEditable}
                                                onChange={(val) => updateActiveStep('detailSubtitle', val)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Cards Grid */}
                                <div className="space-y-4 mb-10">
                                    {((activeStep.cards) || []).map((card: any, idx: number) => {
                                        return (
                                            <div
                                                key={idx}
                                                className={`bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow ${getHighlightClass(`${currentStepId}-card-${idx}`)}`}
                                            >
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className={`material-symbols-outlined ${theme.detail.iconColor.replace('text-', 'text-')}`}>{card.icon || 'check_circle'}</span>
                                                    <InlineText
                                                        tagName="span"
                                                        className={`font-bold uppercase text-xs tracking-wider ${theme.text}`}
                                                        value={card.title}
                                                        disabled={!isEditable}
                                                        onChange={v => updateActiveStep(`cards.${idx}.title`, v)}
                                                    />
                                                </div>
                                                <InlineText
                                                    tagName="p"
                                                    className="text-slate-600 text-sm leading-relaxed"
                                                    value={card.text}
                                                    disabled={!isEditable}
                                                    onChange={v => updateActiveStep(`cards.${idx}.text`, v)}
                                                    multiline
                                                />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Footer Tip (Pill Shape) */}
                                {activeStep.footerTip && (
                                    <div className={`relative ${getHighlightClass(`${currentStepId}-footer`)}`}>
                                        <div className="absolute inset-0 bg-white rounded-full border border-slate-200 -z-10 shadow-sm" />
                                        <div className="flex items-start md:items-center gap-4 p-4 pl-6">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 bg-slate-50 mt-0.5 md:mt-0">
                                                <span className="material-symbols-outlined text-[16px]">question_mark</span>
                                            </div>
                                            <div className="flex-1 text-sm text-slate-700 leading-relaxed">
                                                <InlineText
                                                    tagName="span"
                                                    className="inline"
                                                    value={activeStep.footerTip}
                                                    disabled={!isEditable}
                                                    onChange={v => updateActiveStep('footerTip', v)}
                                                    multiline
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};
