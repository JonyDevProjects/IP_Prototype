import React, { useState, useEffect, useRef } from 'react';
import Volume2 from 'lucide-react/dist/esm/icons/volume-2';
import Square from 'lucide-react/dist/esm/icons/square';
import { getBestSpanishVoice } from '../../utils/ttsUtils';

interface TTSStep {
    id: string;
    text: string;
}

interface TextToSpeechProps {
    text?: string;
    steps?: TTSStep[];
    className?: string;
    preload?: boolean; // Not used but kept for compat
    autoPlay?: boolean;
    rate?: number;
    onPlayStateChange?: (isPlaying: boolean) => void;
    onStepChange?: (stepId: string | null) => void;
    playLabel?: string;
    stopLabel?: string;
}

const TextToSpeechButton: React.FC<TextToSpeechProps> = ({
    text,
    steps,
    className = '',
    autoPlay = false,
    rate = 1.2,
    playLabel = 'Escuchar Lección',
    stopLabel = 'Detener',
    onPlayStateChange,
    onStepChange
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        if (!('speechSynthesis' in window)) {
            setIsSupported(false);
            return;
        }

        // Load voices
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (mountedRef.current) {
                setAvailableVoices(voices);
            }
        };

        loadVoices();

        // Chrome loads async, so listener is needed
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            mountedRef.current = false;
            stopAll();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Notify parent of state changes
    useEffect(() => {
        onPlayStateChange?.(isPlaying);
    }, [isPlaying, onPlayStateChange]);

    const stopAll = () => {
        window.speechSynthesis.cancel();
        if (mountedRef.current) {
            setIsPlaying(false);
            onStepChange?.(null);
        }
    };

    const handlePlay = () => {
        if (isPlaying) {
            stopAll();
            return;
        }

        setIsPlaying(true);
        window.speechSynthesis.cancel(); // Safety clear

        const selectedVoice = getBestSpanishVoice(availableVoices);

        if (steps && steps.length > 0) {
            // Sequence Mode
            steps.forEach((step, index) => {
                const utterance = new SpeechSynthesisUtterance(step.text);

                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                    utterance.lang = selectedVoice.lang;
                } else {
                    utterance.lang = 'es-ES';
                }

                utterance.rate = rate;

                // Event: Start of this specific step
                utterance.onstart = () => {
                    if (mountedRef.current) {
                        onStepChange?.(step.id);
                    }
                };

                // Event: End of sequence?
                if (index === steps.length - 1) {
                    utterance.onend = () => {
                        if (mountedRef.current) {
                            setIsPlaying(false);
                            onStepChange?.(null);
                        }
                    };
                }

                utterance.onerror = (e) => {
                    console.error("TTS Error:", e);
                    if (mountedRef.current) stopAll();
                };

                window.speechSynthesis.speak(utterance);
            });
        } else if (text) {
            // Single Text Mode
            const utterance = new SpeechSynthesisUtterance(text);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
                utterance.lang = selectedVoice.lang;
            } else {
                utterance.lang = 'es-ES';
            }
            utterance.rate = rate;

            utterance.onend = () => {
                if (mountedRef.current) setIsPlaying(false);
            };

            utterance.onerror = () => {
                if (mountedRef.current) stopAll();
            };

            window.speechSynthesis.speak(utterance);
        }
    };

    // Auto-play Logic
    useEffect(() => {
        if (autoPlay && isSupported && !isPlaying && mountedRef.current) {
            const timer = setTimeout(() => {
                handlePlay();
            }, 500); // Small delay to allow UI to settle
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay, isSupported, availableVoices]);

    if (!isSupported) return null;

    return (
        <button
            onClick={handlePlay}
            className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-bold shadow-sm
                ${isPlaying
                    ? 'bg-red-100 text-red-600 border-red-200 animate-pulse'
                    : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100'
                } 
                ${className}
            `}
        >
            {isPlaying ? (
                <Square size={14} className="fill-current" />
            ) : (
                <Volume2 size={14} />
            )}
            <span>{isPlaying ? stopLabel : playLabel}</span>
        </button>
    );
};

export default TextToSpeechButton;
