import React, { useState } from 'react';
import { ContentBlock, ContentBlockType } from '../../types/course';
import { BlockDefinition } from './types';
import { PropertySection } from '../ui/PropertySection'; // Assuming this is available or needs to be moved/exported

// --- Constants & Types ---

const AVAILABLE_ICONS = [
    'lightbulb', 'settings', 'rocket_launch', 'check_circle',
    'flag', 'star', 'schedule', 'build', 'visibility',
    'favorite', 'thumb_up', 'warning', 'info', 'help', 'home',
    'person', 'groups', 'work', 'assignment', 'bolt',
    'key', 'description', 'list', 'done_all', 'search',
    'call_split', 'timeline', 'psychology', 'group_add'
];

type ThemeColor = 'amber' | 'blue' | 'purple' | 'green' | 'red' | 'slate';

const STEP_THEMES: Record<ThemeColor, any> = {
    amber: {
        bg: 'bg-amber-50', text: 'text-amber-900', iconBg: 'bg-amber-100 text-amber-500',
        border: 'border-amber-400', hoverBorder: 'hover:border-amber-200',
        detail: { border: 'border-amber-200', iconColor: 'text-amber-400', activeBorder: 'border-amber-400 border-b-4' }
    },
    blue: {
        bg: 'bg-blue-50', text: 'text-blue-900', iconBg: 'bg-blue-100 text-blue-500',
        border: 'border-blue-400', hoverBorder: 'hover:border-blue-200',
        detail: { border: 'border-blue-200', iconColor: 'text-blue-500', activeBorder: 'border-blue-400 border-b-4' }
    },
    purple: {
        bg: 'bg-purple-50', text: 'text-purple-900', iconBg: 'bg-purple-100 text-purple-500',
        border: 'border-purple-400', hoverBorder: 'hover:border-purple-200',
        detail: { border: 'border-purple-200', iconColor: 'text-purple-500', activeBorder: 'border-purple-400 border-b-4' }
    },
    green: {
        bg: 'bg-emerald-50', text: 'text-emerald-900', iconBg: 'bg-emerald-100 text-emerald-500',
        border: 'border-emerald-400', hoverBorder: 'hover:border-emerald-200',
        detail: { border: 'border-emerald-200', iconColor: 'text-emerald-500', activeBorder: 'border-emerald-400 border-b-4' }
    },
    red: {
        bg: 'bg-rose-50', text: 'text-rose-900', iconBg: 'bg-rose-100 text-rose-500',
        border: 'border-rose-400', hoverBorder: 'hover:border-rose-200',
        detail: { border: 'border-rose-200', iconColor: 'text-rose-500', activeBorder: 'border-rose-400 border-b-4' }
    },
    slate: {
        bg: 'bg-slate-50', text: 'text-slate-900', iconBg: 'bg-slate-200 text-slate-500',
        border: 'border-slate-300', hoverBorder: 'hover:border-slate-300',
        detail: { border: 'border-slate-200', iconColor: 'text-slate-400', activeBorder: 'border-slate-400 border-b-4' }
    }
};

// --- Components ---

