import React, { useState } from 'react';
import type { Course } from '../../../types/course';
import { PlayerSidebar } from './PlayerSidebar';
import { PlayerBlockWrapper } from './PlayerBlockWrapper';

interface PlayerMainProps {
    courseData: Course;
}

export const PlayerMain: React.FC<PlayerMainProps> = ({ courseData }) => {
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

    const activeModule = courseData.modules[currentModuleIndex] || courseData.modules[0];
    const activeUnit = activeModule?.units[currentUnitIndex] || activeModule?.units[0];

    // Calculate simple progress
    const progressPercent = courseData.totalProgress;

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-[#191022] font-display text-[#140d1b] dark:text-white transition-colors duration-300">

            {/* Top Navigation */}
            <header className="flex-none flex items-center justify-between whitespace-nowrap border-b border-solid border-[#ede7f3] dark:border-white/10 px-6 py-3 bg-white dark:bg-[#1f1629] z-20 shadow-sm transition-colors duration-300">
                <div className="flex items-center gap-4">
                    <div className="size-9 flex items-center justify-center rounded-lg bg-[#7f13ec] text-white shadow-md shadow-[#7f13ec]/30">
                        <span className="material-symbols-outlined">school</span>
                    </div>
                    <div>
                        <h2 className="text-[#140d1b] dark:text-white text-lg font-extrabold leading-tight tracking-tight">Gestión de Proyectos</h2>
                        <p className="text-xs text-[#734c9a] dark:text-slate-400 font-medium">{activeModule.title}</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <button className="hidden md:flex items-center gap-2 cursor-pointer text-[#734c9a] hover:text-[#7f13ec] transition-colors text-sm font-bold bg-[#faf8fc] dark:bg-white/5 px-4 py-2 rounded-full border border-transparent hover:border-[#7f13ec]/20">
                        <span className="material-symbols-outlined text-[20px]">dashboard</span>
                        <span>Dashboard</span>
                    </button>
                    <div className="h-8 w-[1px] bg-[#ede7f3] dark:bg-white/10 hidden sm:block"></div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-[#140d1b] dark:text-white">Isabella R.</p>
                            <p className="text-xs text-[#734c9a]">Student</p>
                        </div>
                        <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-white dark:ring-white/10 shadow-sm cursor-pointer hover:ring-[#7f13ec] transition-all"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuALvUAPmhpc5dDM5KTToFh_AGCB7-L7sFB26VUIqi4lOMfiBl2MXNHLKJ4ZFb-QXOAj4yypaaLbBWDaCPJcMwLtjoKdkn-PZwmskAaS-3tM-OubW5OgTEhlmB2gb21YS3Ay9f11vRYBcAnrnnt7g0EZ6xuSysFOUsOcMfSVtK13ySKmEkSXh3mW5v3uAK2yajxmIScwD1q3-88MznTqntUzS5BWsYdxF8NJLQTXCEdnEiWAIkSVENy6NMvuZonV-hZkoC1TbNOrKF22")' }}>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar */}
                <PlayerSidebar
                    modules={courseData.modules}
                    currentModuleIndex={currentModuleIndex}
                    currentUnitIndex={currentUnitIndex}
                    onNavigate={(mIdx, uIdx) => { setCurrentModuleIndex(mIdx); setCurrentUnitIndex(uIdx); }}
                />

                {/* Main Content Stage */}
                <main className="flex-1 flex flex-col min-w-0 bg-[#f7f6f8] dark:bg-[#191022] relative overflow-hidden transition-colors duration-300">

                    {/* Progress Header */}
                    <div className="bg-white dark:bg-[#1f1629] border-b border-[#ede7f3] dark:border-white/10 px-6 py-4 lg:px-12 shadow-sm z-10 transition-colors duration-300">
                        <div className="flex flex-col gap-2 max-w-5xl mx-auto">
                            <div className="flex justify-between items-end">
                                <p className="text-[#140d1b] dark:text-white text-sm font-bold uppercase tracking-wide">Overall Progress</p>
                                <p className="text-[#7f13ec] text-sm font-bold">{progressPercent}%</p>
                            </div>
                            <div className="h-2 w-full bg-[#dbcfe7] dark:bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-[#7f13ec] rounded-full shadow-[0_0_10px_rgba(127,19,236,0.5)] transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto p-6 lg:p-12 scroll-smooth">
                        <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-24">
                            {/* Unit Content */}
                            <div className="flex flex-col gap-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7f13ec]/10 w-fit text-[#7f13ec] text-xs font-bold uppercase tracking-wider border border-[#7f13ec]/20">
                                    <span className="w-2 h-2 rounded-full bg-[#7f13ec] animate-pulse"></span>
                                    Interactive Activity
                                </div>
                                <h1 className="text-[#140d1b] dark:text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">{activeUnit.title}</h1>
                                <p className="text-[#734c9a] dark:text-slate-300 text-lg font-normal leading-relaxed max-w-3xl">
                                    {/* Description now correctly pulls from the module description to match Editor */}
                                    {activeModule.description || "Content description goes here."}
                                </p>
                            </div>

                            {/* DYNAMIC BLOCKS RENDERING */}
                            <div className="flex flex-col gap-6 mt-4">
                                {activeUnit.blocks.map(block => (
                                    <PlayerBlockWrapper key={block.id} block={block} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Player Control Footer */}
                    <footer className="flex-none bg-white dark:bg-[#1f1629] border-t border-[#ede7f3] dark:border-white/10 px-6 py-4 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] transition-colors duration-300">
                        <div className="max-w-7xl mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-4 w-1/4">
                                <button className="text-[#734c9a] hover:text-[#7f13ec] transition-colors p-2 rounded-full hover:bg-[#f7f6f8] dark:hover:bg-white/5">
                                    <span className="material-symbols-outlined">volume_up</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-4 justify-center w-2/4">
                                <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#ede7f3] dark:border-white/20 text-[#140d1b] dark:text-white font-bold text-sm hover:bg-[#faf8fc] dark:hover:bg-white/5 transition-all focus:ring-2 focus:ring-[#7f13ec]/20"
                                    onClick={() => {
                                        // Previous Logic
                                        if (currentUnitIndex > 0) setCurrentUnitIndex(prev => prev - 1);
                                        else if (currentModuleIndex > 0) {
                                            setCurrentModuleIndex(prev => prev - 1);
                                            // Set to last unit of previous module - simpler for now just 0
                                            setCurrentUnitIndex(0);
                                        }
                                    }}>
                                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                                    <span className="hidden sm:inline">Previous</span>
                                </button>
                                <button className="flex items-center gap-2 px-8 py-3 rounded-lg bg-[#7f13ec] text-white font-bold text-sm hover:bg-[#690fc4] shadow-lg shadow-[#7f13ec]/30 transition-all hover:translate-y-[-2px] active:translate-y-[0px] focus:ring-2 focus:ring-offset-2 focus:ring-[#7f13ec]"
                                    onClick={() => {
                                        // Next Logic
                                        if (currentUnitIndex < activeModule.units.length - 1) setCurrentUnitIndex(prev => prev + 1);
                                        else if (currentModuleIndex < courseData.modules.length - 1) {
                                            setCurrentModuleIndex(prev => prev + 1);
                                            setCurrentUnitIndex(0);
                                        }
                                    }}>
                                    <span className="hidden sm:inline">Next Lesson</span>
                                    <span className="sm:hidden">Next</span>
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </button>
                            </div>
                            <div className="flex items-center justify-end gap-2 w-1/4">
                                <button className="text-[#734c9a] hover:text-[#7f13ec] transition-colors p-2 rounded-full hover:bg-[#f7f6f8] dark:hover:bg-white/5" title="Full Screen">
                                    <span className="material-symbols-outlined">fullscreen</span>
                                </button>
                            </div>
                        </div>
                    </footer>

                </main>
            </div>
        </div>
    );
};
