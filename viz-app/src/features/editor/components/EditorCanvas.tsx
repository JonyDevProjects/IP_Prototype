
import React from 'react';
import type { ContentBlock } from '../../../types/course';
import { getBlockDefinition } from '../../../components/blocks/registry';
import { EditorBlockWrapper } from './EditorBlockWrapper';
import { InlineText } from '../../../components/ui/InlineText';

interface EditorCanvasProps {
    blocks: ContentBlock[];
    headerInfo: { title: string; description: string };
    selectedBlockId: string | null;
    zoomLevel: number;
    dragState: {
        isDragging: boolean;
        dragOverBlockId: string | null;
        dropPosition: 'before' | 'after' | null;
    };
    onUpdateHeader: (updates: Partial<{ title: string; description: string }>) => void;
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
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#150a1f] relative overflow-hidden">
            {/* Canvas Area */}
            <div
                className="flex-1 relative overflow-auto flex justify-center items-start p-8 transition-colors duration-300"
                onClick={onCanvasClick}
                onDragOver={onCanvasDragOver}
                onDrop={onCanvasDrop}
            >
                {/* Rulers (Mock) */}
                <div className="absolute top-0 left-0 w-full h-6 bg-slate-100 dark:bg-[#0B1120] border-b border-slate-200 dark:border-white/5 flex items-end px-2 text-[10px] text-slate-400 font-mono select-none overflow-hidden z-0">
                    <div className="flex space-x-12 w-full opacity-50">
                        <span>0</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span><span>600</span><span>800</span>
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-6 h-full bg-slate-100 dark:bg-[#0B1120] border-r border-slate-200 dark:border-white/5 flex flex-col pt-8 items-center gap-12 text-[10px] text-slate-400 font-mono select-none overflow-hidden z-0">
                    <span>0</span><span>100</span><span>200</span><span>300</span><span>400</span>
                </div>

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
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-slate-300">edit</span>
                        </div>
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
            <div className="absolute bottom-6 left-12 right-72 px-8 pointer-events-none flex justify-between items-center text-slate-400 text-sm">
                <span className="bg-white/80 dark:bg-black/50 backdrop-blur px-2 py-1 rounded">Module 2.1</span>
                <div className="flex items-center gap-2 pointer-events-auto bg-white/80 dark:bg-black/50 backdrop-blur px-2 py-1 rounded shadow-sm border border-slate-200 dark:border-white/10">
                    <button onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}>-</button>
                    <span className="w-12 text-center">{zoomLevel}%</span>
                    <button onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))}>+</button>
                </div>
            </div>
        </main>
    );
};
