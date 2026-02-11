import React, { useState, useRef } from 'react';
import type { Course } from '../../../types/course';
import { PlayerSidebar } from './PlayerSidebar';
import { PlayerBlockWrapper } from './PlayerBlockWrapper';
import { PlayerHeader } from './PlayerHeader';
import { PlayerFooter } from './PlayerFooter';
import { useUnitAudio } from '../hooks/useUnitAudio';
import { useTextSequence } from '../hooks/useTextSequence';
import { ScrollContextProvider } from '../context/ScrollContext';

interface PlayerMainProps {
    courseData: Course;
}

export const PlayerMain: React.FC<PlayerMainProps> = ({ courseData }) => {
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
    const mainScrollRef = useRef<HTMLDivElement>(null);

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

    // Navigation Handlers
    const handleNext = () => {
        if (currentUnitIndex < activeModule.units.length - 1) {
            setCurrentUnitIndex(prev => prev + 1);
        } else if (currentModuleIndex < courseData.modules.length - 1) {
            setCurrentModuleIndex(prev => prev + 1);
            setCurrentUnitIndex(0);
        }
    };

    const handlePrevious = () => {
        if (currentUnitIndex > 0) {
            setCurrentUnitIndex(prev => prev - 1);
        } else if (currentModuleIndex > 0) {
            setCurrentModuleIndex(prev => prev - 1);
            setCurrentUnitIndex(0);
        }
    };

    const hasNext = currentUnitIndex < activeModule.units.length - 1 || currentModuleIndex < courseData.modules.length - 1;
    const hasPrevious = currentUnitIndex > 0 || currentModuleIndex > 0;

    return (
        <ScrollContextProvider value={mainScrollRef as React.RefObject<HTMLElement>}>
            <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-app-bg-dark font-display text-text-main dark:text-white transition-colors duration-300">
                {/* Header */}
                <PlayerHeader
                    activeModule={activeModule}
                    courseTitle="Gestión de Proyectos"
                />

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
                    <main className="flex-1 flex flex-col min-w-0 bg-app-bg-light dark:bg-[#191022] relative overflow-hidden transition-colors duration-300">

                        {/* Progress Header */}
                        <div className="bg-white dark:bg-[#1f1629] border-b border-[#ede7f3] dark:border-white/10 px-6 py-4 lg:px-12 shadow-sm z-10 transition-colors duration-300">
                            <div className="flex flex-col gap-2 max-w-5xl mx-auto">
                                <div className="flex justify-between items-end">
                                    <p className="text-text-main dark:text-white text-sm font-bold uppercase tracking-wide">Overall Progress</p>
                                    <p className="text-brand-purple text-sm font-bold">{progressPercent}%</p>
                                </div>
                                <div className="h-2 w-full bg-[#dbcfe7] dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-purple rounded-full shadow-[0_0_10px_rgba(127,19,236,0.5)] transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Scrollable Content Area */}
                        <div
                            ref={mainScrollRef}
                            className="flex-1 overflow-y-auto p-6 lg:p-12 scroll-smooth"
                        >
                            <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-24">
                                {/* Unit Content */}
                                <div className={`flex flex-col gap-4 ${introHighlightClass}`}>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 w-fit text-brand-purple text-xs font-bold uppercase tracking-wider border border-brand-purple/20">
                                        <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span>
                                        Interactive Activity
                                    </div>
                                    <h1 className={`text-text-main dark:text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight ${activeIntroId === 'intro-title' ? 'text-brand-purple dark:text-[#a855f7]' : ''}`}>
                                        {activeUnit.title}
                                    </h1>
                                    <p className={`text-[#734c9a] dark:text-slate-300 text-lg font-normal leading-relaxed max-w-3xl ${activeIntroId === 'intro-desc' ? 'text-text-main dark:text-white font-medium' : ''}`}>
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
                                            isActiveBlock={activeBlockId === block.id}
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
                        <PlayerFooter
                            isPlaying={isPlaying}
                            hasAudio={hasAudio}
                            volume={volume}
                            rate={rate}
                            onPlayPause={isPlaying ? pause : play}
                            onStop={stop}
                            onVolumeChange={(vol) => {
                                if (isPlaying) return;
                                setVolume(vol);
                            }}
                            onRateChange={() => {
                                if (isPlaying) return; // Disable rate change during playback
                                const rates = [1, 1.25, 1.5];
                                const nextIdx = (rates.indexOf(rate) + 1) % rates.length;
                                setRate(rates[nextIdx]);
                            }}
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                            hasNext={hasNext}
                            hasPrevious={hasPrevious}
                        />

                    </main>
                </div>
            </div>
        </ScrollContextProvider>
    );
};
