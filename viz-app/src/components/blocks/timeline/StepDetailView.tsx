
import React from 'react';
import { InlineText } from '../../ui/InlineText';
import { STEP_THEMES } from './constants';
import type { TimelineStep, TimelineCard } from './types';
import type { ThemeColor } from '../../../types/course';

interface StepDetailViewProps {
    step: TimelineStep;
    stepNumber: number;
    stepId?: string; // New prop for unique DOM IDs
    showNumber?: boolean;
    isEditable?: boolean;
    onUpdate: (field: string, val: string) => void;
    getHighlightClass?: (id: string) => string;
}

export const StepDetailView: React.FC<StepDetailViewProps> = ({
    step,
    stepNumber,
    stepId,
    showNumber = true,
    isEditable = true,
    onUpdate,
    getHighlightClass = () => ''
}) => {
    const themeKey: ThemeColor = step.theme || 'amber';
    const theme = STEP_THEMES[themeKey];
    const stepNumberStr = stepNumber.toString().padStart(2, '0');

    // Use provided stepId or fallback to index-based for backward compatibility
    const activeIndex = stepNumber - 1;
    const currentStepId = stepId || `step-${activeIndex}`;

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
                        <div
                            id={`${currentStepId}-title`}
                            className={`flex items-center gap-3 mb-1 p-2 rounded-lg ${getHighlightClass(`${currentStepId}-title`)}`}
                        >
                            {showNumber && <span className="text-3xl font-bold text-slate-800">{stepNumber}.</span>}
                            <InlineText
                                tagName="h3"
                                className={`text-3xl font-bold ${theme.text}`}
                                value={step.detailTitle || step.title}
                                disabled={!isEditable}
                                onChange={(val) => onUpdate('detailTitle', val)}
                            />
                        </div>
                        <div
                            id={`${currentStepId}-subtitle`}
                            className={`p-2 rounded-lg ${getHighlightClass(`${currentStepId}-subtitle`)}`}
                        >
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
                    {((step.cards) || []).map((card: TimelineCard, idx: number) => {
                        return (
                            <div
                                key={idx}
                                id={`${currentStepId}-card-${idx}`}
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
                    <div
                        id={`${currentStepId}-footer`}
                        className={`relative ${getHighlightClass(`${currentStepId}-footer`)}`}
                    >
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
