import { useState, useEffect, useRef } from 'react';
import { getBestSpanishVoice } from '../../../utils/ttsUtils';

export interface TextSequenceItem {
    id: string;
    text: string;
}

export interface UseTextSequenceProps {
    items: TextSequenceItem[];
    autoPlay?: boolean;
    onComplete?: () => void;
    rate?: number;
    volume?: number;
}

export const useTextSequence = ({ items, autoPlay = false, onComplete, rate = 1, volume = 1 }: UseTextSequenceProps) => {
    const [activeItemId, setActiveItemId] = useState<string | null>(null);
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const synth = window.speechSynthesis;
    const mountedRef = useRef(true);
    const isCompleteRef = useRef(false);
    const autoPlayRef = useRef(autoPlay);

    useEffect(() => {
        autoPlayRef.current = autoPlay;
    }, [autoPlay]);

    useEffect(() => {
        mountedRef.current = true;
        const loadVoices = () => {
            const voices = synth.getVoices();
            setAvailableVoices(voices);
        };

        loadVoices();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = loadVoices;
        }

        return () => {
            mountedRef.current = false;
            // Always cancel on unmount to be safe
            synth.cancel();
        };
    }, [synth]);

    useEffect(() => {
        if (autoPlay && items.length > 0) {
            playSequence(0);
        } else {
            // If autoPlay is turned off
            if (!autoPlay) {
                // IMPORTANT: Only cancel if we did NOT finish naturally.
                // If isCompleteRef is true, it means we finished the sequence and handed off control,
                // so we should NOT wipe the global queue (which likely has the next block's audio).
                if (!isCompleteRef.current && activeItemId !== null) {
                    cancel();
                    setActiveItemId(null);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay, items, rate, volume]);

    const playSequence = (startIndex: number) => {
        if (!mountedRef.current) return;

        // Reset completion status when starting
        isCompleteRef.current = false;

        // Queue all items from the start index
        const itemsToPlay = items.slice(startIndex);
        if (itemsToPlay.length === 0) return;

        synth.cancel(); // Clear anything playing

        itemsToPlay.forEach((item, i) => {
            const globalIndex = startIndex + i;
            const isLast = globalIndex === items.length - 1;

            const utterance = new SpeechSynthesisUtterance(item.text);
            const selectedVoice = getBestSpanishVoice(availableVoices);

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                utterance.lang = selectedVoice.lang;
            } else {
                utterance.lang = 'es-ES';
            }

            utterance.rate = rate;
            utterance.volume = volume;

            utterance.onstart = () => {
                if (mountedRef.current) {
                    setActiveItemId(item.id);
                }
            };

            if (isLast) {
                utterance.onend = () => {
                    if (mountedRef.current && autoPlayRef.current) {
                        isCompleteRef.current = true; // Mark as naturally finished
                        setActiveItemId(null);
                        onComplete?.();
                    }
                };
            }

            utterance.onerror = (e) => {
                // Check if error is due to cancel or interruption (expected during Pause/Stop)
                if (e.error === 'canceled' || e.error === 'interrupted') {
                    return;
                }

                console.error("TTS Error:", e);
                // If it's the last one and it errors, ensure we finish
                if (isLast && mountedRef.current) {
                    setActiveItemId(null);
                    onComplete?.();
                }
            };

            synth.speak(utterance);
        });
    };

    const cancel = () => {
        synth.cancel();
    };

    return {
        activeItemId,
        cancel
    };
};
