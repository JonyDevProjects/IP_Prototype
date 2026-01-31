
import React, { useState } from 'react';
import type { ContentBlock } from '../../../types/course';
import { PropertySection } from '../../ui/PropertySection';
import { AVAILABLE_ICONS, STEP_THEMES, type ThemeColor } from './constants';

export const TimelineProperties: React.FC<{
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, onUpdate }) => {
    const [activeIconPicker, setActiveIconPicker] = useState<string | null>(null);

    const activeIndex = (block.metadata as any)?.activeStepIndex ?? 0;
    const steps = block.content as any[];
    const activeStep = steps[activeIndex];

    const updateStep = (field: string, value: string) => {
        const newContent = [...steps];
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            newContent[activeIndex] = {
                ...newContent[activeIndex],
                [parent]: {
                    ...newContent[activeIndex][parent],
                    [child]: value
                }
            };
        } else {
            newContent[activeIndex] = { ...newContent[activeIndex], [field]: value };
        }
        onUpdate({ content: newContent });
    };

    return (
        <>
            <PropertySection title="Appearance" isOpen>
                <div className="space-y-4">
                    {/* Icon Picker (Main Block/Step Icon) */}
                    <div>
                        <label className="block text-xs text-slate-500 mb-1.5">Icon / Style</label>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 p-2 border border-slate-200 dark:border-white/10 rounded-lg bg-slate-50 dark:bg-white/5">
                                {(() => {
                                    const theme = STEP_THEMES[(activeStep.theme as ThemeColor) || 'amber'];
                                    return (
                                        <>
                                            <div className={`w-8 h-8 rounded ${theme.iconBg} flex items-center justify-center`}>
                                                <span className="material-symbols-outlined text-lg">{activeStep.icon || 'circle'}</span>
                                            </div>
                                            <button
                                                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                                onClick={() => setActiveIconPicker(activeIconPicker === 'main' ? null : 'main')}
                                            >
                                                Change Icon
                                            </button>
                                        </>
                                    );
                                })()}
                            </div>
                            {activeIconPicker === 'main' && (
                                <div className="grid grid-cols-5 gap-2 p-2 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#1f1629] shadow-sm">
                                    {AVAILABLE_ICONS.map(iconName => (
                                        <button
                                            key={iconName}
                                            className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-[#7f13ec]"
                                            onClick={() => {
                                                const newContent = [...steps];
                                                newContent[activeIndex] = {
                                                    ...newContent[activeIndex],
                                                    icon: iconName,
                                                    detailIcon: iconName
                                                };
                                                onUpdate({ content: newContent });
                                                setActiveIconPicker(null);
                                            }}
                                        >
                                            <span className="material-symbols-outlined text-xl">{iconName}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Theme Color */}
                    <div>
                        <label className="block text-xs text-slate-500 mb-1.5">Theme Color</label>
                        <div className="flex gap-2">
                            {Object.keys(STEP_THEMES).map((themeKey) => {
                                const theme = STEP_THEMES[themeKey as ThemeColor];
                                const isActive = activeStep.theme === themeKey;
                                return (
                                    <button
                                        key={themeKey}
                                        className={`w-6 h-6 rounded-full border-2 transition-all ${theme.iconBg.split(' ')[0]} ${isActive ? 'border-slate-600 dark:border-white scale-110' : 'border-transparent hover:scale-110'}`}
                                        onClick={() => {
                                            const newContent = [...steps];
                                            newContent[activeIndex] = { ...newContent[activeIndex], theme: themeKey };
                                            onUpdate({ content: newContent });
                                        }}
                                        title={themeKey}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </PropertySection>

            <PropertySection title="Content" isOpen>
                <div className="space-y-4">
                    {/* Step Selector for Editing */}
                    <div>
                        <label className="block text-xs text-slate-500 mb-1.5 font-bold uppercase">Edit Step</label>
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
                                        card1: { title: 'Card 1', text: 'Text for card 1', icon: 'check_circle' },
                                        card2: { title: 'Card 2', text: 'Text for card 2', icon: 'check_circle' },
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

                    {/* Editing Fields */}
                    <div className="space-y-4 border-t border-slate-200 dark:border-white/10 pt-4">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Header Info</label>
                            <div>
                                <label className="block text-[10px] text-slate-500 mb-1">Detailed Title</label>
                                <input
                                    type="text"
                                    className="w-full px-2 py-1.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none"
                                    value={activeStep.detailTitle || activeStep.title}
                                    onChange={(e) => updateStep('detailTitle', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] text-slate-500 mb-1">Subtitle</label>
                                <input
                                    type="text"
                                    className="w-full px-2 py-1.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none"
                                    value={activeStep.detailSubtitle || ''}
                                    onChange={(e) => updateStep('detailSubtitle', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Card 1 */}
                        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-white/5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Left Card</label>
                                <button className="text-[10px] text-blue-600 hover:underline flex items-center gap-1" onClick={() => setActiveIconPicker(activeIconPicker === 'card1' ? null : 'card1')}>
                                    <span className="material-symbols-outlined text-[14px]">{activeStep.card1?.icon || 'add_circle'}</span> Icon
                                </button>
                            </div>
                            {activeIconPicker === 'card1' && (
                                <div className="grid grid-cols-6 gap-1 p-2 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#1f1629] shadow-sm mb-2">
                                    {AVAILABLE_ICONS.map(iconName => (
                                        <button key={iconName} className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-[#7f13ec]"
                                            onClick={() => { updateStep('card1.icon', iconName); setActiveIconPicker(null); }}
                                        >
                                            <span className="material-symbols-outlined text-sm">{iconName}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div>
                                <label className="block text-[10px] text-slate-500 mb-1">Title</label>
                                <input type="text" className="w-full px-2 py-1.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none"
                                    value={activeStep.card1?.title || ''} onChange={(e) => updateStep('card1.title', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] text-slate-500 mb-1">Text</label>
                                <textarea className="w-full h-16 px-2 py-1.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none resize-none"
                                    value={activeStep.card1?.text || ''} onChange={(e) => updateStep('card1.text', e.target.value)} />
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-white/5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Right Card</label>
                                <button className="text-[10px] text-blue-600 hover:underline flex items-center gap-1" onClick={() => setActiveIconPicker(activeIconPicker === 'card2' ? null : 'card2')}>
                                    <span className="material-symbols-outlined text-[14px]">{activeStep.card2?.icon || 'add_circle'}</span> Icon
                                </button>
                            </div>
                            {activeIconPicker === 'card2' && (
                                <div className="grid grid-cols-6 gap-1 p-2 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#1f1629] shadow-sm mb-2">
                                    {AVAILABLE_ICONS.map(iconName => (
                                        <button key={iconName} className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-[#7f13ec]"
                                            onClick={() => { updateStep('card2.icon', iconName); setActiveIconPicker(null); }}
                                        >
                                            <span className="material-symbols-outlined text-sm">{iconName}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div>
                                <label className="block text-[10px] text-slate-500 mb-1">Title</label>
                                <input type="text" className="w-full px-2 py-1.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none"
                                    value={activeStep.card2?.title || ''} onChange={(e) => updateStep('card2.title', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] text-slate-500 mb-1">Text</label>
                                <textarea className="w-full h-16 px-2 py-1.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none resize-none"
                                    value={activeStep.card2?.text || ''} onChange={(e) => updateStep('card2.text', e.target.value)} />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-white/5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Footer Tip</label>
                                <button className="text-[10px] text-blue-600 hover:underline flex items-center gap-1" onClick={() => setActiveIconPicker(activeIconPicker === 'footerTip' ? null : 'footerTip')}>
                                    <span className="material-symbols-outlined text-[14px]">{activeStep.footerTipIcon || 'help'}</span> Icon
                                </button>
                            </div>
                            {activeIconPicker === 'footerTip' && (
                                <div className="grid grid-cols-6 gap-1 p-2 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#1f1629] shadow-sm mb-2">
                                    {AVAILABLE_ICONS.map(iconName => (
                                        <button key={iconName} className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-[#7f13ec]"
                                            onClick={() => { updateStep('footerTipIcon', iconName); setActiveIconPicker(null); }}
                                        >
                                            <span className="material-symbols-outlined text-sm">{iconName}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                            <textarea className="w-full h-12 px-2 py-1.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none resize-none"
                                value={activeStep.footerTip || ''} onChange={(e) => updateStep('footerTip', e.target.value)} />
                        </div>
                    </div>
                </div>
            </PropertySection>

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
