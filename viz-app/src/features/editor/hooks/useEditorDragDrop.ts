
import { useState } from 'react';
import type { ContentBlock, ContentBlockType } from '../../../types/course';
import { getBlockDefinition } from '../../../components/blocks/registry';

export const useEditorDragDrop = (
    blocks: ContentBlock[],
    setBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>,
    setSelectedBlockId: (id: string | null) => void
) => {
    const [dragState, setDragState] = useState<{
        isDragging: boolean;
        draggedBlockId: string | null;
        dragOverBlockId: string | null;
        dropPosition: 'before' | 'after' | null;
        newBlockType: ContentBlockType | null;
    }>({
        isDragging: false,
        draggedBlockId: null,
        dragOverBlockId: null,
        dropPosition: null,
        newBlockType: null
    });

    const resetDragState = () => {
        setDragState({ isDragging: false, draggedBlockId: null, dragOverBlockId: null, dropPosition: null, newBlockType: null });
    };

    const handleDragStart = (e: React.DragEvent, type: ContentBlockType) => {
        e.dataTransfer.setData('blockType', type);
        e.dataTransfer.effectAllowed = 'copy';
        setDragState({
            isDragging: true,
            draggedBlockId: null,
            dragOverBlockId: null,
            dropPosition: null,
            newBlockType: type
        });
    };

    const handleBlockDragStart = (e: React.DragEvent, blockId: string) => {
        e.dataTransfer.setData('reorderBlockId', blockId);
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => {
            setDragState({
                isDragging: true,
                draggedBlockId: blockId,
                dragOverBlockId: null,
                dropPosition: null,
                newBlockType: null
            });
        }, 0);
    };

    const handleBlockDragOver = (e: React.DragEvent, targetBlockId: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (!dragState.isDragging) return;
        if (dragState.draggedBlockId === targetBlockId) return;

        const targetElement = e.currentTarget as HTMLElement;
        const rect = targetElement.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        const position = e.clientY < midpoint ? 'before' : 'after';

        setDragState(prev => ({
            ...prev,
            dragOverBlockId: targetBlockId,
            dropPosition: position
        }));
    };

    const handleBlockDrop = (e: React.DragEvent, targetBlockId: string) => {
        e.preventDefault();
        e.stopPropagation();

        const reorderId = dragState.draggedBlockId;
        const newBlockType = dragState.newBlockType;

        if (reorderId && reorderId !== targetBlockId) {
            setBlocks(prev => {
                const newBlocks = [...prev];
                const draggedIndex = newBlocks.findIndex(b => b.id === reorderId);
                const targetIndex = newBlocks.findIndex(b => b.id === targetBlockId);

                if (draggedIndex === -1 || targetIndex === -1) return prev;

                const [draggedItem] = newBlocks.splice(draggedIndex, 1);
                let insertionIndex = newBlocks.findIndex(b => b.id === targetBlockId);
                if (dragState.dropPosition === 'after') insertionIndex++;

                newBlocks.splice(insertionIndex, 0, draggedItem);
                return newBlocks;
            });
        } else if (newBlockType) {
            const def = getBlockDefinition(newBlockType);
            if (def) {
                const newBlock = def.createBlock(`new-${Date.now()}`);
                setBlocks(prev => {
                    const newBlocks = [...prev];
                    let insertionIndex = newBlocks.findIndex(b => b.id === targetBlockId);
                    if (insertionIndex === -1) insertionIndex = newBlocks.length;
                    if (dragState.dropPosition === 'after') insertionIndex++;
                    newBlocks.splice(insertionIndex, 0, newBlock);
                    return newBlocks;
                });
                setSelectedBlockId(newBlock.id);
            }
        }
        resetDragState();
    };

    const handleCanvasDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (dragState.newBlockType) {
            const def = getBlockDefinition(dragState.newBlockType);
            if (def) {
                const newBlock = def.createBlock(`new-${Date.now()}`);
                setBlocks(prev => [...prev, newBlock]);
                setSelectedBlockId(newBlock.id);
            }
        }
        resetDragState();
    };

    // Additional handlers for canvas drag over needed to clear state
    const handleCanvasDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        if (dragState.dragOverBlockId) {
            setDragState(prev => ({ ...prev, dragOverBlockId: null, dropPosition: null }));
        }
    }

    return {
        dragState,
        handleDragStart,
        handleBlockDragStart,
        handleBlockDragOver,
        handleBlockDrop,
        handleCanvasDrop,
        handleCanvasDragOver,
        resetDragState
    };
};
