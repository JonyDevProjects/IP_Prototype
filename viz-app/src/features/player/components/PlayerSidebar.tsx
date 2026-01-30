import React from 'react';
import type { Module } from '../../../types/course';

interface PlayerSidebarProps {
    modules: Module[];
    currentModuleIndex: number;
    currentUnitIndex: number;
    onNavigate: (moduleIndex: number, unitIndex: number) => void;
}

export const PlayerSidebar: React.FC<PlayerSidebarProps> = ({ modules, currentModuleIndex, currentUnitIndex, onNavigate }) => {
    const activeModule = modules[currentModuleIndex] || modules[0];

    return (
        <aside className="w-80 flex-none flex-col border-r border-[#ede7f3] dark:border-white/10 bg-white dark:bg-[#1f1629] hidden lg:flex z-10 transition-colors duration-300">
            <div className="p-6 flex flex-col gap-1 border-b border-[#ede7f3] dark:border-white/10 bg-[#faf8fc]/50 dark:bg-white/5">
                <h1 className="text-xs font-bold uppercase tracking-wider text-[#734c9a] mb-1">Current Module</h1>
                <p className="text-[#140d1b] dark:text-white font-bold text-lg">{activeModule.title}</p>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-2">
                {modules.flatMap((module, mIdx) =>
                    module.units.map((unit, uIdx) => {
                        const isActive = mIdx === currentModuleIndex && uIdx === currentUnitIndex;
                        const isCompleted = unit.isCompleted;
                        const isLocked = unit.isLocked;

                        if (isActive) {
                            return (
                                <div key={unit.id} className="flex items-center gap-3 px-3 py-4 rounded-xl bg-[#7f13ec]/5 dark:bg-[#7f13ec]/20 border border-[#7f13ec]/20 shadow-sm relative overflow-hidden group cursor-pointer"
                                    onClick={() => onNavigate(mIdx, uIdx)}>
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#7f13ec]"></div>
                                    <div className="flex-none text-[#7f13ec] bg-[#7f13ec]/10 dark:bg-[#7f13ec]/30 rounded-full p-1.5 shadow-sm">
                                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                    </div>
                                    <div>
                                        <p className="text-[#7f13ec] dark:text-white text-sm font-bold">{unit.title}</p>
                                        <p className="text-xs text-[#7f13ec]/70 dark:text-white/70">In Progress • {unit.durationMin} min</p>
                                    </div>
                                </div>
                            );
                        } else if (isCompleted) {
                            return (
                                <div key={unit.id} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#faf8fc] dark:hover:bg-white/5 transition-colors cursor-pointer group"
                                    onClick={() => onNavigate(mIdx, uIdx)}>
                                    <div className="flex-none text-green-500 bg-green-500/10 rounded-full p-1">
                                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                                    </div>
                                    <p className="text-[#140d1b] dark:text-slate-300 text-sm font-medium group-hover:text-[#7f13ec] transition-colors">{unit.title}</p>
                                </div>
                            );
                        } else {
                            return (
                                <div key={unit.id} className={`flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#faf8fc] dark:hover:bg-white/5 transition-colors cursor-pointer group ${isLocked ? 'opacity-60' : ''}`}
                                    onClick={() => !isLocked && setTimeout(() => onNavigate(mIdx, uIdx), 0)}>
                                    <div className="flex-none text-[#734c9a] bg-[#734c9a]/10 rounded-full p-1">
                                        <span className="material-symbols-outlined text-[20px]">{isLocked ? 'lock' : 'check_circle_outline'}</span>
                                    </div>
                                    <p className="text-[#734c9a] dark:text-slate-400 text-sm font-medium group-hover:text-[#7f13ec] transition-colors">{unit.title}</p>
                                </div>
                            );
                        }
                    })
                )}
            </div>
            <div className="p-4 border-t border-[#ede7f3] dark:border-white/10 bg-[#faf8fc] dark:bg-white/5 transition-colors duration-300">
                <div className="flex items-center justify-between text-xs text-[#734c9a] font-medium">
                    <span>{modules.reduce((acc, m) => acc + m.units.length, 0)} lessons total</span>
                    <span>45 mins remaining</span>
                </div>
            </div>
        </aside>
    );
};
