import React, { useState } from 'react';
import type { Course } from '../../../../types/course';


interface CourseStructurePanelProps {
    course: Course;
    currentModuleIndex: number;
    currentUnitIndex: number;
    onSelectUnit: (moduleIndex: number, unitIndex: number) => void;
    onAddModule: (title: string) => void;
    onAddUnit: (moduleIndex: number, title: string) => void;
    onDeleteModule: (moduleIndex: number) => void;
    onDeleteUnit: (moduleIndex: number, unitIndex: number) => void;
    onUpdateModule: (moduleIndex: number, updates: { title?: string }) => void;
    onEditModule: (moduleIndex: number) => void;
}

export const CourseStructurePanel: React.FC<CourseStructurePanelProps> = ({
    course,
    currentModuleIndex,
    currentUnitIndex,
    onSelectUnit,
    onAddModule,
    onAddUnit,

    onDeleteUnit,
    onEditModule
}) => {
    const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
    const [isAddingModule, setIsAddingModule] = useState(false);
    const [newModuleTitle, setNewModuleTitle] = useState('');

    const toggleModule = (moduleId: string) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }));
    };

    const handleCreateModule = () => {
        if (newModuleTitle.trim()) {
            onAddModule(newModuleTitle);
            setNewModuleTitle('');
            setIsAddingModule(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div className="p-4 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Course Structure</h3>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold truncate max-w-[150px]">{course.title}</span>
                    <button
                        onClick={() => setIsAddingModule(true)}
                        className="text-xs bg-[#7f13ec]/10 text-[#7f13ec] px-2 py-1 rounded hover:bg-[#7f13ec]/20 transition-colors"
                    >
                        + Module
                    </button>
                </div>
            </div>

            {isAddingModule && (
                <div className="p-2 m-2 bg-slate-50 dark:bg-white/5 rounded border border-slate-200 dark:border-white/10">
                    <input
                        autoFocus
                        type="text"
                        className="w-full text-sm bg-transparent outline-none border-b border-slate-300 dark:border-white/20 mb-2"
                        placeholder="Module Title..."
                        value={newModuleTitle}
                        onChange={(e) => setNewModuleTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCreateModule()}
                    />
                    <div className="flex justify-end gap-2 text-xs">
                        <button onClick={() => setIsAddingModule(false)} className="text-slate-400 hover:text-slate-600">Cancel</button>
                        <button onClick={handleCreateModule} className="text-[#7f13ec] font-bold">Add</button>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {course.modules.map((module, mIdx) => (
                    <div key={module.id} className="group/module relative rounded-lg overflow-visible border border-slate-200 dark:border-white/5 bg-white dark:bg-[#1f1629]">
                        {/* Module Header */}
                        <div
                            className={`p-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${currentModuleIndex === mIdx ? 'bg-slate-50 dark:bg-white/5' : ''}`}
                            onClick={() => toggleModule(module.id)}
                        >
                            <div className="flex items-center gap-2 overflow-hidden flex-1">
                                <span className="material-symbols-outlined text-sm text-slate-400 transform transition-transform" style={{
                                    transform: expandedModules[module.id] ? 'rotate(90deg)' : 'rotate(0deg)'
                                }}>chevron_right</span>
                                <span className="text-sm font-medium truncate">{module.title}</span>
                            </div>

                            {/* Settings Button (Visible on Hover) */}
                            <div className="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover/module:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEditModule(mIdx);
                                    }}
                                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                                    title="Module Settings"
                                >
                                    <span className="material-symbols-outlined text-[16px]">settings</span>
                                </button>
                                <div className="w-px h-3 bg-slate-200 dark:bg-white/10 mx-0.5"></div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const title = prompt("Unit Title:");
                                        if (title) onAddUnit(mIdx, title);
                                    }}
                                    className="p-1 text-slate-400 hover:text-[#7f13ec]"
                                    title="Add Unit"
                                >
                                    <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                            </div>
                        </div>

                        {/* Units List */}
                        {(expandedModules[module.id] || currentModuleIndex === mIdx) && (
                            <div className="border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
                                {module.units.map((unit, uIdx) => {
                                    const isActive = currentModuleIndex === mIdx && currentUnitIndex === uIdx;
                                    return (
                                        <div
                                            key={unit.id}
                                            onClick={() => onSelectUnit(mIdx, uIdx)}
                                            className={`pl-9 pr-3 py-2 text-xs cursor-pointer flex items-center gap-2 border-l-2 transition-colors group ${isActive
                                                ? 'border-[#7f13ec] text-[#7f13ec] bg-[#7f13ec]/5'
                                                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-[10px]">{isActive ? 'edit' : 'article'}</span>
                                            <span className="truncate flex-1">{unit.title}</span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (confirm(`Delete unit "${unit.title}"?`)) onDeleteUnit(mIdx, uIdx);
                                                }}
                                                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500"
                                                title="Delete Unit"
                                            >
                                                <span className="material-symbols-outlined text-[10px]">close</span>
                                            </button>
                                        </div>
                                    );
                                })}
                                {module.units.length === 0 && (
                                    <div className="pl-9 py-2 text-xs text-slate-400 italic">No units yet</div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
