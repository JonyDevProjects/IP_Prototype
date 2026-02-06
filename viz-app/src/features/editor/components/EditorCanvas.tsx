
import React from 'react';
import type { ContentBlock } from '../../../types/course';
import { getBlockDefinition } from '../../../components/blocks/registry';
import { EditorBlockWrapper } from './EditorBlockWrapper';
import { InlineText } from '../../../components/ui/InlineText';

interface EditorCanvasProps {
    blocks: ContentBlock[];
    headerInfo: { title: string; description: string; moduleTitle?: string };
    selectedBlockId: string | null;
    zoomLevel: number;
    dragState: {
        isDragging: boolean;
        dragOverBlockId: string | null;
        dropPosition: 'before' | 'after' | null;
    };
    onUpdateHeader: (updates: Partial<{ title: string; description: string; moduleTitle?: string }>) => void;
    onBlockClick: (e: React.MouseEvent, blockId: string) => void;
    onCanvasClick: () => void;
    onDeleteBlock: (blockId: string) => void;
    onUpdateBlock: (blockId: string, updates: Partial<ContentBlock>) => void;
    onBlockDragStart: (e: React.DragEvent, blockId: string) => void;
    onBlockDragOver: (e: React.DragEvent, blockId: string) => void;
    onBlockDrop: (e: React.DragEvent, blockId: string) => void;
    onCanvasDragOver: (e: React.DragEvent) => void;
    onCanvasDrop: (e: React.DragEvent) => void;
    setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
    blocks,
    headerInfo,
    selectedBlockId,
    zoomLevel,
    dragState,
    onUpdateHeader,
    onBlockClick,
    onCanvasClick,
    onDeleteBlock,
    onUpdateBlock,
    onBlockDragStart,
    onBlockDragOver,
    onBlockDrop,
    onCanvasDragOver,
    onCanvasDrop,
    setZoomLevel
}) => {
    return (
        <div
            className="flex-1 h-full flex flex-col overflow-hidden relative bg-slate-50 dark:bg-[#150a1f] transition-colors duration-300"
            onDragOver={onCanvasDragOver}
            onDrop={onCanvasDrop}
            onClick={onCanvasClick}
            style={{
                backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}
        >

            {/* Canvas Area */}
            <div
                className="flex-1 relative overflow-auto flex justify-center items-start p-8 transition-colors duration-300"
            >


                {/* The Page */}
                <div
                    className="mt-6 w-[900px] min-h-[1000px] bg-white dark:bg-[#1f1629] rounded-lg shadow-sm border border-slate-200 dark:border-white/5 relative flex flex-col items-center pt-16 pb-32 px-12 transition-all duration-300 origin-top"
                    style={{ transform: `scale(${zoomLevel / 100})` }}
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* Page Content Header */}
                    <div className="text-center mb-12 max-w-2xl w-full border-2 border-transparent hover:border-blue-500/30 border-dashed rounded-lg p-2 transition-colors relative group">
                        <InlineText
                            tagName="h2"
                            className="text-4xl font-bold text-[#140d1b] dark:text-white mb-6 w-full outline-none block"
                            value={headerInfo.title}
                            onChange={(val) => onUpdateHeader({ title: val })}
                            placeholder="Untitled Unit"
                        />
                        <InlineText
                            tagName="p"
                            className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed outline-none block"
                            value={headerInfo.description}
                            onChange={(val) => onUpdateHeader({ description: val })}
                            placeholder="Add a description..."
                            multiline
                        />

                    </div>

                    {/* Blocks Renderer */}
                    <div className="w-full flex flex-col">
                        {blocks.map((block) => {
                            const def = getBlockDefinition(block.type);
                            if (!def) return <div key={block.id}>Unknown block type: {block.type}</div>;

                            return (
                                <div
                                    key={block.id}
                                    className="py-3 relative"
                                    onDragOver={(e) => onBlockDragOver(e, block.id)}
                                    onDrop={(e) => onBlockDrop(e, block.id)}
                                >
                                    {/* Drop Indicator (Before) */}
                                    {dragState.isDragging && dragState.dragOverBlockId === block.id && dragState.dropPosition === 'before' && (
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#7f13ec] rounded-full z-10" />
                                    )}

                                    <EditorBlockWrapper
                                        block={block}
                                        isSelected={selectedBlockId === block.id}
                                        onClick={(e) => onBlockClick(e, block.id)}
                                        onDelete={() => onDeleteBlock(block.id)}
                                        onUpdate={(updates) => onUpdateBlock(block.id, updates)}
                                        onDragStart={(e) => onBlockDragStart(e, block.id)}
                                    >
                                        <def.Component
                                            block={block}
                                            isSelected={selectedBlockId === block.id}
                                            isEditable={true}
                                            onClick={(e) => onBlockClick(e, block.id)}
                                            onUpdate={(updates) => onUpdateBlock(block.id, updates)}
                                        />
                                    </EditorBlockWrapper>

                                    {/* Drop Indicator (After) */}
                                    {dragState.isDragging && dragState.dragOverBlockId === block.id && dragState.dropPosition === 'after' && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#7f13ec] rounded-full z-10" />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Drop Zone Hint */}
                    <div className="mt-8 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-lg p-8 w-full flex items-center justify-center text-slate-400 pointer-events-none">
                        <span className="text-sm">Drop new blocks here</span>
                    </div>
                </div>
            </div>

            {/* Zoom / Info Bar */}
            {/* Module Info (Bottom Left) */}
            <div className="absolute bottom-4 left-4 pointer-events-none z-10">
                <span className="bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 border border-slate-200 dark:border-white/10 shadow-sm">
                    {headerInfo.moduleTitle || 'Unknown Module'}
                </span>
            </div>

            {/* Zoom Controls (Bottom Right) */}
            <div className="absolute bottom-4 right-4 pointer-events-auto z-10">
                <div className="flex items-center gap-1 bg-white/90 dark:bg-black/80 backdrop-blur px-1 py-1 rounded-full shadow-sm border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-500">
                    <button
                        onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
                        className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors"
                    >
                        -
                    </button>
                    <span className="w-10 text-center select-none">{zoomLevel}%</span>
                    <button
                        onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))}
                        className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};
