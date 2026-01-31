
import React from 'react';
import type { ContentBlock } from '../../../types/course';
import { InlineText } from '../../ui/InlineText'; // Correct relative path from blocks/timeline/
import { STEP_THEMES, type ThemeColor } from './constants';

export const TimelineComponent: React.FC<{
    block: ContentBlock;
    isSelected: boolean;
    isEditable?: boolean;
    onClick: (e: React.MouseEvent) => void;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, isSelected, isEditable = true, onClick, onUpdate }) => {

    const handleStepClick = (i: number) => {
        // Interaction Logic: Check locking
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

    return (
        <div
            className={`relative group rounded-lg transition-all duration-200 ${isSelected ? 'ring-2 ring-[#7f13ec] ring-offset-4 ring-offset-slate-50 dark:ring-offset-[#150a1f]' : 'hover:ring-1 hover:ring-slate-300 dark:hover:ring-white/20'}`}
            onClick={onClick}
        >
            <div className="space-y-6">
                {/* Top Row: Navigation Steps */}
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {(block.content as any[]).map((step: any, i: number) => {
                        let themeKey: ThemeColor = step.theme || 'slate';

                        const metadata = block.metadata as any;
                        const isSequential = metadata?.sequential;
                        const maxUnlocked = metadata?.maxUnlockedIndex ?? 0;
                        const isLocked = isSequential && i > maxUnlocked;

                        const theme = STEP_THEMES[themeKey];
                        const isActive = ((block.metadata as any)?.activeStepIndex ?? 0) === i;

                        const activeClass = isActive ? theme.detail.activeBorder : `border-slate-100 ${theme.hoverBorder}`;
                        const bgClass = isLocked ? 'bg-slate-100 dark:bg-white/5 opacity-50 cursor-not-allowed' : (isActive ? theme.bg : 'bg-white');
                        const textClass = isActive ? theme.text : (isLocked ? 'text-slate-400' : 'text-slate-600');
                        const iconBgClass = isLocked ? 'bg-slate-200 dark:bg-white/10 text-slate-400' : (isActive ? theme.iconBg : `${theme.bg} ${theme.detail.iconColor.replace('text-', 'text-opacity-60 text-')}`);

                        return (
                            <div
                                key={i}
                                className={`flex-1 min-w-[140px] p-4 rounded-xl border transition-all flex flex-col items-center text-center gap-3 ${bgClass} ${isLocked ? '' : activeClass + ' cursor-pointer'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleStepClick(i);
                                }}
                            >
                                <div className={`w-12 h-12 rounded-full ${iconBgClass} flex items-center justify-center mb-1 relative`}>
                                    <span className="material-symbols-outlined text-2xl">{isLocked ? 'lock' : (step.icon || 'circle')}</span>
                                </div>
                                <div onClick={e => e.stopPropagation()}>
                                    {/* Inline Edit for Step Title */}
                                    <InlineText
                                        tagName="h4"
                                        className={`font-bold text-sm mb-1 ${textClass}`}
                                        value={step.title}
                                        disabled={!isEditable}
                                        onChange={(val) => {
                                            const newContent = [...(block.content as any[])];
                                            newContent[i] = { ...newContent[i], title: val };
                                            onUpdate({ content: newContent });
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Active Step Detail View */}
                {(() => {
                    const activeIndex = (block.metadata as any)?.activeStepIndex ?? 0;
                    const step = (block.content as any[])[activeIndex];
                    if (!step) return null; // Safe guard
                    const themeKey: ThemeColor = step.theme || 'slate';
                    const theme = STEP_THEMES[themeKey];

                    const updateActiveStep = (field: string, val: string) => {
                        const newContent = [...(block.content as any[])];
                        // Simple deep set for demo, ideally utility function
                        if (field.includes('.')) {
                            const [p, c] = field.split('.');
                            newContent[activeIndex] = { ...newContent[activeIndex], [p]: { ...newContent[activeIndex][p], [c]: val } };
                        } else {
                            newContent[activeIndex] = { ...newContent[activeIndex], [field]: val };
                        }
                        onUpdate({ content: newContent });
                    };

                    return (
                        <div className={`p-6 rounded-lg border-2 ${theme.detail.border} ${theme.bg} transition-all duration-300`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme.iconBg}`}>
                                    <span className={`material-symbols-outlined text-3xl ${theme.detail.iconColor}`}>{step.detailIcon || 'circle'}</span>
                                </div>
                                <div className="flex-1">
                                    <InlineText
                                        tagName="h3"
                                        className={`text-2xl font-bold ${theme.text}`}
                                        value={step.detailTitle || step.title}
                                        disabled={!isEditable}
                                        onChange={(val) => updateActiveStep('detailTitle', val)}
                                    />
                                    <InlineText
                                        tagName="p"
                                        className={`text-sm ${theme.text}`}
                                        value={step.detailSubtitle}
                                        disabled={!isEditable}
                                        onChange={(val) => updateActiveStep('detailSubtitle', val)}
                                    />
                                </div>
                            </div>

                            {/* Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Card 1 */}
                                <div className={`p-4 rounded-lg border ${theme.detail.border} bg-white/50 dark:bg-black/10`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`material-symbols-outlined text-lg ${theme.detail.iconColor}`}>{step.card1?.icon || 'check_circle'}</span>
                                        <InlineText tagName="span" className={`text-xs font-bold uppercase ${theme.text} break-words`} value={step.card1?.title} disabled={!isEditable} onChange={v => updateActiveStep('card1.title', v)} />
                                    </div>
                                    <InlineText tagName="p" className={`text-sm ${theme.text} whitespace-pre-line leading-relaxed break-words`} value={step.card1?.text} disabled={!isEditable} onChange={v => updateActiveStep('card1.text', v)} multiline />
                                </div>
                                {/* Card 2 */}
                                <div className={`p-4 rounded-lg border ${theme.detail.border} bg-white/50 dark:bg-black/10`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`material-symbols-outlined text-lg ${theme.detail.iconColor}`}>{step.card2?.icon || 'check_circle'}</span>
                                        <InlineText tagName="span" className={`text-xs font-bold uppercase ${theme.text} break-words`} value={step.card2?.title} disabled={!isEditable} onChange={v => updateActiveStep('card2.title', v)} />
                                    </div>
                                    <InlineText tagName="p" className={`text-sm ${theme.text} whitespace-pre-line leading-relaxed break-words`} value={step.card2?.text} disabled={!isEditable} onChange={v => updateActiveStep('card2.text', v)} multiline />
                                </div>
                            </div>

                            {/* Footer Tip */}
                            {step.footerTip && (
                                <div className={`mt-4 p-3 rounded-lg bg-white/60 dark:bg-black/20 border-t-4 ${theme.detail.activeBorder} flex gap-3 items-start`}>
                                    <span className={`material-symbols-outlined text-lg mt-0.5 ${theme.detail.iconColor}`}>{step.footerTip || 'help'}</span>
                                    <InlineText tagName="span" className={`text-xs leading-relaxed ${theme.text} break-words`} value={step.footerTip} disabled={!isEditable} onChange={v => updateActiveStep('footerTip', v)} multiline />
                                </div>
                            )}
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};
