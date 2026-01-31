import React from 'react';
import type { ContentBlock } from '../../../types/course';

interface EditorBlockWrapperProps {
    block: ContentBlock;
    isSelected: boolean;
    onClick: (e: React.MouseEvent) => void;
    onDelete?: () => void;
    onDragStart?: (e: React.DragEvent) => void;
    children: React.ReactNode;
}

export const EditorBlockWrapper = ({ block, isSelected, onClick, onDelete, onDragStart, children }: EditorBlockWrapperProps) => {
    return (
        <div
            className={`relative group rounded-xl transition-all duration-200 ${isSelected
                ? 'ring-2 ring-[#7f13ec] ring-offset-4 ring-offset-slate-50 dark:ring-offset-[#150a1f] z-10'
                : 'hover:ring-1 hover:ring-slate-300 dark:hover:ring-white/20'
                }`}
            onClick={onClick}
        >
            {/* --- Premium Contextual Toolbar --- */}
            <div className={`absolute -top-12 right-0 flex items-center gap-1 p-1 rounded-full bg-white/90 dark:bg-[#2d2235]/90 backdrop-blur-md shadow-xl border border-slate-200 dark:border-white/10 transition-all duration-200 origin-bottom ${isSelected || 'group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0'} z-50`}>

                {/* Drag Handle */}
                <div
                    className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 cursor-grab hover:text-slate-600 dark:hover:text-slate-200 active:cursor-grabbing"
                    draggable={!!onDragStart}
                    onDragStart={(e) => {
                        e.stopPropagation();
                        if (onDragStart) onDragStart(e);
                    }}
                >
                    <span className="material-symbols-outlined text-lg">drag_indicator</span>
                </div>

                <div className="w-px h-4 bg-slate-200 dark:bg-white/10 mx-0.5"></div>

                {/* Settings / Select */}
                <button
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isSelected
                        ? 'bg-[#7f13ec]/10 text-[#7f13ec]'
                        : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick(e);
                    }}
                    title="Settings"
                >
                    <span className="material-symbols-outlined text-[18px]">settings</span>
                </button>

                {/* Delete */}
                {onDelete && (
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        title="Delete Block"
                    >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                )}
            </div>

            {/* Content Container */}
            <div className="relative">
                {children}
            </div>

            {/* Active Label Badge (Optional, kept for clarity if needed, or removed for cleaner look) */}
            {isSelected && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-0">
                    {/* Hidden for cleaner UI as requested by 'Maestro' */}
                </div>
            )}
        </div>
    );
};
