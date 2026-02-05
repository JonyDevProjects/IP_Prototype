
import React from 'react';
import { InlineText } from '../../ui/InlineText';
import { STEP_THEMES, type ThemeColor } from './constants';
import type { TimelineStep } from './types';

interface StepDetailViewProps {
    step: TimelineStep;
    stepNumber: number;
    showNumber?: boolean;
    isEditable?: boolean;
    onUpdate: (field: string, val: string) => void;
    getHighlightClass?: (id: string) => string;
}

export const StepDetailView: React.FC<StepDetailViewProps> = ({
    step,
    stepNumber,
    showNumber = true,
    isEditable = true,
    onUpdate,
    getHighlightClass = () => ''
}) => {
    const themeKey: ThemeColor = step.theme || 'amber';
    const theme = STEP_THEMES[themeKey];
    const stepNumberStr = stepNumber.toString().padStart(2, '0');
    // Use a simpler ID generation strategy if one isn't passed, or rely on the parent to manage IDs context if needed.
    // For TTS highlighting, we usually need a stable ID. 
    // We'll trust the parent uses consistent indexing or IDs.
    // In this extracted view, we'll assume the highlight IDs are constructed as "step-{index}-..." 
    // but here we just need a prefix. Let's assume the passed `getHighlightClass` handles the full ID resolution or we reconstruct it.
    // Actually, in TimelineView it was: `const currentStepId = \`step-${activeIndex}\`;` and passed to `getHighlightClass`.
    // We should probably pass the `currentStepId` prefix or similar.
    // For now, let's keep it simple: The caller passes a `getHighlightClass` that expects suffixes like "-title", "-subtitle", etc.
    // BUT `getHighlightClass` in `useTimelineTTS` expects the FULL ID (e.g. "step-0-title").
    // So we need to know the "step ID" or prefix.

    // Actually, let's just use the `stepNumber` prop which is 1-based (activeIndex + 1).
    // so activeIndex = stepNumber - 1.
    const activeIndex = stepNumber - 1;
    const currentStepId = `step-${activeIndex}`;

    return (
        <div className={`p-8 rounded-3xl border ${theme.detail.border} ${theme.bg} relative overflow-hidden transition-all duration-500`}>
            {/* Watermark Number */}
            {showNumber && (
                <div className={`absolute top-2 right-6 text-[120px] font-bold select-none pointer-events-none leading-none ${theme.text} opacity-5`}>
                    {stepNumberStr}
                </div>
            )}

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start gap-5 mb-10">
                    <div className={`w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center ${theme.iconBg}`}>
                        <span className="material-symbols-outlined text-5xl">{step.detailIcon || 'lightbulb'}</span>
                    </div>
                    <div className="pt-2 flex-1">
                        <div className={`flex items-center gap-3 mb-1 p-2 rounded-lg ${getHighlightClass(`${currentStepId}-title`)}`}>
                            {showNumber && <span className="text-3xl font-bold text-slate-800">{stepNumber}.</span>}
                            <InlineText
                                tagName="h3"
                                className={`text-3xl font-bold ${theme.text}`}
                                value={step.detailTitle || step.title}
                                disabled={!isEditable}
                                onChange={(val) => onUpdate('detailTitle', val)}
                            />
                        </div>
                        <div className={`p-2 rounded-lg ${getHighlightClass(`${currentStepId}-subtitle`)}`}>
                            <InlineText
                                tagName="p"
                                className="text-lg text-slate-700"
                                value={step.detailSubtitle || ''}
                                disabled={!isEditable}
                                onChange={(val) => onUpdate('detailSubtitle', val)}
                            />
                        </div>
                    </div>
                </div>

                {/* Content Cards Grid */}
                <div className="space-y-4 mb-10">
                    {((step.cards) || []).map((card: any, idx: number) => {
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
                                        onChange={v => onUpdate(`cards.${idx}.title`, v)}
                                    />
                                </div>
                                <InlineText
                                    tagName="p"
                                    className="text-slate-600 text-sm leading-relaxed"
                                    value={card.text}
                                    disabled={!isEditable}
                                    onChange={v => onUpdate(`cards.${idx}.text`, v)}
                                    multiline
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Footer Tip (Pill Shape) */}
                {step.footerTip && (
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
                                    value={step.footerTip}
                                    disabled={!isEditable}
                                    onChange={v => onUpdate('footerTip', v)}
                                    multiline
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
