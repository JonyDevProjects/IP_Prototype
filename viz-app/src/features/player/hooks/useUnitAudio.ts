import { useState, useEffect, useCallback } from 'react';
import type { Unit } from '../../../types/course';

export const useUnitAudio = (unit: Unit | null) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [rate, setRate] = useState(1);
    const [volume, setVolume] = useState(1);

    // Reset when unit changes and cleanup on unmount
    useEffect(() => {
        setIsPlaying(false);
        setActiveBlockId(null);
        setCurrentIndex(-1);
        window.speechSynthesis.cancel();

        return () => {
            window.speechSynthesis.cancel();
        };
    }, [unit?.id]);

    // We prepend a virtual 'intro' block to the sequence so the Player can read Title/Description first
    const sequence: string[] = ['intro', ...(unit?.blocks.filter(b => b.ttsEnabled !== false).map(b => b.id) || [])];

    const play = () => {
        setIsPlaying(true);
        if (currentIndex === -1 && sequence.length > 0) {
            setCurrentIndex(0);
            setActiveBlockId(sequence[0]);
        } else if (currentIndex >= 0 && currentIndex < sequence.length) {
            // Resume current
            setActiveBlockId(sequence[currentIndex]);
        }
    };

    const pause = () => {
        setIsPlaying(false);
        // We pause by simply clearing the active block
        window.speechSynthesis.cancel(); // Hard stop for now
    };

    const stop = () => {
        setIsPlaying(false);
        setActiveBlockId(null);
        setCurrentIndex(-1);
        window.speechSynthesis.cancel();
    };

    const nextBlock = useCallback(() => {
        if (!isPlaying) return;

        const nextIndex = currentIndex + 1;
        if (nextIndex < sequence.length) {
            setCurrentIndex(nextIndex);
            setActiveBlockId(sequence[nextIndex]);
        } else {
            // End of unit
            setIsPlaying(false);
            setActiveBlockId(null);
            setCurrentIndex(-1);
        }
    }, [currentIndex, sequence, isPlaying]);

    return {
        isPlaying,
        play,
        pause,
        stop,
        activeBlockId,
        nextBlock,
        hasAudio: sequence.length > 0, // Any blocks OR just title/desc counts as audio
        rate,
        setRate,
        volume,
        setVolume
    };
};
