
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
    onInteraction?: () => void;
}

export const StepDetailView: React.FC<StepDetailViewProps> = ({
    step,
    stepNumber,
    stepId,
    isEditable = true,
    onUpdate,
    getHighlightClass = () => '',
    onInteraction
}) => {
    const themeKey: ThemeColor = step.theme || 'amber';
    const theme = STEP_THEMES[themeKey];

    // Use provided stepId or fallback to index-based for backward compatibility
    const activeIndex = stepNumber - 1;
    const currentStepId = stepId || `step-${activeIndex}`;

    return (
        <div className="mb-10 relative">
            {/* Header - Minimalist */}
            <div className="mb-8">
                <div
                    id={`${currentStepId}-title`}
                    className={`flex items-center gap-3 mb-2 ${getHighlightClass(`${currentStepId}-title`)}`}
                >
                    {step.icon && (
                        <span className={`material-symbols-outlined text-3xl md:text-4xl ${theme.text} opacity-90`}>
                            {step.icon}
                        </span>
                    )}
                    <InlineText
                        tagName="h3"
                        className={`text-2xl md:text-4xl font-bold ${theme.text} leading-tight`}
                        value={step.detailTitle || step.title}
                        disabled={!isEditable}
                        onChange={(val) => onUpdate('detailTitle', val)}
                        onStartEdit={onInteraction}
                        placeholder="Step Title"
                    />
                </div>
                <div
                    id={`${currentStepId}-subtitle`}
                    className={` ${getHighlightClass(`${currentStepId}-subtitle`)}`}
                >
                    <InlineText
                        tagName="p"
                        className="text-lg md:text-xl text-neutral-500 dark:text-neutral-500 font-medium"
                        value={step.detailSubtitle || ''}
                        disabled={!isEditable}
                        onChange={(val) => onUpdate('detailSubtitle', val)}
                        onStartEdit={onInteraction}
                        placeholder="Step Subtitle"
                    />
                </div>
            </div>

            {/* Content Points (formerly Cards) - Clean List */}
            <div className="space-y-6 mb-8">
                {((step.cards) || []).map((card: TimelineCard, idx: number) => {
                    return (
                        <div
                            key={idx}
                            id={`${currentStepId}-card-${idx}`}
                            className={`flex gap-4 items-start text-neutral-700 dark:text-neutral-300 ${getHighlightClass(`${currentStepId}-card-${idx}`)} transition-all duration-300`}
                        >
                            {card.icon && (
                                <span className={`material-symbols-outlined text-xl mt-0.5 shrink-0 ${theme.detail.iconColor.replace('text-', 'text-')} opacity-80`}>
                                    {card.icon}
                                </span>
                            )}
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:gap-2 sm:items-baseline">
                                    <InlineText
                                        tagName="span"
                                        className="font-bold text-lg md:text-xl text-neutral-900 dark:text-neutral-100"
                                        value={card.title}
                                        disabled={!isEditable}
                                        onChange={v => onUpdate(`cards.${idx}.title`, v)}
                                        placeholder="Card Title"
                                    />
                                </div>
                                <InlineText
                                    tagName="p"
                                    className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed mt-2"
                                    value={card.text}
                                    disabled={!isEditable}
                                    onChange={v => onUpdate(`cards.${idx}.text`, v)}
                                    multiline
                                    placeholder="Card Description"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Images Grid */}
            {step.images && step.images.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                    {step.images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`Step detail ${i + 1}`}
                            className="rounded-lg object-cover h-32 md:h-48 w-full shadow-sm hover:shadow-md transition-shadow duration-200 border border-neutral-200 dark:border-neutral-800"
                        />
                    ))}
                </div>
            )}

            {/* Footer Tip */}
            {step.footerTip && (
                <div
                    id={`${currentStepId}-footer`}
                    className={`mt-8 p-4 bg-slate-50 dark:bg-white/5 rounded-r-lg flex gap-3 items-start ${getHighlightClass(`${currentStepId}-footer`)} transition-all duration-300`}
                >
                    <span className="material-symbols-outlined text-slate-400 shrink-0 mt-0.5">
                        {step.footerTipIcon || 'lightbulb'}
                    </span>
                    <div className="flex-1">
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Nota</span>
                        <InlineText
                            tagName="p"
                            className="text-sm text-slate-600 dark:text-slate-300 italic"
                            value={step.footerTip}
                            disabled={!isEditable}
                            onChange={(val) => onUpdate('footerTip', val)}
                            placeholder="Tip text"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
