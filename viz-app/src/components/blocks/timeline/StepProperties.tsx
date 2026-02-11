
import React, { useState } from 'react';
import { PropertySection } from '../../ui/PropertySection';
import { AVAILABLE_ICONS, STEP_THEMES, type ThemeColor } from './constants';
import type { TimelineStep } from './types';

interface StepPropertiesProps {
    step: TimelineStep;
    index: number;
    onChange: (field: string, value: unknown) => void;
}

export const StepProperties: React.FC<StepPropertiesProps> = ({ step, index, onChange }) => {
    const [activeIconPicker, setActiveIconPicker] = useState<string | null>(null);

    return (
        <>
            <PropertySection title={`Step ${index + 1} Appearance`} isOpen>
                <div className="space-y-4">
                    {/* Icon Picker (Main Block/Step Icon) */}
                    {/* Icon Picker moved to Content -> Header Info */}

                    {/* Theme Color */}
                    <div>
                        <label className="block text-xs text-slate-500 mb-1.5">Theme Color</label>
                        <div className="flex gap-2">
                            {(Object.keys(STEP_THEMES) as ThemeColor[]).map((themeKey) => {
                                const theme = STEP_THEMES[themeKey as ThemeColor];
                                const isActive = step.theme === themeKey;
                                return (
                                    <button
                                        key={themeKey}
                                        className={`w-6 h-6 rounded-full border-2 transition-all ${theme.iconBg.split(' ')[0]} ${isActive ? 'border-slate-600 dark:border-white scale-110' : 'border-transparent hover:scale-110'}`}
                                        onClick={() => onChange('theme', themeKey)}
                                        title={themeKey}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </PropertySection>

            <PropertySection title={`Step ${index + 1} Content`} isOpen>
                <div className="space-y-4">
                    {/* Editing Fields */}
                    <div className="space-y-4 border-t border-slate-200 dark:border-white/10 pt-4">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Header Info</label>
                            <div>
                                <label className="block text-[10px] text-slate-500 mb-1">Detailed Title & Icon</label>
                                <div className="flex gap-2">
                                    {/* Icon Trigger */}
                                    <div className="relative">
                                        <button
                                            className="w-8 h-8 flex items-center justify-center rounded bg-white border border-slate-200 text-slate-500 hover:text-[#7f13ec]"
                                            onClick={() => setActiveIconPicker(activeIconPicker === 'main_header' ? null : 'main_header')}
                                            title={step.icon ? "Change Icon" : "Add Icon"}
                                        >
                                            {step.icon ? (
                                                <span className="material-symbols-outlined text-[18px]">{step.icon}</span>
                                            ) : (
                                                <span className="text-[10px] uppercase font-bold text-slate-300">None</span>
                                            )}
                                        </button>

                                        {/* Icon Picker Dropdown */}
                                        {activeIconPicker === 'main_header' && (
                                            <div className="absolute top-full left-0 mt-1 z-20 w-64 p-2 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#1f1629] shadow-xl">
                                                <button
                                                    className="w-full flex items-center justify-center gap-2 py-1.5 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded mb-2 border border-red-100 dark:border-red-900/30"
                                                    onClick={() => {
                                                        onChange('icon', '');
                                                        setActiveIconPicker(null);
                                                    }}
                                                >
                                                    <span className="material-symbols-outlined text-sm">block</span>
                                                    Remove Icon
                                                </button>
                                                <div className="grid grid-cols-6 gap-1">
                                                    {AVAILABLE_ICONS.map(iconName => (
                                                        <button
                                                            key={iconName}
                                                            className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-[#7f13ec]"
                                                            onClick={() => {
                                                                onChange('icon', iconName);
                                                                setActiveIconPicker(null);
                                                            }}
                                                        >
                                                            <span className="material-symbols-outlined text-xl">{iconName}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Title Input */}
                                    <input
                                        type="text"
                                        className="flex-1 px-2 py-1.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none"
                                        value={step.detailTitle || step.title}
                                        onChange={(e) => onChange('detailTitle', e.target.value)}
                                        placeholder="Step Title"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] text-slate-500 mb-1">Subtitle</label>
                                <input
                                    type="text"
                                    className="w-full px-2 py-1.5 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none"
                                    value={step.detailSubtitle || ''}
                                    onChange={(e) => onChange('detailSubtitle', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Dynamic Cards Management */}
                        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-white/5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Detail Cards</label>
                                <button
                                    className="text-[10px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                                    onClick={() => {
                                        const currentCards = step.cards || [];
                                        onChange('cards', [...currentCards, { title: 'New Card', text: 'Card description', icon: undefined }]);
                                    }}
                                >
                                    <span className="material-symbols-outlined text-[14px]">add_circle</span> Add Card
                                </button>
                            </div>

                            <div className="space-y-4">
                                {(step.cards || []).map((card, idx) => (
                                    <div key={idx} className="p-2 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 relative group">
                                        {/* Delete Button */}
                                        <button
                                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => {
                                                const currentCards = [...(step.cards || [])];
                                                currentCards.splice(idx, 1);
                                                onChange('cards', currentCards);
                                            }}
                                        >

                                            <span className="material-symbols-outlined text-[16px]">close</span>
                                        </button>

                                        <div className="flex items-center gap-2 mb-2">
                                            <button
                                                className="w-8 h-8 flex items-center justify-center rounded bg-white border border-slate-200 text-slate-500 hover:text-[#7f13ec]"
                                                onClick={() => setActiveIconPicker(activeIconPicker === `card_${idx}` ? null : `card_${idx}`)}
                                                title={card.icon ? "Change Icon" : "Add Icon"}
                                            >
                                                {card.icon ? (
                                                    <span className="material-symbols-outlined text-[18px]">{card.icon}</span>
                                                ) : (
                                                    <span className="text-[10px] uppercase font-bold text-slate-300">None</span>
                                                )}
                                            </button>
                                            <div className="flex-1">
                                                <label className="block text-[9px] text-slate-400 uppercase font-bold">Title</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#7f13ec] text-xs font-medium outline-none"
                                                    value={card.title}
                                                    onChange={(e) => onChange(`cards.${idx}.title`, e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        {activeIconPicker === `card_${idx}` && (
                                            <div className="grid grid-cols-6 gap-1 p-2 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#1f1629] shadow-sm mb-2 z-10 relative">
                                                <button
                                                    className="col-span-6 flex items-center justify-center gap-2 py-1 text-[10px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded mb-1"
                                                    onClick={() => { onChange(`cards.${idx}.icon`, ''); setActiveIconPicker(null); }}
                                                >
                                                    <span className="material-symbols-outlined text-[12px]">block</span>
                                                    No Icon
                                                </button>
                                                {AVAILABLE_ICONS.map(iconName => (
                                                    <button key={iconName} className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-[#7f13ec]"
                                                        onClick={() => { onChange(`cards.${idx}.icon`, iconName); setActiveIconPicker(null); }}
                                                    >
                                                        <span className="material-symbols-outlined text-sm">{iconName}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        <div>
                                            <textarea
                                                className="w-full h-16 px-2 py-1.5 rounded bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none resize-none"
                                                value={card.text}
                                                onChange={(e) => onChange(`cards.${idx}.text`, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Images Management */}
                        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-white/5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Images</label>
                                <button
                                    className="text-[10px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                                    onClick={() => {
                                        const currentImages = step.images || [];
                                        onChange('images', [...currentImages, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop']);
                                    }}
                                >
                                    <span className="material-symbols-outlined text-[14px]">add_a_photo</span> Add Image
                                </button>
                            </div>
                            <div className="space-y-4">
                                {(step.images || []).map((img, idx) => (
                                    <div key={idx} className="p-2 rounded bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 relative group">
                                        <button
                                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                            onClick={() => {
                                                const currentImages = [...(step.images || [])];
                                                currentImages.splice(idx, 1);
                                                onChange('images', currentImages);
                                            }}
                                        >
                                            <span className="material-symbols-outlined text-[16px]">close</span>
                                        </button>
                                        <div className="space-y-2">
                                            <img src={img} alt="preview" className="w-full h-20 object-cover rounded border border-slate-200" />
                                            <input
                                                type="text"
                                                className="w-full px-2 py-1 rounded bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-[10px] outline-none"
                                                value={img}
                                                onChange={(e) => {
                                                    const currentImages = [...(step.images || [])];
                                                    currentImages[idx] = e.target.value;
                                                    onChange('images', currentImages);
                                                }}
                                                placeholder="Image URL"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </PropertySection>
        </>
    );
};
