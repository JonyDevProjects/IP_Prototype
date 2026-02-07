import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useStepTTS } from '../useStepTTS';
import type { TimelineStep } from '../../../timeline/types';

describe('useStepTTS', () => {
    const mockStep: TimelineStep = {
        title: 'Step Title',
        icon: 'test-icon',
        theme: 'blue',
        cards: [
            { title: 'Card 1', text: 'Card Text 1', icon: 'card-icon' }
        ],
        footerTip: 'Footer Tip'
    };

    const mockSpeak = vi.fn();
    const mockCancel = vi.fn();
    const mockGetVoices = vi.fn().mockReturnValue([
        { lang: 'es-ES', name: 'Spanish Voice', default: true, localService: true, voiceURI: 'es-ES' }
    ]);

    beforeEach(() => {
        window.speechSynthesis.speak = mockSpeak;
        window.speechSynthesis.cancel = mockCancel;
        window.speechSynthesis.getVoices = mockGetVoices;
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should generate correct ttsSteps', () => {
        const { result } = renderHook(() => useStepTTS({ step: mockStep }));

        expect(result.current.ttsSteps).toHaveLength(3); // Title, Card, Footer
        expect(result.current.ttsSteps[0].text).toBe('Step Title');
        expect(result.current.ttsSteps[1].text).toContain('Card 1. Card Text 1');
        expect(result.current.ttsSteps[2].text).toContain('Footer Tip');
    });

    it('should not play if autoPlay is false', () => {
        const { result } = renderHook(() => useStepTTS({ step: mockStep, autoPlay: false }));
        expect(mockSpeak).not.toHaveBeenCalled();
        expect(result.current.activeReadingId).toBeNull();
    });

    it('should play sequence if autoPlay is true', () => {
        renderHook(() => useStepTTS({ step: mockStep, autoPlay: true }));
        expect(mockSpeak).toHaveBeenCalled();
        expect(mockCancel).toHaveBeenCalled();
    });

    it('should apply rate and volume to utterance', () => {
        const rate = 1.5;
        const volume = 0.5;
        renderHook(() => useStepTTS({ step: mockStep, autoPlay: true, rate, volume }));

        expect(mockSpeak).toHaveBeenCalled();
        const utterance = mockSpeak.mock.calls[0][0] as SpeechSynthesisUtterance;
        expect(utterance.rate).toBe(rate);
        expect(utterance.volume).toBe(volume);
    });

    it('should restart/resume when rate changes', () => {
        const { rerender } = renderHook(({ rate }) => useStepTTS({ step: mockStep, autoPlay: true, rate }), {
            initialProps: { rate: 1 }
        });

        expect(mockSpeak).toHaveBeenCalledTimes(1);

        // Mock that we spoke a bit
        const utterance = mockSpeak.mock.calls[0][0] as SpeechSynthesisUtterance;
        // Simulate boundary event to advance char index
        if (utterance.onboundary) {
            utterance.onboundary({ charIndex: 5, charLength: 1, name: 'word' } as any);
        }

        // Change rate
        rerender({ rate: 1.5 });

        // Should cancel and speak again
        expect(mockCancel).toHaveBeenCalled();
        expect(mockSpeak).toHaveBeenCalledTimes(2);

        const newUtterance = mockSpeak.mock.calls[1][0] as SpeechSynthesisUtterance;
        expect(newUtterance.rate).toBe(1.5);
        // Verify text is sliced (resume capability)
        // Original text: "Step Title"
        // Resume from 5: "Title" (roughly)
        // We verify that the text is DIFFERENT from original
        expect(newUtterance.text).not.toBe('Step Title');
        expect(newUtterance.text.length).toBeLessThan(10);
    });

    it('should call onComplete when finished', () => {
        const onComplete = vi.fn();
        renderHook(() => useStepTTS({ step: mockStep, autoPlay: true, onComplete }));

        // Simulate end of all items
        // We need to manually trigger onend for each step in the sequence
        // This is tricky because the hook creates new utterances in onend chain.
        // We can simulate it by grabbing the last call to speak.

        // 1. Title
        let utterance = mockSpeak.mock.calls[0][0] as SpeechSynthesisUtterance;
        act(() => utterance.onend?.(new Event('end') as any));

        // 2. Card
        utterance = mockSpeak.mock.calls[1][0] as SpeechSynthesisUtterance;
        act(() => utterance.onend?.(new Event('end') as any));

        // 3. Footer
        utterance = mockSpeak.mock.calls[2][0] as SpeechSynthesisUtterance;
        act(() => utterance.onend?.(new Event('end') as any));

        expect(onComplete).toHaveBeenCalled();
    });
    it('should NOT play next item if autoPlay becomes false (Stop Button)', () => {
        const { rerender } = renderHook(({ autoPlay }) => useStepTTS({ step: mockStep, autoPlay }), {
            initialProps: { autoPlay: true }
        });

        // 1. Started playing
        expect(mockSpeak).toHaveBeenCalledTimes(1);
        const firstUtterance = mockSpeak.mock.calls[0][0] as SpeechSynthesisUtterance;

        // 2. STOP! (Simulate Stop button: prop changes to false)
        // This triggers the useEffect cleanup -> cancel()
        rerender({ autoPlay: false });
        expect(mockCancel).toHaveBeenCalled();

        // 3. Simulate "Zombie" onend event firing immediately after cancel
        act(() => {
            if (firstUtterance.onend) {
                firstUtterance.onend(new Event('end') as any);
            }
        });

        // 4. Assert: Should NOT have called speak again for the 2nd item
        // THIS SHOULD FAIL currently because onend only checks mountedRef
        expect(mockSpeak).toHaveBeenCalledTimes(1);
    });
    it('should handle rapid autoPlay toggling (Play/Stop/Play mash)', () => {
        const { rerender, result } = renderHook(({ autoPlay }) => useStepTTS({ step: mockStep, autoPlay }), {
            initialProps: { autoPlay: true }
        });

        // Mash toggle
        rerender({ autoPlay: false });
        rerender({ autoPlay: true });
        rerender({ autoPlay: false });
        rerender({ autoPlay: true });

        // Final state should be playing
        expect(mockSpeak).toHaveBeenCalled();
        expect(result.current.activeReadingId).not.toBeNull();
    });
    it('should resume from where it left off (Pause/Resume)', () => {
        const { rerender } = renderHook(({ autoPlay }) => useStepTTS({ step: mockStep, autoPlay }), {
            initialProps: { autoPlay: true }
        });

        // 1. Start Playing
        expect(mockSpeak).toHaveBeenCalledTimes(1);
        const firstUtterance = mockSpeak.mock.calls[0][0] as SpeechSynthesisUtterance;

        // Simulate reading progress (boundary event)
        act(() => {
            if (firstUtterance.onboundary) {
                firstUtterance.onboundary({ name: 'word', charIndex: 10, charLength: 5 } as any);
            }
        });

        // 2. Pause (autoPlay -> false)
        // Current behavior suspicion: This calls cancel() and resets charIndexRef if not handled carefully
        rerender({ autoPlay: false });
        expect(mockCancel).toHaveBeenCalled();

        // 3. Resume (autoPlay -> true)
        rerender({ autoPlay: true });

        // Expectations for correct behavior:
        // - It should speak again
        // - The NEW utterance should start from index 10 (or close to it)
        expect(mockSpeak).toHaveBeenCalledTimes(2);
        const secondUtterance = mockSpeak.mock.calls[1][0] as SpeechSynthesisUtterance;

        // This assertion checks if the resume logic works. 
        // If it starts from "Step Title" (length 10) and we skipped 10 chars, it should be shorter.
        // If logic is broken, it might be full length or just "Step Title" again.
        expect(secondUtterance.text.length).toBeLessThan(firstUtterance.text.length);
    });

    it('should NOT advance to next step on "canceled" or "interrupted" error', () => {
        const { result } = renderHook(({ autoPlay }) => useStepTTS({ step: mockStep, autoPlay }), {
            initialProps: { autoPlay: true }
        });

        // 1. Start Playing
        expect(mockSpeak).toHaveBeenCalledTimes(1);
        const utterance = mockSpeak.mock.calls[0][0] as SpeechSynthesisUtterance;
        const onError = utterance.onerror;

        // 2. Simulate "canceled" error (common during Pause)
        act(() => {
            if (onError) {
                // @ts-ignore - simulating error event
                onError({ error: 'canceled' } as SpeechSynthesisErrorEvent);
            }
        });

        // With the fix, it should ignore the error and stay on 1 call
        expect(mockSpeak).toHaveBeenCalledTimes(1);
    });
});