const TimelineComponent: React.FC<{
    block: ContentBlock;
    isSelected: boolean;
    onClick: (e: React.MouseEvent) => void;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, isSelected, onClick, onUpdate }) => {

    // We modify local metadata via setBlocks in parent usually, 
    // here we use onUpdate to change metadata or content.

    const handleStepClick = (i: number) => {
        // Interaction Logic: Check locking
        const isSequential = block.metadata?.sequential;
        const maxUnlocked = block.metadata?.maxUnlockedIndex ?? 0;
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

    return (
        <div
            className={`relative group rounded-lg transition-all duration-200 ${isSelected ? 'ring-2 ring-[#7f13ec] ring-offset-4 ring-offset-slate-50 dark:ring-offset-[#150a1f]' : 'hover:ring-1 hover:ring-slate-300 dark:hover:ring-white/20'}`}
            onClick={onClick}
        >
            {/* Delete Button (Generic for now, or part of wrapper) */}
            <div className="absolute -top-3 -right-3 py-1 px-1 bg-white dark:bg-[#1f1629] rounded-full shadow-sm border border-slate-200 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-1">
                <button className="p-1 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-400 hover:text-red-500">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
            </div>

            <div className="space-y-6">
                {/* Top Row: Navigation Steps */}
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {(block.content as any[]).map((step: any, i: number) => {
                        let themeKey: ThemeColor = step.theme || 'slate';

                        // Interaction Logic
                        const isSequential = block.metadata?.sequential;
                        const maxUnlocked = block.metadata?.maxUnlockedIndex ?? 0;
                        const isLocked = isSequential && i > maxUnlocked;

                        const theme = STEP_THEMES[themeKey];
                        const isActive = (block.metadata?.activeStepIndex ?? 0) === i;

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
                                <div>
                                    <h4 className={`font-bold text-sm mb-1 ${textClass}`}>{step.title}</h4>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Active Step Detail View */}
                {(() => {
                    const activeIndex = block.metadata?.activeStepIndex ?? 0;
                    const step = (block.content as any[])[activeIndex];
                    if (!step) return null; // Safe guard
                    const themeKey: ThemeColor = step.theme || 'slate';
                    const theme = STEP_THEMES[themeKey];

                    return (
                        <div className={`p-6 rounded-lg border-2 ${theme.detail.border} ${theme.bg} transition-all duration-300`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme.iconBg}`}>
                                    <span className={`material-symbols-outlined text-3xl ${theme.detail.iconColor}`}>{step.detailIcon || 'circle'}</span>
                                </div>
                                <div>
                                    <h3 className={`text-2xl font-bold ${theme.text}`}>{step.detailTitle || step.title}</h3>
                                    <p className={`text-sm ${theme.text}`}>{step.detailSubtitle}</p>
                                </div>
                            </div>

                            {/* Cards */}
                            {/* Uses whitespace-pre-line to respect newlines in text */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Card 1 */}
                                <div className={`p-4 rounded-lg border ${theme.detail.border} bg-white/50 dark:bg-black/10`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`material-symbols-outlined text-lg ${theme.detail.iconColor}`}>{step.card1?.icon || 'check_circle'}</span>
                                        <label className={`text-xs font-bold uppercase ${theme.text}`}>{step.card1?.title || 'Card 1'}</label>
                                    </div>
                                    <p className={`text-sm ${theme.text} whitespace-pre-line leading-relaxed`}>{step.card1?.text}</p>
                                </div>
                                {/* Card 2 */}
                                <div className={`p-4 rounded-lg border ${theme.detail.border} bg-white/50 dark:bg-black/10`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`material-symbols-outlined text-lg ${theme.detail.iconColor}`}>{step.card2?.icon || 'check_circle'}</span>
                                        <label className={`text-xs font-bold uppercase ${theme.text}`}>{step.card2?.title || 'Card 2'}</label>
                                    </div>
                                    <p className={`text-sm ${theme.text} whitespace-pre-line leading-relaxed`}>{step.card2?.text}</p>
                                </div>
                            </div>

                            {/* Footer Tip */}
                            {step.footerTip && (
                                <div className={`mt-4 p-3 rounded-lg bg-white/60 dark:bg-black/20 border-t-4 ${theme.detail.activeBorder} flex gap-3 items-start`}>
                                    <span className={`material-symbols-outlined text-lg mt-0.5 ${theme.detail.iconColor}`}>{step.footerTipIcon || 'help'}</span>
                                    <span className={`text-xs leading-relaxed ${theme.text}`}>{step.footerTip}</span>
                                </div>
                            )}
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};

const TimelineProperties: React.FC<{
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, onUpdate }) => {
    const [activeIconPicker, setActiveIconPicker] = useState<string | null>(null);

    const activeIndex = block.metadata?.activeStepIndex ?? 0;
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
                                const isSequential = !block.metadata?.sequential;
                                onUpdate({
                                    metadata: {
                                        ...block.metadata,
                                        sequential: isSequential,
                                        maxUnlockedIndex: isSequential ? 0 : undefined
                                    }
                                });
                            }}
                        >
                            <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${block.metadata?.sequential ? 'translate-x-4' : ''}`} />
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

export const TimelineBlockDefinition: BlockDefinition = {
    type: 'timeline',
    label: 'Timeline',
    icon: 'view_timeline',
    createBlock: (id) => ({
        id,
        type: 'timeline',
        content: [
            {
                title: 'Génesis', summary: 'Definición inicial', icon: 'lightbulb', theme: 'amber',
                detailTitle: 'Génesis', detailSubtitle: 'Propósito y conceptos clave antes de iniciar.',
                detailIcon: 'lightbulb',
                card1: { title: 'Metric', text: 'Description text goes here.', icon: 'check_circle' },
                card2: { title: 'Action', text: 'Description text goes here.', icon: 'check_circle' },
                footerTip: 'Tip de PMP: This is a helpful tip about this process step.',
                footerTipIcon: 'help'
            },
            {
                title: 'Viabilidad', summary: 'Business Case', icon: 'settings', theme: 'blue',
                detailTitle: 'Viabilidad', detailSubtitle: 'Evaluación financiera y estratégica.',
                detailIcon: 'settings',
                card1: { title: 'Metric', text: 'ROI & NPV calculations', icon: 'calculate' },
                card2: { title: 'Action', text: 'Approve Business Case', icon: 'thumb_up' },
                footerTip: 'Tip: Always align with strategic objectives.',
                footerTipIcon: 'info'
            },
            {
                title: 'Project Charter', summary: 'Autorización', icon: 'rocket_launch', theme: 'purple',
                detailTitle: 'Project Charter', detailSubtitle: 'Documento que formaliza el proyecto.',
                detailIcon: 'rocket_launch',
                card1: { title: 'Scope', text: 'High-level requirements', icon: 'list' },
                card2: { title: 'Auth', text: 'Sign-off via sponsor', icon: 'signature' },
                footerTip: 'Tip: The PM is assigned here.',
                footerTipIcon: 'person'
            }
        ],
        metadata: { activeStepIndex: 0 }
    }),
    Component: TimelineComponent,
    Properties: TimelineProperties
};
