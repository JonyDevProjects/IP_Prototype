import { useMemo, useState, useEffect, useRef } from 'react';
import type { ContentBlock } from '../../../../types/course';
import { getBestSpanishVoice } from '../../../../utils/ttsUtils';

interface UseCarouselTTSProps {
    blocks: ContentBlock[]; // Blocks of the active slide
    autoPlay?: boolean;
    isActive?: boolean;
    onComplete?: () => void;
    rate?: number;
    volume?: number;
}

export const useCarouselTTS = ({ blocks, autoPlay = false, isActive = false, onComplete, rate = 1, volume = 1 }: UseCarouselTTSProps) => {
    const [activeReadingId, setActiveReadingId] = useState<string | null>(null);
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const synth = window.speechSynthesis;
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const currentIndexRef = useRef(0);
    const mountedRef = useRef(true);
    const autoPlayRef = useRef(autoPlay);

    useEffect(() => {
        autoPlayRef.current = autoPlay;
    }, [autoPlay]);

    // Reset state when block is no longer active
    useEffect(() => {
        if (!isActive) {
            currentIndexRef.current = 0;
            setActiveReadingId(null);
            cancel();
        }
    }, [isActive]);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
            cancel();
        };
    }, []);

    useEffect(() => {
        const loadVoices = () => {
            const voices = synth.getVoices();
            setAvailableVoices(voices);
        };

        loadVoices();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = loadVoices;
        }
    }, [synth]);

    // Generate TTS Sequence from blocks
    const ttsSteps = useMemo(() => {
        const steps: { id: string; text: string }[] = [];

        blocks.forEach(block => {
            if (block.type === 'text' && typeof block.content === 'string') {
                // Extract plain text from HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = block.content;
                const text = tempDiv.textContent || tempDiv.innerText || '';
                if (text.trim()) {
                    steps.push({ id: block.id, text: text.trim() });
                }
            }
            // Add other block types if needed (e.g. Image alt text?)
        });

        return steps;
    }, [blocks]);

    // Reset current index when steps change (e.g. slide change)
    useEffect(() => {
        currentIndexRef.current = 0;
    }, [ttsSteps]);

    useEffect(() => {
        if (autoPlay && isActive && ttsSteps.length > 0) {
            const startIndex = currentIndexRef.current;
            if (startIndex >= ttsSteps.length) {
                currentIndexRef.current = 0;
                playSequence(0);
            } else {
                playSequence(startIndex);
            }
        } else {
            cancel();
        }

        return () => {
            // Don't cancel here strictly if we want seamless transitions, but mostly yes.
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay, isActive, ttsSteps, rate, volume]);

    const playSequence = (index: number) => {
        if (!mountedRef.current) return;

        if (index >= ttsSteps.length) {
            setActiveReadingId(null);
            currentIndexRef.current = 0;
            if (onComplete) onComplete();
            return;
        }

        currentIndexRef.current = index;
        const item = ttsSteps[index];
        setActiveReadingId(item.id);

        cancel();

        // Create utterance
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

        utterance.onend = () => {
            if (mountedRef.current && autoPlayRef.current && isActive) {
                playSequence(index + 1);
            }
        };

        utterance.onerror = (e) => {
            if (e.error === 'canceled' || e.error === 'interrupted') return;
            console.warn("Carousel TTS Error:", e);
            if (mountedRef.current) {
                playSequence(index + 1);
            }
        };

        utteranceRef.current = utterance;
        synth.speak(utterance);
    };

    const cancel = () => {
        synth.cancel();
    };

    return {
        activeReadingId
    };
};
