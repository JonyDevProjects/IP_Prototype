import { renderHook, act } from '@testing-library/react';
import { useTimelineTTS } from '../hooks/useTimelineTTS';
import { describe, it, expect, vi } from 'vitest';
import type { ContentBlock } from '../../../../types/course';

// Mock dependencies if any (none for this hook really, it's pure logic mostly)

describe('useTimelineTTS', () => {
    const mockOnUpdate = vi.fn();

    const mockBlock: ContentBlock = {
        id: 'test-block',
        type: 'timeline',
        content: [
            {
                title: 'Step 1',
                detailTitle: 'Detail 1',
                detailSubtitle: 'Subtitle 1',
                cards: [
                    { title: 'Card 1', text: 'Text 1' }
                ],
                footerTip: 'Tip 1'
            },
            {
                title: 'Step 2',
                // No details
            }
        ] as any,
        metadata: {
            activeStepIndex: 0
        }
    };

    it('should generate correct ttsSteps', () => {
        const { result } = renderHook(() => useTimelineTTS({ block: mockBlock, onUpdate: mockOnUpdate }));

        const steps = result.current.ttsSteps;
        expect(steps).toHaveLength(5); // Title, Subtitle, Card, Footer for step 0; Title for step 1

        expect(steps[0]).toEqual({ id: 'step-0-title', text: 'Detail 1' });
        expect(steps[1]).toEqual({ id: 'step-0-subtitle', text: 'Subtitle 1' });
        expect(steps[2]).toEqual({ id: 'step-0-card-0', text: 'Card 1. Text 1' });
        expect(steps[3]).toEqual({ id: 'step-0-footer', text: 'Nota: Tip 1' });
        expect(steps[4]).toEqual({ id: 'step-1-title', text: 'Step 2' });
    });

    it('should update active step index when tts step changes to a new step', () => {
        const { result } = renderHook(() => useTimelineTTS({ block: mockBlock, onUpdate: mockOnUpdate }));

        act(() => {
            result.current.handleTTSStepChange('step-1-title');
        });

        expect(mockOnUpdate).toHaveBeenCalledWith({
            metadata: {
                ...mockBlock.metadata,
                activeStepIndex: 1
            }
        });
    });

    it('should NOT update active step index when tts step is within the same step', () => {
        mockOnUpdate.mockClear();
        const { result } = renderHook(() => useTimelineTTS({ block: mockBlock, onUpdate: mockOnUpdate }));

        act(() => {
            result.current.handleTTSStepChange('step-0-subtitle');
        });

        expect(mockOnUpdate).not.toHaveBeenCalled();
    });

    it('should return correct highlight class', () => {
        const { result } = renderHook(() => useTimelineTTS({ block: mockBlock, onUpdate: mockOnUpdate }));

        // Initial state (null)
        expect(result.current.getHighlightClass('step-0-title')).toBe('');

        // Set active reading
        act(() => {
            result.current.handleTTSStepChange('step-0-title');
        });

        // Check highlight
        expect(result.current.getHighlightClass('step-0-title')).toContain('ring-2');
        expect(result.current.getHighlightClass('step-0-subtitle')).toContain('opacity-30');
    });
});
