import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTextSequence } from './useTextSequence';

describe('useTextSequence', () => {
    const mockSpeak = vi.fn((utterance) => {
        if (utterance.onstart) {
            utterance.onstart();
        }
    });
    const mockCancel = vi.fn();

    beforeEach(() => {
        // Mock global speech synthesis methods
        window.speechSynthesis.speak = mockSpeak;
        window.speechSynthesis.cancel = mockCancel;
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    const items = [
        { id: '1', text: 'Hello' },
        { id: '2', text: 'World' }
    ];

    it('should NOT play if autoPlay is false', () => {
        const { result } = renderHook(() => useTextSequence({ items, autoPlay: false }));
        expect(mockSpeak).not.toHaveBeenCalled();
        expect(result.current.activeItemId).toBeNull();
    });

    it('should play sequence if autoPlay is true', () => {
        renderHook(() => useTextSequence({ items, autoPlay: true }));
        // Expect speak to be called for each item (sequentially, but our simple mock in hook loops them)
        // Wait, the hook uses `utterance.onend` to trigger next? No, `useTextSequence` loops immediately?
        // Let's check `useTextSequence.ts` implementation:
        // itemsToPlay.forEach(...) -> It queues them all up immediately!
        expect(mockSpeak).toHaveBeenCalledTimes(2);
        expect(mockCancel).toHaveBeenCalled(); // It cancels before starting
    });

    it('should cancel playback when autoPlay becomes false', async () => {
        const { result, rerender } = renderHook(({ autoPlay }) => useTextSequence({ items, autoPlay }), {
            initialProps: { autoPlay: true }
        });

        expect(mockSpeak).toHaveBeenCalled();

        // Ensure state updated from onstart (wait for async update)
        await waitFor(() => {
            expect(result.current.activeItemId).not.toBeNull();
        });

        mockCancel.mockClear();

        // Rerender with autoPlay = false (simulate Pause)
        rerender({ autoPlay: false });

        expect(mockCancel).toHaveBeenCalled();
    });

    it('should call onComplete when sequence finishes', () => {
        const onComplete = vi.fn();
        renderHook(() => useTextSequence({ items, autoPlay: true, onComplete }));

        // We need to simulate onend for the last item
        // Since we mocked speak, we need to grab the utterance passed to it
        const lastCall = mockSpeak.mock.lastCall;
        const lastUtterance = lastCall[0];

        expect(lastUtterance.text).toBe('World');

        act(() => {
            if (lastUtterance.onend) {
                lastUtterance.onend(new Event('end'));
            }
        });

        expect(onComplete).toHaveBeenCalled();
    });
});
