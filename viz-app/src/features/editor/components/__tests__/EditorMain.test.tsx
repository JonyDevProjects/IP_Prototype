import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EditorMain } from '../EditorMain';
import type { Course } from '../../../../types/course';

// Mocks
// We mock child components to focus on EditorMain's logic and avoid deep rendering issues
vi.mock('../Sidebar/EditorSidebar', () => ({
    EditorSidebar: ({
        onAddModule,
        onAddUnit,
        onDeleteModule,
        onDeleteUnit,
        onMoveModule
    }: any) => (
        <div data-testid="editor-sidebar">
            <button data-testid="add-module-btn" onClick={() => onAddModule('New Module')}>Add Module</button>
            <button data-testid="add-unit-btn" onClick={() => onAddUnit(0, 'New Unit')}>Add Unit</button>
            <button data-testid="delete-module-btn" onClick={() => onDeleteModule(0)}>Delete Module 0</button>
            <button data-testid="delete-unit-btn" onClick={() => onDeleteUnit(0, 0)}>Delete Unit 0-0</button>
            <button data-testid="move-module-btn" onClick={() => onMoveModule(0, 1)}>Move Module 0 to 1</button>
        </div>
    )
}));

vi.mock('../EditorCanvas', () => ({
    EditorCanvas: () => <div data-testid="editor-canvas">Canvas</div>
}));

vi.mock('../EditorHeader', () => ({
    EditorHeader: () => <div data-testid="editor-header">Header</div>
}));

vi.mock('../EditorPropertiesSidebar', () => ({
    EditorPropertiesSidebar: () => <div data-testid="properties-sidebar">Properties</div>
}));

vi.mock('../../hooks/useEditorDragDrop', () => ({
    useEditorDragDrop: () => ({
        dragState: {},
        handleDragStart: vi.fn(),
        handleBlockDragStart: vi.fn(),
        handleBlockDragOver: vi.fn(),
        handleBlockDrop: vi.fn(),
        handleCanvasDrop: vi.fn(),
        handleCanvasDragOver: vi.fn(),
        resetDragState: vi.fn()
    })
}));

describe('EditorMain Module Management', () => {
    let mockCourse: Course;
    let mockOnSave: any;

    beforeEach(() => {
        mockOnSave = vi.fn();
        mockCourse = {
            id: 'c1',
            title: 'Test Course',
            description: 'Test Description',
            modules: [
                {
                    id: 'm1',
                    order: 1,
                    title: 'Module 1',
                    description: 'Desc 1',
                    units: [
                        {
                            id: 'u1',
                            title: 'Unit 1',
                            durationMin: 10,
                            isCompleted: false,
                            blocks: []
                        }
                    ]
                },
                {
                    id: 'm2',
                    order: 2,
                    title: 'Module 2',
                    description: 'Desc 2',
                    units: []
                }
            ],
            author: { name: 'Test Author', avatar: '', role: 'instructor' },
            totalProgress: 0
        };
    });

    // Case 1: Adding a new module
    it('correctly adds a new module and updates course structure', async () => {
        render(<EditorMain courseData={mockCourse} onSave={mockOnSave} />);

        const addBtn = screen.getByTestId('add-module-btn');
        fireEvent.click(addBtn);

        expect(mockOnSave).toHaveBeenCalledTimes(1);
        const savedCourse = mockOnSave.mock.calls[0][0];
        expect(savedCourse.modules).toHaveLength(3);
        expect(savedCourse.modules[2].title).toBe('New Module');
        expect(savedCourse.modules[2].order).toBe(3);
    });

    // Case 2: Deleting a module
    it('correctly removes a module and adjusts state', async () => {
        render(<EditorMain courseData={mockCourse} onSave={mockOnSave} />);

        const deleteBtn = screen.getByTestId('delete-module-btn');
        fireEvent.click(deleteBtn);

        expect(mockOnSave).toHaveBeenCalledTimes(1);
        const savedCourse = mockOnSave.mock.calls[0][0];
        expect(savedCourse.modules).toHaveLength(1);
        expect(savedCourse.modules[0].id).toBe('m2'); // m1 was deleted
    });

    // Case 3: Moving a module
    it('correctly moves a module up/down and updates order', async () => {
        render(<EditorMain courseData={mockCourse} onSave={mockOnSave} />);

        const moveBtn = screen.getByTestId('move-module-btn');
        fireEvent.click(moveBtn);

        expect(mockOnSave).toHaveBeenCalledTimes(1);
        const savedCourse = mockOnSave.mock.calls[0][0];

        // m1 moved to index 1 (second place), m2 moved to index 0 (first place)
        expect(savedCourse.modules[0].id).toBe('m2');
        expect(savedCourse.modules[1].id).toBe('m1');

        // Orders should be updated
        expect(savedCourse.modules[0].order).toBe(1);
        expect(savedCourse.modules[1].order).toBe(2);
    });

    // Case 4: Adding a new unit
    it('correctly adds a new unit to a module', async () => {
        render(<EditorMain courseData={mockCourse} onSave={mockOnSave} />);

        const addUnitBtn = screen.getByTestId('add-unit-btn');
        fireEvent.click(addUnitBtn);

        expect(mockOnSave).toHaveBeenCalledTimes(1);
        const savedCourse = mockOnSave.mock.calls[0][0];

        // Adding unit to module 0
        expect(savedCourse.modules[0].units).toHaveLength(2);
        expect(savedCourse.modules[0].units[1].title).toBe('New Unit');
    });

    // Case 5: Deleting a unit
    it('correctly removes a unit from a module', async () => {
        render(<EditorMain courseData={mockCourse} onSave={mockOnSave} />);

        const deleteUnitBtn = screen.getByTestId('delete-unit-btn');
        fireEvent.click(deleteUnitBtn);

        expect(mockOnSave).toHaveBeenCalledTimes(1);
        const savedCourse = mockOnSave.mock.calls[0][0];

        // Deleting unit 0 from module 0
        expect(savedCourse.modules[0].units).toHaveLength(0);
    });
});
