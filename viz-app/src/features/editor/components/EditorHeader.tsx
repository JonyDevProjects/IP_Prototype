
import React from 'react';

interface EditorHeaderProps {
    title: string;
    onPublish: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({ title, onPublish }) => {
    return (
        <header className="flex-none h-14 bg-white dark:bg-[#1f1629] border-b border-slate-200 dark:border-white/10 px-4 flex items-center justify-between z-10 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider">Editing:</span>
                    <span className="font-bold text-sm truncate max-w-[200px]">{title}</span>
                </div>
                <div className="flex bg-slate-100 dark:bg-white/5 rounded-lg p-0.5 opacity-50 cursor-not-allowed" title="Coming soon">
                    <button className="px-2 py-0.5 rounded text-xs font-bold bg-white dark:bg-white/10 shadow-sm text-slate-800 dark:text-white pointer-events-none">Editor</button>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onPublish}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#7f13ec] text-white text-sm font-bold rounded-lg shadow-lg shadow-[#7f13ec]/30 hover:bg-[#690fc4] transition-all"
                >
                    <span className="material-symbols-outlined text-sm">save</span>
                    Publish Changes
                </button>
            </div>
        </header>
    );
};
