import React, { useState, useEffect } from 'react';
import type { Course, ContentBlock, ContentBlockType } from '../../../types/course';
import { getBlockDefinition, getAllBlockDefinitions } from '../../../components/blocks/registry';
import { PropertySection } from '../../../components/ui/PropertySection';
import { ToolButton } from './ToolButton';
import { EditorBlockWrapper } from './EditorBlockWrapper';

interface EditorMainProps {
    courseData: Course;
}

export const EditorMain: React.FC<EditorMainProps> = ({ courseData }) => {
    // State for navigation (default to Unit 1-2 for the demo which has the timeline)
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [currentUnitIndex, setCurrentUnitIndex] = useState(1); // 'Procesos Previos'

    // Derived Active Unit
    const activeModule = courseData.modules[currentModuleIndex] || courseData.modules[0];
    const initialActiveUnit = activeModule?.units[currentUnitIndex] || activeModule?.units[0];

    // Local State for Editor Content
    const [blocks, setBlocks] = useState<ContentBlock[]>(initialActiveUnit.blocks);

    // Sync blocks when unit changes
    useEffect(() => {
        setBlocks(initialActiveUnit.blocks);
    }, [initialActiveUnit.id]);

    // State for Header Content
    const [headerInfo, setHeaderInfo] = useState({
        title: initialActiveUnit.title,
        description: activeModule.description
    });

    useEffect(() => {
        setHeaderInfo({
            title: initialActiveUnit.title,
            description: activeModule.description
        });
    }, [initialActiveUnit.id, activeModule.id]);

    // State for Selection & partial View
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [zoomLevel, setZoomLevel] = useState(100);

    const handleBlockClick = (e: React.MouseEvent, blockId: string) => {
        e.stopPropagation();
        setSelectedBlockId(blockId);
    };

    const handleCanvasClick = () => {
        setSelectedBlockId(null);
    };

    const selectedBlock = blocks.find(b => b.id === selectedBlockId);

    // --- Drag & Drop Handlers ---

    const handleDragStart = (e: React.DragEvent, type: ContentBlockType) => {
        e.dataTransfer.setData('blockType', type);
        e.dataTransfer.effectAllowed = 'copy';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('blockType') as ContentBlockType;

        if (type) {
            const def = getBlockDefinition(type);
            if (def) {
                // Generate a simple ID
                const newBlock = def.createBlock(`new-${Date.now()}`);
                setBlocks(prev => [...prev, newBlock]);
                setSelectedBlockId(newBlock.id);
            }
        }
    };

    // Helper to update a single block
    const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
        setBlocks(prev => prev.map(b => b.id === blockId ? { ...b, ...updates } : b));
    };


    return (
        <div className="flex h-screen overflow-hidden bg-white dark:bg-[#0B1120] font-display text-slate-900 dark:text-white transition-colors duration-300">

            {/* 1. Tool Sidebar (Left) */}
            <aside className="w-16 flex flex-col items-center py-4 bg-white dark:bg-[#1f1629] border-r border-slate-200 dark:border-white/10 shrink-0 z-20 gap-4">
                <ToolButton icon="view_quilt" label="Layouts" />

                {/* Dynamically Render Tools from Registry */}
                {getAllBlockDefinitions().map(def => (
                    <ToolButton
                        key={def.type}
                        icon={def.icon}
                        label={def.label}
                        draggable
                        onDragStart={(e) => handleDragStart(e, def.type)}
                    />
                ))}

                <ToolButton icon="smart_button" label="Buttons" />

                <div className="mt-auto flex flex-col gap-4">
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                    <button className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                        title="Navigate Units">
                        <span className="material-symbols-outlined">menu_open</span>
                    </button>
                </div>
            </aside>

            {/* 2. Main Content (Canvas) */}
            <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#150a1f] relative overflow-hidden">
                {/* Toolbar Superior */}
                <header className="flex-none h-14 bg-white dark:bg-[#1f1629] border-b border-slate-200 dark:border-white/10 px-4 flex items-center justify-between z-10 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider">Editing:</span>
                            <span className="font-bold text-sm truncate max-w-[200px]">{initialActiveUnit.title}</span>
                        </div>
                        <div className="h-6 w-px bg-slate-200 dark:bg-white/10"></div>
                        <div className="flex bg-slate-100 dark:bg-white/5 rounded-lg p-0.5">
                            <button className="px-2 py-0.5 rounded text-xs font-bold bg-white dark:bg-white/10 shadow-sm text-slate-800 dark:text-white">Design</button>
                            <button className="px-2 py-0.5 rounded text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800">Prototype</button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Autosaved</span>
                        <div className="flex text-slate-500 dark:text-slate-400">
                            <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded"><span className="material-symbols-outlined text-lg">undo</span></button>
                            <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded"><span className="material-symbols-outlined text-lg">redo</span></button>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#7f13ec] text-white text-sm font-bold rounded-lg shadow-lg shadow-[#7f13ec]/30 hover:bg-[#690fc4] transition-all">
                            <span className="material-symbols-outlined text-sm">play_arrow</span>
                            Preview
                        </button>
                    </div>
                </header>

                {/* Canvas Area */}
                <div
                    className="flex-1 relative overflow-auto flex justify-center p-8 transition-colors duration-300"
                    onClick={handleCanvasClick}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
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
                        className="mt-6 w-[900px] min-h-[1000px] bg-white dark:bg-[#1f1629] rounded-lg shadow-sm border border-slate-200 dark:border-white/5 relative flex flex-col items-center py-16 px-12 transition-all duration-300 origin-top"
                        style={{ transform: `scale(${zoomLevel / 100})` }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Page Content */}
                        <div className="text-center mb-12 max-w-2xl w-full border-2 border-transparent hover:border-blue-500/30 border-dashed rounded-lg p-2 transition-colors cursor-pointer"
                            onClick={(e) => handleBlockClick(e, 'header')}>
                            <h2
                                className="text-4xl font-bold text-[#140d1b] dark:text-white mb-6 w-full outline-none"
                            >
                                {headerInfo.title}
                            </h2>
                            <p
                                className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed outline-none"
                            >
                                {headerInfo.description}
                            </p>
                        </div>

                        {/* Blocks Renderer */}
                        <div className="w-full flex flex-col gap-6">
                            {blocks.map(block => {
                                const def = getBlockDefinition(block.type);
                                if (!def) return <div key={block.id}>Unknown block type: {block.type}</div>;

                                return (
                                    <EditorBlockWrapper
                                        key={block.id}
                                        block={block}
                                        isSelected={selectedBlockId === block.id}
                                        onClick={(e) => handleBlockClick(e, block.id)}
                                    >
                                        <def.Component
                                            block={block}
                                            isSelected={selectedBlockId === block.id}
                                            onClick={(e) => handleBlockClick(e, block.id)}
                                            onUpdate={(updates) => updateBlock(block.id, updates)}
                                        />
                                    </EditorBlockWrapper>
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

            {/* 3. Properties Panel (Right) */}
            <aside className="w-72 bg-white dark:bg-[#1f1629] border-l border-slate-200 dark:border-white/10 shrink-0 flex flex-col z-20 transition-colors duration-300">
                {selectedBlockId ? (
                    <>
                        <div className="p-4 border-b border-slate-200 dark:border-white/10">
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Properties</h3>
                            <p className="text-xs text-slate-500 mt-1">Editing: <span className="font-medium text-[#7f13ec]">{selectedBlock?.type || (selectedBlockId === 'header' ? 'Header' : 'Element')}</span></p>
                        </div>
                        <div className="flex-1 overflow-y-auto">

                            {/* Header Properties */}
                            {selectedBlockId === 'header' && (
                                <PropertySection title="Content" isOpen>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs text-slate-500 mb-1.5">Unit Title</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none"
                                                value={headerInfo.title}
                                                onChange={(e) => setHeaderInfo(prev => ({ ...prev, title: e.target.value }))}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-500 mb-1.5">Description</label>
                                            <textarea
                                                className="w-full h-24 px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none resize-none"
                                                value={headerInfo.description}
                                                onChange={(e) => setHeaderInfo(prev => ({ ...prev, description: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                </PropertySection>
                            )}

                            {/* Dynamic properties from Registry */}
                            {selectedBlock && (() => {
                                const def = getBlockDefinition(selectedBlock.type);
                                if (!def) return <div className="p-4 text-slate-500">No properties available for this block type.</div>;
                                return (
                                    <def.Properties
                                        block={selectedBlock}
                                        onUpdate={(updates) => updateBlock(selectedBlock.id, updates)}
                                    />
                                );
                            })()}
                        </div>

                        {selectedBlock && (
                            <div className="p-4 border-t border-slate-200 dark:border-white/10">
                                <button
                                    className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-md text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    onClick={() => {
                                        setBlocks(prev => prev.filter(b => b.id !== selectedBlockId));
                                        setSelectedBlockId(null);
                                    }}
                                >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                    Delete Block
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">touch_app</span>
                        <p className="text-sm">Select an element on the canvas to edit its properties.</p>
                    </div>
                )}
            </aside>

        </div>
    );
};
