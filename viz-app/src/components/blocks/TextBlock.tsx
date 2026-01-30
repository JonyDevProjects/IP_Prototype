import React from 'react';
import { ContentBlock } from '../../types/course';
import { BlockDefinition } from './types';
import { PropertySection } from '../ui/PropertySection';

const TextComponent: React.FC<{
    block: ContentBlock;
    isSelected: boolean;
    onClick: (e: React.MouseEvent) => void;
}> = ({ block, isSelected, onClick }) => {
    return (
        <div
            className={`p-4 rounded-lg bg-white dark:bg-[#1f1629] border transition-all duration-200 ${isSelected ? 'border-[#7f13ec] ring-2 ring-[#7f13ec]/20 shadow-md' : 'border-slate-200 dark:border-white/5 hover:border-slate-300'}`}
            onClick={onClick}
        >
            <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">{block.content as string}</p>
        </div>
    );
};

const TextProperties: React.FC<{
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, onUpdate }) => {
    return (
        <PropertySection title="Content" isOpen>
            <div>
                <label className="block text-xs text-slate-500 mb-1.5">Text Content</label>
                <textarea
                    className="w-full h-32 px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none resize-none"
                    value={block.content as string}
                    onChange={(e) => onUpdate({ content: e.target.value })}
                />
            </div>
        </PropertySection>
    );
};

export const TextBlockDefinition: BlockDefinition = {
    type: 'text',
    label: 'Text',
    icon: 'title',
    createBlock: (id) => ({
        id,
        type: 'text',
        content: 'Edit this text...'
    }),
    Component: TextComponent,
    Properties: TextProperties
};
