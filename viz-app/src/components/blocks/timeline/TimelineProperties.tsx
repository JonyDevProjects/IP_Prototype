import React from 'react';
import type { ContentBlock } from '../../../types/course';
import { PropertySection } from '../../ui/PropertySection';
import { type ThemeColor } from './constants';
import { StepProperties } from './StepProperties';

export const TimelineProperties: React.FC<{
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, onUpdate }) => {
    const activeIndex = (block.metadata as any)?.activeStepIndex ?? 0;
    const steps = block.content as any[];
    const activeStep = steps[activeIndex];

    const updateStep = (field: string, value: any) => {
        const newContent = [...steps];

        if (field.includes('.')) {
            const parts = field.split('.');

            if (parts.length === 3) {
                // Case: cards.0.title
                const [parent, indexStr, child] = parts;
                const index = parseInt(indexStr, 10);

                // 1. Clone the parent array (e.g., cards)
                const list = [...(newContent[activeIndex][parent] as any[])];

                // 2. Clone the specific item (e.g., card object) and update its field
                list[index] = {
                    ...list[index],
                    [child]: value
                };

                // 3. Update the step with the new list
                newContent[activeIndex] = {
                    ...newContent[activeIndex],
                    [parent]: list
                };
            } else {
                // Case: detailTitle (legacy/simple nested) or fallback
                const [parent, child] = parts;
                newContent[activeIndex] = {
                    ...newContent[activeIndex],
                    [parent]: {
                        ...newContent[activeIndex][parent],
                        [child]: value
                    }
                };
            }
        } else {
            newContent[activeIndex] = { ...newContent[activeIndex], [field]: value };
        }
        onUpdate({ content: newContent });
    };

    return (
        <>
            <PropertySection title="Timeline Management" isOpen>
                <div className="space-y-4">
                    {/* Step Selector for Editing */}
                    <div>
                        <label className="block text-xs text-slate-500 mb-1.5 font-bold uppercase">Select Step to Edit</label>
                        <div className="flex flex-wrap gap-2 bg-slate-100 dark:bg-white/5 p-1 rounded-lg">
                            {steps.map((_, i) => (
                                <button
                                    key={i}
                                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${activeIndex === i
                                        ? 'bg-white dark:bg-white/10 shadow-sm text-[#7f13ec]'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                                        }`}
                                    onClick={() => onUpdate({ metadata: { ...block.metadata, activeStepIndex: i } })}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className="px-2 py-1.5 text-xs font-bold rounded text-white bg-[#7f13ec] hover:bg-[#690fc4] transition-colors flex items-center justify-center"
                                onClick={() => {
                                    const nextIndex = steps.length;
                                    const themes: ThemeColor[] = ['amber', 'blue', 'purple', 'green', 'red', 'slate'];
                                    const nextTheme = themes[nextIndex % themes.length];

                                    const newStep = {
                                        title: `Step ${nextIndex + 1}`,
                                        summary: 'New Summary',
                                        icon: 'circle',
                                        theme: nextTheme,
                                        detailTitle: `New Step ${nextIndex + 1}`,
                                        detailSubtitle: 'Subtitle',
                                        detailIcon: 'circle',
                                        cards: [
                                            { title: 'Card 1', text: 'Text for card 1', icon: 'check_circle' },
                                            { title: 'Card 2', text: 'Text for card 2', icon: 'check_circle' }
                                        ],
                                        footerTip: 'Tip text',
                                        footerTipIcon: 'help'
                                    };
                                    onUpdate({
                                        content: [...steps, newStep],
                                        metadata: { ...block.metadata, activeStepIndex: nextIndex }
                                    });
                                }}
                                title="Add Step"
                            >
                                <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>

                        {steps.length > 1 && (
                            <div className="mt-2 text-right">
                                <button
                                    className="text-[10px] text-red-500 hover:text-red-700 font-medium flex items-center gap-1 ml-auto"
                                    onClick={() => {
                                        const newContent = steps.filter((_, i) => i !== activeIndex);
                                        let newActiveIndex = activeIndex;
                                        if (newActiveIndex >= newContent.length) {
                                            newActiveIndex = newContent.length - 1;
                                        }
                                        onUpdate({
                                            content: newContent,
                                            metadata: { ...block.metadata, activeStepIndex: newActiveIndex }
                                        });
                                    }}
                                >
                                    <span className="material-symbols-outlined text-[12px]">delete</span>
                                    Delete Step
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </PropertySection>

            <StepProperties
                step={activeStep}
                index={activeIndex}
                onChange={updateStep}
            />

            <PropertySection title="Interaction">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Sequential Navigation</span>
                        <div
                            className={`w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors ${block.metadata?.sequential ? 'bg-[#7f13ec]' : 'bg-slate-300 dark:bg-slate-600'}`}
                            onClick={() => {
                                const isSequential = !(block.metadata as any)?.sequential;
                                onUpdate({
                                    metadata: {
                                        ...block.metadata,
                                        sequential: isSequential,
                                        maxUnlockedIndex: isSequential ? 0 : undefined
                                    }
                                });
                            }}
                        >
                            <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${(block.metadata as any)?.sequential ? 'translate-x-4' : ''}`} />
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Forces users to view steps in order. New steps are locked until the previous one is viewed.
                    </p>
                </div>
            </PropertySection>
        </>
    );
};
