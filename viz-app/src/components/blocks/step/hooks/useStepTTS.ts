import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import type { TimelineStep } from '../../timeline/types';
import { getBestSpanishVoice } from '../../../../utils/ttsUtils';

interface UseStepTTSProps {
    step: TimelineStep;
    stepIndex?: number; // Legacy
    stepId?: string; // New unique ID
    autoPlay?: boolean;
    isActive?: boolean; // New prop to track
    onComplete?: () => void;
    rate?: number;
    volume?: number;
}

export const useStepTTS = ({ step, stepIndex = 0, stepId, autoPlay = false, isActive = false, onComplete, rate = 1, volume = 1 }: UseStepTTSProps) => {
    const [activeReadingId, setActiveReadingId] = useState<string | null>(null);
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const synth = window.speechSynthesis;
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const currentIndexRef = useRef(0);
    const lastCharIndexRef = useRef(0);
    const mountedRef = useRef(true);
    const autoPlayRef = useRef(autoPlay);

    useEffect(() => {
        autoPlayRef.current = autoPlay;
    }, [autoPlay]);

    // Reset state when block is no longer active (Stopped or switched away)
    useEffect(() => {
        if (!isActive) {
            currentIndexRef.current = 0;
            lastCharIndexRef.current = 0;
            setActiveReadingId(null);
            cancel();
        }
    }, [isActive]);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
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

    // Generate TTS Steps for a single step
    const ttsSteps = useMemo(() => {
        const stepPrefix = stepId || `step-${stepIndex}`;
        const stepItems = [];

        // Title & Subtitle logic
        const titleText = step.detailTitle || step.title;
        if (titleText) {
            stepItems.push({
                id: `${stepPrefix}-title`,
                text: titleText
            });
        }

        if (step.detailSubtitle) {
            stepItems.push({
                id: `${stepPrefix}-subtitle`,
                text: step.detailSubtitle
            });
        }

        // Cards
        (step.cards || []).forEach((card, cardIndex) => {
            if (card.title || card.text) {
                stepItems.push({
                    id: `${stepPrefix}-card-${cardIndex}`,
                    text: `${card.title}. ${card.text}`
                });
            }
        });

        // Footer
        if (step.footerTip && step.footerTip.trim().length > 0) {
            stepItems.push({
                id: `${stepPrefix}-footer`,
                text: `Nota: ${step.footerTip}`
            });
        }

        return stepItems;
    }, [step, stepIndex, stepId]);

    // Internal Play Logic (Simplified version of TextToSpeechButton component logic but localized here for auto-sequencing)
    // NOTE: In a real distributed system, we might want to expose a start() method or rely on the TextToSpeechButton ref.
    // However, since we want to reuse the existing hook structure, we can add a simple sequencer here.

    useEffect(() => {
        if (autoPlay && ttsSteps.length > 0) {
            // Check if we are resuming
            const startIndex = currentIndexRef.current;
            const startOffset = lastCharIndexRef.current;

            // If we are already past the end, reset?
            if (startIndex >= ttsSteps.length) {
                currentIndexRef.current = 0;
                lastCharIndexRef.current = 0;
                playSequence(0, 0);
            } else {
                playSequence(startIndex, startOffset);
            }
        } else {
            cancel();
        }
        // Cleanup on unmount or if autoPlay stops? 
        return () => {
            if (autoPlay) cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay, ttsSteps, rate, volume]);


    const playSequence = (index: number, charOffset = 0) => {
        if (!mountedRef.current) return;

        if (index >= ttsSteps.length) {
            setActiveReadingId(null);
            currentIndexRef.current = 0; // Reset for next time
            lastCharIndexRef.current = 0;
            if (onComplete) onComplete();
            return;
        }

        currentIndexRef.current = index;
        const item = ttsSteps[index];
        setActiveReadingId(item.id);

        cancel(); // Stop current

        const plainText = item.text;
        const textSegment = plainText.slice(charOffset);

        const utterance = new SpeechSynthesisUtterance(textSegment);
        const selectedVoice = getBestSpanishVoice(availableVoices);

        if (selectedVoice) {
            utterance.voice = selectedVoice;
            utterance.lang = selectedVoice.lang;
        } else {
            utterance.lang = 'es-ES';
        }

        utterance.rate = rate;
        utterance.volume = volume;

        utterance.onboundary = (e) => {
            if (e.name === 'word' || e.name === 'sentence') {
                lastCharIndexRef.current = charOffset + e.charIndex;
            }
        };

        utterance.onend = () => {
            if (mountedRef.current && autoPlayRef.current) {
                lastCharIndexRef.current = 0; // Reset char index for NEXT item
                playSequence(index + 1, 0);
            }
        };

        utterance.onerror = (e) => {
            // Check if error is due to cancel or interruption, which is expected during Pause/Stop
            if (e.error === 'canceled' || e.error === 'interrupted') {
                return;
            }

            // Skip to next if genuine error
            if (mountedRef.current) {
                console.warn("TTS Error, skipping to next:", e);
                playSequence(index + 1, 0);
            }
        };

        utteranceRef.current = utterance;
        synth.speak(utterance);
    };

    const cancel = useCallback(() => {
        synth.cancel();
    }, [synth]);

    // Reset state when block is no longer active (Stopped or switched away)
    useEffect(() => {
        if (!isActive) {
            currentIndexRef.current = 0;
            lastCharIndexRef.current = 0;
            setActiveReadingId(null);
            cancel();
        }
    }, [isActive, cancel]);

    // ... (rest of the file)


    const getHighlightClass = (targetId: string) => {
        if (!activeReadingId) return "";
        return activeReadingId === targetId
            ? "ring-2 ring-indigo-400 scale-[1.01] shadow-lg z-20 bg-white dark:bg-black/20 relative transition-all duration-300"
            : "opacity-30 blur-[1px] grayscale transition-all duration-300";
    };

    return {
        ttsSteps,
        activeReadingId,
        getHighlightClass
    };
};
