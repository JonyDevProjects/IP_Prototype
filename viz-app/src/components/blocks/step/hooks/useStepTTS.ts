
import { useMemo, useState, useEffect, useRef } from 'react';
import type { TimelineStep } from '../../timeline/types';
import { getBestSpanishVoice } from '../../../../utils/ttsUtils';

interface UseStepTTSProps {
    step: TimelineStep;
    stepIndex?: number; // Optional, defaults to 0
    autoPlay?: boolean;
    onComplete?: () => void;
}

export const useStepTTS = ({ step, stepIndex = 0, autoPlay = false, onComplete }: UseStepTTSProps) => {
    const [activeReadingId, setActiveReadingId] = useState<string | null>(null);
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const synth = window.speechSynthesis;
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

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
        const stepPrefix = `step-${stepIndex}`;
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
        if (step.footerTip) {
            stepItems.push({
                id: `${stepPrefix}-footer`,
                text: `Nota: ${step.footerTip}`
            });
        }

        return stepItems;
    }, [step, stepIndex]);

    // Internal Play Logic (Simplified version of TextToSpeechButton component logic but localized here for auto-sequencing)
    // NOTE: In a real distributed system, we might want to expose a start() method or rely on the TextToSpeechButton ref.
    // However, since we want to reuse the existing hook structure, we can add a simple sequencer here.

    useEffect(() => {
        if (autoPlay && ttsSteps.length > 0) {
            playSequence(0);
        }
        // Cleanup on unmount or if autoPlay stops? 
        return () => {
            if (autoPlay) cancel();
        };
    }, [autoPlay, ttsSteps]);


    const playSequence = (index: number) => {
        if (index >= ttsSteps.length) {
            setActiveReadingId(null);
            if (onComplete) onComplete();
            return;
        }

        const item = ttsSteps[index];
        setActiveReadingId(item.id);

        cancel(); // Stop current

        const utterance = new SpeechSynthesisUtterance(item.text);
        const selectedVoice = getBestSpanishVoice(availableVoices);

        if (selectedVoice) {
            utterance.voice = selectedVoice;
            utterance.lang = selectedVoice.lang;
        } else {
            utterance.lang = 'es-ES';
        }

        utterance.rate = 1.2; // Match the manual button speed

        utterance.onend = () => {
            playSequence(index + 1);
        };

        utterance.onerror = () => {
            // Skip to next if error
            playSequence(index + 1);
        };

        utteranceRef.current = utterance;
        synth.speak(utterance);
    };

    const cancel = () => {
        synth.cancel();
    };

    // TTS Handler for manual interaction override
    const handleTTSStepChange = (stepId: string | null) => {
        setActiveReadingId(stepId);
    };

    const getHighlightClass = (targetId: string) => {
        if (!activeReadingId) return "";
        return activeReadingId === targetId
            ? "ring-2 ring-indigo-400 scale-[1.01] shadow-lg z-20 bg-white dark:bg-black/20 relative transition-all duration-300"
            : "opacity-30 blur-[1px] grayscale transition-all duration-300";
    };

    return {
        ttsSteps,
        activeReadingId,
        handleTTSStepChange,
        getHighlightClass
    };
};
