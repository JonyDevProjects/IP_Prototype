
import React from 'react';
import { getAllBlockDefinitions } from '../../../components/blocks/registry';
import { ToolButton } from './ToolButton';
import type { ContentBlockType } from '../../../types/course';

interface EditorToolboxProps {
    onDragStart: (e: React.DragEvent, type: ContentBlockType) => void;
    onDragEnd: () => void;
    className?: string;
    itemClassName?: string;
}

export const EditorToolbox: React.FC<EditorToolboxProps> = ({ onDragStart, onDragEnd, className, itemClassName }) => {
    return (
        <aside className={`w-16 flex flex-col items-center py-4 bg-white dark:bg-[#1f1629] border-r border-slate-200 dark:border-white/10 shrink-0 z-20 gap-4 ${className || ''}`}>
            <ToolButton icon="view_quilt" label="Layouts" />

            {/* Dynamically Render Tools from Registry */}
            {getAllBlockDefinitions().map(def => (
                <ToolButton
                    key={def.type}
                    icon={def.icon}
                    label={def.label}
                    draggable
                    onDragStart={(e) => onDragStart(e, def.type)}
                    onDragEnd={onDragEnd}
                    className={itemClassName}
                />
            ))}

            <ToolButton icon="smart_button" label="Buttons" />

            <div className="mt-auto flex flex-col gap-4">
                <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined">settings</span>
                </button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    title="Navigate Units">
                    <span className="material-symbols-outlined">menu_open</span>
                </button>
            </div>
        </aside>
    );
};
