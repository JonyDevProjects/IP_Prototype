import React from 'react';
import { ContentBlock } from '../../types/course';
import { BlockDefinition } from './types';
import { PropertySection } from '../ui/PropertySection';

const AlertComponent: React.FC<{
    block: ContentBlock;
    isSelected: boolean;
    onClick: (e: React.MouseEvent) => void;
}> = ({ block, isSelected, onClick }) => {
    const data = block.content as any;
    return (
        <div
            className={`p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/30 flex gap-3 transition-all duration-200 ${isSelected ? 'ring-2 ring-[#7f13ec] ring-offset-2 ring-offset-white dark:ring-offset-[#150a1f]' : ''}`}
            onClick={onClick}
        >
            <span className="material-symbols-outlined text-indigo-500">{data.icon || 'lightbulb'}</span>
            <div>
                <h4 className="font-bold text-indigo-900 dark:text-indigo-100 text-sm mb-1">{data.title}</h4>
                <p className="text-indigo-800 dark:text-indigo-200 text-xs">{data.text}</p>
            </div>
        </div>
    );
};

const AlertProperties: React.FC<{
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, onUpdate }) => {
    const data = block.content as any;
    const updateData = (updates: any) => onUpdate({ content: { ...data, ...updates } });

    return (
        <PropertySection title="Content" isOpen>
            <div className="space-y-3">
                <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Title</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none"
                        value={data.title || ''}
                        onChange={(e) => updateData({ title: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Message</label>
                    <textarea
                        className="w-full h-20 px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none resize-none"
                        value={data.text || ''}
                        onChange={(e) => updateData({ text: e.target.value })}
                    />
                </div>
            </div>
        </PropertySection>
    );
};

export const AlertBlockDefinition: BlockDefinition = {
    type: 'alert',
    label: 'Interactive',
    icon: 'touch_app',
    createBlock: (id) => ({
        id,
        type: 'alert',
        content: {
            title: 'Did you know?',
            text: 'This is an interactive alert box.',
            icon: 'lightbulb'
        }
    }),
    Component: AlertComponent,
    Properties: AlertProperties
};
