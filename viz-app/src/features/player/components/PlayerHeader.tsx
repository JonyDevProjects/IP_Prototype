import React from 'react';
import type { Module } from '../../../types/course';

interface PlayerHeaderProps {
    courseTitle?: string;
    activeModule: Module;
}

export const PlayerHeader: React.FC<PlayerHeaderProps> = ({
    courseTitle = "Gestión de Proyectos",
    activeModule
}) => {
    return (
        <header className="flex-none flex items-center justify-between whitespace-nowrap border-b border-solid border-[#ede7f3] dark:border-white/10 px-6 py-3 bg-white dark:bg-[#1f1629] z-20 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-4">
                <div className="size-9 flex items-center justify-center rounded-lg bg-brand-purple text-white shadow-md shadow-brand-purple/30">
                    <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                    <h2 className="text-text-main dark:text-white text-lg font-extrabold leading-tight tracking-tight">{courseTitle}</h2>
                    <p className="text-xs text-[#734c9a] dark:text-slate-400 font-medium">{activeModule.title}</p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                {/* Controls moved to footer */}
            </div>
        </header>
    );
};
