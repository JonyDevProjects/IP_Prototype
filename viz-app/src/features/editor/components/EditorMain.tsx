import React, { useState, useEffect } from 'react';
import type { Course, ContentBlock } from '../../../types/course';
import { EditorHeader } from './EditorHeader';
import { EditorSidebar } from './Sidebar/EditorSidebar';
import { EditorPropertiesSidebar } from './EditorPropertiesSidebar';
import { EditorCanvas } from './EditorCanvas';
import { useEditorDragDrop } from '../hooks/useEditorDragDrop';

interface EditorMainProps {
    courseData: Course;
    onSave: (updatedCourse: Course) => void;
}

export const EditorMain: React.FC<EditorMainProps> = ({ courseData, onSave }) => {
    // Navigation State
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

    // Derived State
    const activeModule = courseData?.modules?.[currentModuleIndex] || courseData?.modules?.[0];
    const initialActiveUnit = activeModule?.units?.[currentUnitIndex] || activeModule?.units?.[0];

    // Local Editor State
    const [blocks, setBlocks] = useState<ContentBlock[]>(initialActiveUnit?.blocks || []);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [zoomLevel, setZoomLevel] = useState(100);
    const [headerInfo, setHeaderInfo] = useState({
        title: initialActiveUnit?.title || 'Untitled Unit',
        description: activeModule?.description || ''
    });

    // Sync state on unit change
    useEffect(() => {
        if (initialActiveUnit && activeModule) {
            setBlocks(initialActiveUnit.blocks);
            setHeaderInfo({
                title: initialActiveUnit.title,
                description: activeModule.description
            });
        }
    }, [initialActiveUnit?.id, activeModule?.id]);

    // Use Custom Hook for Drag and Drop
    const {
        dragState,
        handleDragStart,
        handleBlockDragStart,
        handleBlockDragOver,
        handleBlockDrop,
        handleCanvasDrop,
        handleCanvasDragOver,
        resetDragState
    } = useEditorDragDrop(blocks, setBlocks, setSelectedBlockId);


    if (!activeModule || !initialActiveUnit) {
        return <div className="p-8 text-center text-slate-500">No content available.</div>;
    }

    // Handlers
    const handlePublish = () => {
        const updatedModules = courseData.modules.map((mod, mIdx) => {
            if (mIdx !== currentModuleIndex) return mod;
            return {
                ...mod,
                description: headerInfo.description,
                units: mod.units.map((unit, uIdx) => {
                    if (uIdx !== currentUnitIndex) return unit;
                    return { ...unit, title: headerInfo.title, blocks: blocks };
                })
            };
        });
        onSave({ ...courseData, modules: updatedModules });
        alert('Course content saved successfully!');
    };

    const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
        setBlocks(prev => prev.map(b => b.id === blockId ? { ...b, ...updates } : b));
    };

    const deleteBlock = (blockId: string) => {
        setBlocks(prev => prev.filter(b => b.id !== blockId));
        if (selectedBlockId === blockId) setSelectedBlockId(null);
    };

    const selectedBlock = blocks.find(b => b.id === selectedBlockId);

    return (
        <div className="flex h-screen overflow-hidden bg-white dark:bg-[#0B1120] font-display text-slate-900 dark:text-white transition-colors duration-300">

            <EditorSidebar
                course={courseData}
                currentModuleIndex={currentModuleIndex}
                currentUnitIndex={currentUnitIndex}
                onSelectUnit={(m, u) => {
                    setCurrentModuleIndex(m);
                    setCurrentUnitIndex(u);
                    // Reset selection when changing units
                    setSelectedBlockId(null);
                }}
                onAddModule={(title) => {
                    const newModule: any = { // Typed as any to avoid complex mock creation inline
                        id: `m-${Date.now()}`,
                        order: courseData.modules.length + 1,
                        title,
                        description: '',
                        units: []
                    };
                    onSave({
                        ...courseData,
                        modules: [...courseData.modules, newModule]
                    });
                }}
                onAddUnit={(mIdx, title) => {
                    const updatedModules = [...courseData.modules];
                    const module = updatedModules[mIdx];
                    const newUnit: any = {
                        id: `u-${Date.now()}`,
                        title,
                        durationMin: 0,
                        isCompleted: false,
                        blocks: []
                    };
                    module.units = [...module.units, newUnit];
                    updatedModules[mIdx] = module;
                    onSave({ ...courseData, modules: updatedModules });

                    // Auto select the new unit
                    setCurrentModuleIndex(mIdx);
                    setCurrentUnitIndex(module.units.length - 1);
                }}
                onDeleteModule={(mIdx) => {
                    const updatedModules = courseData.modules.filter((_, i) => i !== mIdx);
                    onSave({ ...courseData, modules: updatedModules });

                    // Adjust selection
                    if (currentModuleIndex === mIdx) {
                        setCurrentModuleIndex(0);
                        setCurrentUnitIndex(0);
                    } else if (currentModuleIndex > mIdx) {
                        setCurrentModuleIndex(currentModuleIndex - 1);
                    }
                }}
                onDeleteUnit={(mIdx, uIdx) => {
                    const updatedModules = [...courseData.modules];
                    const module = updatedModules[mIdx];
                    module.units = module.units.filter((_, i) => i !== uIdx);
                    updatedModules[mIdx] = module;
                    onSave({ ...courseData, modules: updatedModules });

                    // Adjust selection if we deleted the current unit
                    if (currentModuleIndex === mIdx) {
                        if (currentUnitIndex === uIdx) {
                            setCurrentUnitIndex(Math.max(0, uIdx - 1));
                        } else if (currentUnitIndex > uIdx) {
                            setCurrentUnitIndex(currentUnitIndex - 1);
                        }
                    }
                }}
                onUpdateModule={(mIdx, updates) => {
                    const updatedModules = [...courseData.modules];
                    updatedModules[mIdx] = { ...updatedModules[mIdx], ...updates };
                    onSave({ ...courseData, modules: updatedModules });
                }}
                onMoveModule={(fromIdx, toIdx) => {
                    const updatedModules = [...courseData.modules];
                    const [movedModule] = updatedModules.splice(fromIdx, 1);
                    updatedModules.splice(toIdx, 0, movedModule);

                    // Update order property
                    const reorderedModules = updatedModules.map((m, idx) => ({ ...m, order: idx + 1 }));

                    onSave({ ...courseData, modules: reorderedModules });

                    if (currentModuleIndex === fromIdx) setCurrentModuleIndex(toIdx);
                    else if (currentModuleIndex === toIdx) setCurrentModuleIndex(fromIdx);
                }}
                onDragStart={handleDragStart}
                onDragEnd={resetDragState}
            />

            <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#150a1f] relative overflow-hidden">

                <EditorHeader
                    title={initialActiveUnit.title}
                    onPublish={handlePublish}
                />

                <EditorCanvas
                    blocks={blocks}
                    headerInfo={{ ...headerInfo, moduleTitle: activeModule?.title }}
                    selectedBlockId={selectedBlockId}
                    zoomLevel={zoomLevel}
                    dragState={dragState}
                    onUpdateHeader={(updates) => setHeaderInfo(prev => ({ ...prev, ...updates }))}
                    onBlockClick={(e, id) => { e.stopPropagation(); setSelectedBlockId(id); }}
                    onCanvasClick={() => setSelectedBlockId(null)}
                    onDeleteBlock={deleteBlock}
                    onUpdateBlock={updateBlock}
                    onBlockDragStart={handleBlockDragStart}
                    onBlockDragOver={handleBlockDragOver}
                    onBlockDrop={handleBlockDrop}
                    onCanvasDragOver={handleCanvasDragOver}
                    onCanvasDrop={handleCanvasDrop}
                    setZoomLevel={setZoomLevel}
                />
            </div>

            <EditorPropertiesSidebar
                selectedBlockId={selectedBlockId}
                selectedBlock={selectedBlock}
                headerInfo={headerInfo}
                onClose={() => setSelectedBlockId(null)}
                onUpdateHeader={(updates) => setHeaderInfo(prev => ({ ...prev, ...updates }))}
                onUpdateBlock={updateBlock}
                onDeleteBlock={deleteBlock}
            />
        </div>
    );
};
