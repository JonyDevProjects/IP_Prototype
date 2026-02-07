
import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TextBlockDefinition } from '../TextBlock';

// Mock RichTextEditor since it might be complex
vi.mock('../../ui/RichTextEditor', () => ({
    RichTextEditor: () => <div data-testid="rich-text-editor">Editor Mock</div>
}));

describe('TextBlock Component', () => {
    const TextComponent = TextBlockDefinition.Component;
    const mockBlock = { id: '123', type: 'text' as const, content: 'Initial' };

    beforeEach(() => {
        vi.spyOn(window.speechSynthesis, 'speak');
        vi.spyOn(window.speechSynthesis, 'cancel');
        Element.prototype.scrollIntoView = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders without crashing', () => {
        const { getByTestId } = render(
            <TextComponent
                block={mockBlock}
                isSelected={false}
                onClick={() => { }}
                onUpdate={() => { }}
            />
        );
        expect(getByTestId('rich-text-editor')).toBeDefined();
    });

    it('plays audio when playMode is auto', () => {
        render(
            <TextComponent
                block={mockBlock}
                isSelected={false}
                onClick={() => { }}
                onUpdate={() => { }}
                playMode="auto"
            />
        );

        expect(window.speechSynthesis.cancel).toHaveBeenCalled();
        expect(window.speechSynthesis.speak).toHaveBeenCalled();

        // Verify text extraction
        const connectMock = window.speechSynthesis.speak as any;
        const utterance = connectMock.mock.calls[0][0];
        // Note: Creating a div and setting innerHTML in JSDOM might behave slightly differently 
        // regarding whitespace, but "Initial" should be present.
        expect(utterance.text).toContain('Initial');
    });

    it('calls onTTSComplete when audio finishes', () => {
        const onTTSComplete = vi.fn();
        render(
            <TextComponent
                block={mockBlock}
                isSelected={false}
                onClick={() => { }}
                onUpdate={() => { }}
                playMode="auto"
                onTTSComplete={onTTSComplete}
            />
        );

        const connectMock = window.speechSynthesis.speak as any;
        const utterance = connectMock.mock.calls[0][0];

        // Simulate finish
        utterance.onend();

        expect(onTTSComplete).toHaveBeenCalled();
    });

    it('should NOT call onTTSComplete on "canceled" or "interrupted" error', () => {
        const onTTSComplete = vi.fn();
        render(
            <TextComponent
                block={mockBlock}
                isSelected={false}
                onClick={() => { }}
                onUpdate={() => { }}
                playMode="auto"
                onTTSComplete={onTTSComplete}
            />
        );

        const connectMock = window.speechSynthesis.speak as any;
        const utterance = connectMock.mock.calls[0][0] as SpeechSynthesisUtterance;
        const onError = utterance.onerror;

        // Simulate "canceled" error
        if (onError) {
            // @ts-ignore
            onError({ error: 'canceled' } as SpeechSynthesisErrorEvent);
        }

        // Bug: currently it calls onTTSComplete
        // Desired: it should NOT call it
        // We assert the DESIRED behavior, so it fails if the bug is present
        expect(onTTSComplete).not.toHaveBeenCalled();
    });
});
