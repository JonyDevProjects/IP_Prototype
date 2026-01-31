import React from 'react';
import type { ContentBlock } from '../../types/course';
import type { BlockDefinition } from './types';
import { PropertySection } from '../ui/PropertySection';
import { RichTextEditor } from '../ui/RichTextEditor';

const TextComponent: React.FC<{
    block: ContentBlock;
    isSelected: boolean;
    onClick: (e: React.MouseEvent) => void;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, isSelected, onClick, onUpdate }) => {
    return (
        <div
            className={`p-6 rounded-lg bg-white dark:bg-[#1f1629] border transition-all duration-200 ${isSelected ? 'border-[#7f13ec] ring-2 ring-[#7f13ec]/20 shadow-md' : 'border-slate-200 dark:border-white/5 hover:border-slate-300'}`}
            onClick={onClick}
        >
            <RichTextEditor
                content={block.content as string}
                onChange={(html) => onUpdate({ content: html })}
                readOnly={!isSelected}
                placeholder="Start typing or use the toolbar to format..."
            />
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
                <label className="block text-xs text-slate-500 mb-1.5">Rich Text Content</label>
                {/* We use the same editor here but perhaps with less padding or different class */}
                <div className="border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden bg-slate-50 dark:bg-white/5 p-2">
                    <RichTextEditor
                        content={block.content as string}
                        onChange={(html) => onUpdate({ content: html })}
                        className="text-xs min-h-[150px]"
                        forceToolbar
                    />
                </div>
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
