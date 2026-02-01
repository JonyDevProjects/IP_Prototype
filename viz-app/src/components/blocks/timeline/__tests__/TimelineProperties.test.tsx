
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TimelineProperties } from '../TimelineProperties';
import { TimelineBlockDefinition } from '../index';
import type { ContentBlock } from '../../../../types/course';

describe('TimelineProperties', () => {
    // Mock basic block data
    const mockBlock: ContentBlock = {
        ...TimelineBlockDefinition.createBlock('test-id'),
        metadata: { activeStepIndex: 0 }
    };

    it('should add a new card when Add button is clicked', () => {
        const onUpdate = vi.fn();
        render(<TimelineProperties block={mockBlock} onUpdate={onUpdate} />);

        // Find "Add Card" button
        const addCardBtn = screen.getByText('Add Card');
        fireEvent.click(addCardBtn);

        expect(onUpdate).toHaveBeenCalled();
        const callArg = onUpdate.mock.calls[0][0]; // { content: [...] }
        const updatedSteps = callArg.content;
        const activeStep = updatedSteps[0];

        // Expect one more card than initial (initial has 2)
        expect(activeStep.cards).toHaveLength(3);
        expect(activeStep.cards[2].title).toBe('New Card');
    });

    it('should remove a card when Delete button is clicked', () => {
        const onUpdate = vi.fn();
        render(<TimelineProperties block={mockBlock} onUpdate={onUpdate} />);

        // Find delete buttons (rendered as 'close' icon)
        const deleteButtons = screen.getAllByText('close');
        // Click the first one
        fireEvent.click(deleteButtons[0]);

        expect(onUpdate).toHaveBeenCalled();
        const callArg = onUpdate.mock.calls[0][0];
        const activeStep = callArg.content[0];

        // Expect one less card
        expect(activeStep.cards).toHaveLength(1);
    });

    it('should call onUpdate when title input is changed', () => {
        const onUpdate = vi.fn();
        render(<TimelineProperties block={mockBlock} onUpdate={onUpdate} />);

        // Find the first card title input
        // Note: The UI has labels "Title", we can query by that or simply find the input value
        const titleInput = screen.getByDisplayValue('Detonantes');

        fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

        expect(onUpdate).toHaveBeenCalled();
        const callArg = onUpdate.mock.calls[0][0];
        // We need to verify the deep update worked
        // Since logic handles deep merging, we check passed object
        // NOTE: The implementation re-creates the array, so we inspect that.
        const activeStep = callArg.content[0];
        expect(activeStep.cards[0].title).toBe('Updated Title');
    });

    it('should call onUpdate when an icon is selected', () => {
        const onUpdate = vi.fn();
        render(<TimelineProperties block={mockBlock} onUpdate={onUpdate} />);

        // 1. Open Icon Picker for first card
        // The implementation uses a button with the current icon to toggle picker.
        // Current icon is 'check_circle'
        const iconBtn = screen.getAllByText('check_circle')[0];
        fireEvent.click(iconBtn);

        // 2. Select a new icon from the grid
        // Let's say 'star' is in the AVAILABLE_ICONS list
        const starIcon = screen.getByText('star');
        fireEvent.click(starIcon);

        expect(onUpdate).toHaveBeenCalled();
        const callArg = onUpdate.mock.calls[0][0];
        const activeStep = callArg.content[0];
        expect(activeStep.cards[0].icon).toBe('star');
    });
});
