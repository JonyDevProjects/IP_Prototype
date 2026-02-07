import React from 'react';

interface PlayerFooterProps {
    isPlaying: boolean;
    hasAudio: boolean;
    volume: number;
    rate: number;
    onPlayPause: () => void;
    onStop: () => void;
    onVolumeChange: (vol: number) => void;
    onRateChange: () => void;
    onNext: () => void;
    onPrevious: () => void;
    hasPrevious: boolean;
    hasNext: boolean;
}

export const PlayerFooter: React.FC<PlayerFooterProps> = ({
    isPlaying,
    hasAudio,
    volume,
    rate,
    onPlayPause,
    onStop,
    onVolumeChange,
    onRateChange,
    onNext,
    onPrevious,
    hasPrevious = true,
    hasNext = true
}) => {
    return (
        <footer className="flex-none bg-white dark:bg-[#1f1629] border-t border-[#ede7f3] dark:border-white/10 px-6 py-4 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2 w-1/4">
                    <button
                        className="transition-all rounded-full text-[#734c9a] hover:text-[#fa3e3e] hover:bg-red-50 dark:hover:bg-red-900/10 active:scale-95"
                        onClick={onStop}
                        title="Stop and Reset"
                        disabled={!hasAudio}
                    >
                        <span className="material-symbols-outlined text-[40px]">stop_circle</span>
                    </button>
                    <button
                        className={`transition-all rounded-full active:scale-95 ${isPlaying ? 'text-brand-purple' : 'text-[#734c9a] hover:text-brand-purple hover:bg-[#f3e8ff] dark:hover:bg-brand-purple/10'}`}
                        onClick={onPlayPause}
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
                            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                            className={`w-full h-1 bg-[#ede7f3] rounded-lg appearance-none accent-brand-purple ${isPlaying ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            title={isPlaying ? "Pause to change volume" : `Volume: ${Math.round(volume * 100)}%`}
                            disabled={isPlaying}
                        />
                    </div>

                    {/* Speed Toggle */}
                    <button
                        className={`flex items-center justify-center w-8 h-8 rounded-full bg-app-bg-light text-brand-purple text-xs font-bold transition-colors ${isPlaying
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-[#ede7f3]'
                            }`}
                        onClick={onRateChange}
                        title={isPlaying ? "Pause to change speed" : `Playback Speed: ${rate}x`}
                        disabled={isPlaying}
                    >
                        {rate}x
                    </button>
                </div>
                <div className="flex items-center gap-4 justify-center w-2/4">
                    <button
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg border border-[#ede7f3] dark:border-white/20 text-text-main dark:text-white font-bold text-sm hover:bg-[#faf8fc] dark:hover:bg-white/5 transition-all focus:ring-2 focus:ring-brand-purple/20 ${!hasPrevious ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={onPrevious}
                        disabled={!hasPrevious}
                    >
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        <span className="hidden sm:inline">Previous</span>
                    </button>
                    <button
                        className={`flex items-center gap-2 px-8 py-3 rounded-lg bg-brand-purple text-white font-bold text-sm hover:bg-[#690fc4] shadow-lg shadow-brand-purple/30 transition-all hover:translate-y-[-2px] active:translate-y-[0px] focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple ${!hasNext ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={onNext}
                        disabled={!hasNext}
                    >
                        <span className="hidden sm:inline">Next Lesson</span>
                        <span className="sm:hidden">Next</span>
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                </div>
                <div className="flex items-center justify-end gap-2 w-1/4">
                    <button className="text-[#734c9a] hover:text-brand-purple transition-colors p-2 rounded-full hover:bg-app-bg-light dark:hover:bg-white/5" title="Full Screen">
                        <span className="material-symbols-outlined">fullscreen</span>
                    </button>
                </div>
            </div>
        </footer>
    );
};
