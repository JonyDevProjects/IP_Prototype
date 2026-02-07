import { renderHook, act } from '@testing-library/react';
import { useTextSequence } from '../useTextSequence';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('useTextSequence', () => {
    const items = [
        { id: '1', text: 'Hello' },
        { id: '2', text: 'World' }
    ];

    beforeEach(() => {
        vi.spyOn(window.speechSynthesis, 'speak');
        vi.spyOn(window.speechSynthesis, 'cancel');
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('plays sequence when autoPlay is true', () => {
        renderHook(() => useTextSequence({ items, autoPlay: true }));
        expect(window.speechSynthesis.speak).toHaveBeenCalled();
    });

    it('cancels playback if stopped prematurely', () => {
        const { rerender } = renderHook((props) => useTextSequence(props), {
            initialProps: { items, autoPlay: true }
        });

        expect(window.speechSynthesis.cancel).toHaveBeenCalledTimes(1); // Initial clear

        // User stops playback
        rerender({ items, autoPlay: false });

        // Should cancel again because it was interrupted
        expect(window.speechSynthesis.cancel).toHaveBeenCalledTimes(2);
    });

    it('does NOT cancel playback if finished naturally (The Golden Handshake)', () => {
        const onComplete = vi.fn();
        const { rerender } = renderHook((props) => useTextSequence(props), {
            initialProps: { items, autoPlay: true, onComplete }
        });

        // Get the last utterance spoken
        const connectMock = window.speechSynthesis.speak as any;
        const lastCall = connectMock.mock.calls[connectMock.mock.calls.length - 1];
        const utterance = lastCall[0];

        // Simulate natural completion of the last item
        act(() => {
            utterance.onend();
        });

        expect(onComplete).toHaveBeenCalled();

        // Now simulate the parent component setting autoPlay to false 
        // (which happens when switching to the next block)
        rerender({ items, autoPlay: false, onComplete });

        // IMPORTANT: Cancel should NOT have been called an extra time.
        // It's called once at start (1). 
        // If the bug existed, it would be called again (2).
        expect(window.speechSynthesis.cancel).toHaveBeenCalledTimes(1);
    });

    it('should NOT call onComplete if sequence is canceled or interrupted', () => {
        const onComplete = vi.fn();
        renderHook(() => useTextSequence({ items, autoPlay: true, onComplete }));

        // Get the last utterance (which has the onComplete logic attached to onend/onerror)
        const connectMock = window.speechSynthesis.speak as any;
        const lastUtterance = connectMock.mock.calls[items.length - 1][0] as SpeechSynthesisUtterance;

        // Simulate cancellation error on the last item
        const onError = lastUtterance.onerror;
        if (onError) {
            // @ts-ignore
            onError({ error: 'canceled' } as SpeechSynthesisErrorEvent);
        }

        // Bug: currently calls onComplete
        // Fix: should NOT call onComplete
        expect(onComplete).not.toHaveBeenCalled();
    });
});
