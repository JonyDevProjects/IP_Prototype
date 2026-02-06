import React, { useState } from 'react';
import type { Course } from '../../../types/course';
import { PlayerSidebar } from './PlayerSidebar';
import { PlayerBlockWrapper } from './PlayerBlockWrapper';
import { useUnitAudio } from '../hooks/useUnitAudio';
import { useTextSequence } from '../hooks/useTextSequence';

interface PlayerMainProps {
    courseData: Course;
}

export const PlayerMain: React.FC<PlayerMainProps> = ({ courseData }) => {
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

    const activeModule = courseData.modules[currentModuleIndex] || courseData.modules[0];
    const activeUnit = activeModule?.units[currentUnitIndex] || activeModule?.units[0];

    // Global Audio Hook
    const { isPlaying, play, pause, stop, activeBlockId, nextBlock, hasAudio, rate, setRate, volume, setVolume } = useUnitAudio(activeUnit);

    // Intro TTS Sequence (Title + Description)
    const introItems = React.useMemo(() => [
        { id: 'intro-title', text: activeUnit.title },
        { id: 'intro-desc', text: activeModule.description || "Content description goes here." }
    ], [activeUnit.title, activeModule.description]);

    const { activeItemId: activeIntroId } = useTextSequence({
        items: introItems,
        autoPlay: isPlaying && activeBlockId === 'intro',
        onComplete: nextBlock,
        rate,
        volume
    });

    // Header Highlight logic
    const isIntroActive = activeBlockId === 'intro';
    const introHighlightClass = isIntroActive
        ? "ring-2 ring-indigo-400 scale-[1.01] shadow-lg sticky top-4 z-30 transition-all duration-300 bg-white dark:bg-[#1f1629] rounded-xl p-4 -m-4"
        : "transition-all duration-300";

    // Calculate simple progress
    const progressPercent = courseData.totalProgress;

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-[#191022] font-display text-[#140d1b] dark:text-white transition-colors duration-300">
            {/* Header */}
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
                    {/* Controls moved to footer */}
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
                            <div className={`flex flex-col gap-4 ${introHighlightClass}`}>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7f13ec]/10 w-fit text-[#7f13ec] text-xs font-bold uppercase tracking-wider border border-[#7f13ec]/20">
                                    <span className="w-2 h-2 rounded-full bg-[#7f13ec] animate-pulse"></span>
                                    Interactive Activity
                                </div>
                                <h1 className={`text-[#140d1b] dark:text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight ${activeIntroId === 'intro-title' ? 'text-[#7f13ec] dark:text-[#a855f7]' : ''}`}>
                                    {activeUnit.title}
                                </h1>
                                <p className={`text-[#734c9a] dark:text-slate-300 text-lg font-normal leading-relaxed max-w-3xl ${activeIntroId === 'intro-desc' ? 'text-[#140d1b] dark:text-white font-medium' : ''}`}>
                                    {activeModule.description || "Content description goes here."}
                                </p>
                            </div>

                            {/* DYNAMIC BLOCKS RENDERING */}
                            <div className="flex flex-col gap-6 mt-4">
                                {activeUnit.blocks.map(block => (
                                    <PlayerBlockWrapper
                                        key={block.id}
                                        block={block}
                                        playMode={isPlaying && activeBlockId === block.id ? 'auto' : 'manual'}
                                        onTTSComplete={activeBlockId === block.id ? nextBlock : undefined}
                                        highlightItemId={null}
                                        rate={rate}
                                        volume={volume}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Player Control Footer */}
                    <footer className="flex-none bg-white dark:bg-[#1f1629] border-t border-[#ede7f3] dark:border-white/10 px-6 py-4 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] transition-colors duration-300">
                        <div className="max-w-7xl mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-2 w-1/4">
                                <button
                                    className="transition-all rounded-full text-[#734c9a] hover:text-[#fa3e3e] hover:bg-red-50 dark:hover:bg-red-900/10 active:scale-95"
                                    onClick={stop}
                                    title="Stop and Reset"
                                    disabled={!hasAudio}
                                >
                                    <span className="material-symbols-outlined text-[40px]">stop_circle</span>
                                </button>
                                <button
                                    className={`transition-all rounded-full active:scale-95 ${isPlaying ? 'text-[#7f13ec]' : 'text-[#734c9a] hover:text-[#7f13ec] hover:bg-[#f3e8ff] dark:hover:bg-[#7f13ec]/10'}`}
                                    onClick={isPlaying ? pause : play}
                                    title={isPlaying ? "Pause" : "Play"}
                                >
                                    <span className="material-symbols-outlined text-[48px]">{isPlaying ? 'pause_circle' : 'play_circle'}</span>
                                </button>

                                {/* Volume Slider */}
                                <div className="flex items-center gap-2 group w-24">
                                    <span className="material-symbols-outlined text-xs text-[#734c9a]">volume_down</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={volume}
                                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                                        className="w-full h-1 bg-[#ede7f3] rounded-lg appearance-none cursor-pointer accent-[#7f13ec]"
                                        title={`Volume: ${Math.round(volume * 100)}%`}
                                    />
                                </div>

                                {/* Speed Toggle */}
                                <button
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f7f6f8] hover:bg-[#ede7f3] text-[#7f13ec] text-xs font-bold transition-colors"
                                    onClick={() => {
                                        const rates = [1, 1.25, 1.5];
                                        const nextIdx = (rates.indexOf(rate) + 1) % rates.length;
                                        setRate(rates[nextIdx]);
                                    }}
                                    title={`Playback Speed: ${rate}x`}
                                >
                                    {rate}x
                                </button>
                            </div>
                            <div className="flex items-center gap-4 justify-center w-2/4">
                                <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#ede7f3] dark:border-white/20 text-[#140d1b] dark:text-white font-bold text-sm hover:bg-[#faf8fc] dark:hover:bg-white/5 transition-all focus:ring-2 focus:ring-[#7f13ec]/20"
                                    onClick={() => {
                                        if (currentUnitIndex > 0) setCurrentUnitIndex(prev => prev - 1);
                                        else if (currentModuleIndex > 0) {
                                            setCurrentModuleIndex(prev => prev - 1);
                                            setCurrentUnitIndex(0);
                                        }
                                    }}>
                                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                                    <span className="hidden sm:inline">Previous</span>
                                </button>
                                <button className="flex items-center gap-2 px-8 py-3 rounded-lg bg-[#7f13ec] text-white font-bold text-sm hover:bg-[#690fc4] shadow-lg shadow-[#7f13ec]/30 transition-all hover:translate-y-[-2px] active:translate-y-[0px] focus:ring-2 focus:ring-offset-2 focus:ring-[#7f13ec]"
                                    onClick={() => {
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
