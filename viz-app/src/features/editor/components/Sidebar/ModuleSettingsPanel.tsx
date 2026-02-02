import React from 'react';
import type { Module } from '../../../../types/course';

interface ModuleSettingsPanelProps {
    module: Module;
    onUpdate: (updates: Partial<Module>) => void;
    onDelete: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onBack: () => void;
    isFirst: boolean;
    isLast: boolean;
}

export const ModuleSettingsPanel: React.FC<ModuleSettingsPanelProps> = ({
    module,
    onUpdate,
    onDelete,
    onMoveUp,
    onMoveDown,
    onBack,
    isFirst,
    isLast
}) => {
    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#1f1629]">
            {/* Header */}
            <div className="flex items-center gap-2 p-4 border-b border-slate-200 dark:border-white/10">
                <button
                    onClick={onBack}
                    className="p-1 -ml-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">Module Settings</h3>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">

                {/* General Settings */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                        <input
                            type="text"
                            value={module.title}
                            onChange={(e) => onUpdate({ title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:border-[#7f13ec] outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                        <textarea
                            value={module.description || ''}
                            onChange={(e) => onUpdate({ description: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:border-[#7f13ec] outline-none resize-none"
                        />
                    </div>
                </div>

                {/* Reordering */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Reorder</label>
                    <div className="flex gap-2">
                        <button
                            onClick={onMoveUp}
                            disabled={isFirst}
                            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_upward</span>
                            <span className="text-xs font-medium">Move Up</span>
                        </button>
                        <button
                            onClick={onMoveDown}
                            disabled={isLast}
                            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_downward</span>
                            <span className="text-xs font-medium">Move Down</span>
                        </button>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                    <label className="block text-xs font-bold text-red-500 uppercase tracking-wider mb-3">Danger Zone</label>
                    <button
                        onClick={onDelete}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <span className="material-symbols-outlined text-lg">delete</span>
                        Delete Module
                    </button>
                </div>

            </div>
        </div>
    );
};
