import React from 'react';
import type { ContentBlock } from '../../types/course';
import type { BlockDefinition } from './types';
import { PropertySection } from '../ui/PropertySection';

const ImageComponent: React.FC<{
    block: ContentBlock;
    isSelected: boolean;
    onClick: (e: React.MouseEvent) => void;
}> = ({ block, isSelected, onClick }) => {
    const src = typeof block.content === 'object' && block.content !== null
        ? (block.content as { src: string }).src
        : block.content as string;
    return (
        <div
            className={`rounded-lg overflow-hidden border transition-all duration-200 ${isSelected ? 'border-[#7f13ec] ring-2 ring-[#7f13ec]/20 shadow-md' : 'border-transparent hover:border-slate-300'}`}
            onClick={onClick}
        >
            {src ? (
                <img src={src} alt="Block" className="w-full h-auto" />
            ) : (
                <div className="h-40 bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined text-4xl">image</span>
                </div>
            )}
        </div>
    );
};

const ImageProperties: React.FC<{
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
}> = ({ block, onUpdate }) => {
    return (
        <PropertySection title="Content" isOpen>
            <div className="space-y-3">
                <div>
                    <label className="block text-xs text-slate-500 mb-1.5">Image URL</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none"
                        value={typeof block.content === 'object' && block.content !== null ? (block.content as { src: string }).src : block.content}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            if (typeof block.content === 'object' && block.content !== null) {
                                onUpdate({ content: { ...block.content, src: newValue } });
                            } else {
                                onUpdate({ content: newValue });
                            }
                        }}
                        placeholder="https://..."
                    />
                </div>
                <div className="p-4 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-lg flex flex-col items-center justify-center text-slate-400 gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                    <span className="text-xs">Upload Image</span>
                </div>
            </div>
        </PropertySection>
    );
};

export const ImageBlockDefinition: BlockDefinition = {
    type: 'image',
    label: 'Media',
    icon: 'image',
    createBlock: (id) => ({
        id,
        type: 'image',
        content: ''
    }),
    Component: ImageComponent,
    Properties: ImageProperties
};
