import React, { useState } from 'react';
import { CourseStructurePanel } from './CourseStructurePanel';
import { EditorToolbox } from '../EditorToolbox';
import type { ContentBlockType } from '../../../../types/course';
import type { Course } from '../../../../types/course';
import { ModuleSettingsPanel } from './ModuleSettingsPanel';

interface EditorSidebarProps {
    course: Course;
    currentModuleIndex: number;
    currentUnitIndex: number;
    onSelectUnit: (moduleIndex: number, unitIndex: number) => void;
    onAddModule: (title: string) => void;
    onAddUnit: (moduleIndex: number, title: string) => void;
    onDeleteModule: (moduleIndex: number) => void;
    onDeleteUnit: (moduleIndex: number, unitIndex: number) => void;
    onUpdateModule: (moduleIndex: number, updates: { title?: string; description?: string }) => void;
    onMoveModule: (fromIndex: number, toIndex: number) => void;
    onDragStart: (e: React.DragEvent, type: ContentBlockType) => void;
    onDragEnd: () => void;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
    course,
    currentModuleIndex,
    currentUnitIndex,
    onSelectUnit,
    onAddModule,
    onAddUnit,
    onDeleteModule,
    onDeleteUnit,
    onUpdateModule,
    onMoveModule,
    onDragStart,
    onDragEnd
}) => {
    const [activeTab, setActiveTab] = useState<'structure' | 'blocks'>('structure');
    const [editingModuleIndex, setEditingModuleIndex] = useState<number | null>(null);

    // If we have an editing module, we render the settings panel instead of the structure
    // But only if we are in the 'structure' tab (though conceptually it replaces the whole view, 
    // keeping it within the tab context feels safer for navigation flow).

    return (
        <aside className="w-64 flex flex-col bg-white dark:bg-[#1f1629] border-r border-slate-200 dark:border-white/10 shrink-0 z-20 h-full">
            {/* Tabs (Hidden if editing a module) */}
            {editingModuleIndex === null && (
                <div className="flex border-b border-slate-200 dark:border-white/10">
                    <button
                        onClick={() => setActiveTab('structure')}
                        className={`flex-1 py-3 text-xs font-bold uppercase tracking-wide transition-colors ${activeTab === 'structure'
                            ? 'text-[#7f13ec] border-b-2 border-[#7f13ec]'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                            }`}
                    >
                        Structure
                    </button>
                    <button
                        onClick={() => setActiveTab('blocks')}
                        className={`flex-1 py-3 text-xs font-bold uppercase tracking-wide transition-colors ${activeTab === 'blocks'
                            ? 'text-[#7f13ec] border-b-2 border-[#7f13ec]'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                            }`}
                    >
                        Blocks
                    </button>
                </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-hidden relative">
                {editingModuleIndex !== null ? (
                    <ModuleSettingsPanel
                        module={course.modules[editingModuleIndex]}
                        isFirst={editingModuleIndex === 0}
                        isLast={editingModuleIndex === course.modules.length - 1}
                        onUpdate={(updates) => onUpdateModule(editingModuleIndex, updates)}
                        onDelete={() => {
                            if (confirm('Delete this module?')) {
                                onDeleteModule(editingModuleIndex);
                                setEditingModuleIndex(null);
                            }
                        }}
                        onMoveUp={() => {
                            if (editingModuleIndex > 0) {
                                onMoveModule(editingModuleIndex, editingModuleIndex - 1);
                                setEditingModuleIndex(editingModuleIndex - 1);
                            }
                        }}
                        onMoveDown={() => {
                            if (editingModuleIndex < course.modules.length - 1) {
                                onMoveModule(editingModuleIndex, editingModuleIndex + 1);
                                setEditingModuleIndex(editingModuleIndex + 1);
                            }
                        }}
                        onBack={() => setEditingModuleIndex(null)}
                    />
                ) : activeTab === 'structure' ? (
                    <CourseStructurePanel
                        course={course}
                        currentModuleIndex={currentModuleIndex}
                        currentUnitIndex={currentUnitIndex}
                        onSelectUnit={(m, u) => {
                            onSelectUnit(m, u);
                        }}
                        onAddModule={onAddModule}
                        onAddUnit={onAddUnit}
                        onDeleteModule={onDeleteModule}
                        onDeleteUnit={onDeleteUnit}
                        onUpdateModule={onUpdateModule} // Still passed for compatibility/cleanup later
                        onEditModule={(mIdx) => setEditingModuleIndex(mIdx)} // New Handler
                    />
                ) : (
                    <div className="h-full overflow-y-auto">
                        <div className="p-4 grid grid-cols-2 gap-2">
                            <p className="col-span-2 text-xs text-slate-400 mb-2">Drag blocks to canvas</p>
                            <EditorToolbox
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                                className="w-full border-none !items-stretch !py-0 !bg-transparent"
                                itemClassName="w-full h-auto aspect-square flex-col gap-2 p-2"
                            />
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};
