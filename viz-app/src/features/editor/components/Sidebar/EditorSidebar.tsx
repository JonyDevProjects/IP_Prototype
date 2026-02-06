
import React, { useState } from 'react';
import { CourseStructurePanel } from './CourseStructurePanel';
import { EditorToolbox } from '../EditorToolbox';
import type { ContentBlockType } from '../../../../types/course';
import type { Course } from '../../../../types/course';
import { ModuleSettingsPanel } from './ModuleSettingsPanel';
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from '@/components/ui/sidebar';
import { LayoutDashboard, Cuboid } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export const EditorSidebar: React.FC<EditorSidebarProps> = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="h-full flex flex-col bg-gray-100 dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 overflow-hidden">
            <Sidebar open={open} setOpen={setOpen}>
                <EditorSidebarContent {...props} />
            </Sidebar>
        </div>
    );
};

const EditorSidebarContent = ({
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
}: EditorSidebarProps) => {
    const { open } = useSidebar();
    const [activeTab, setActiveTab] = useState<'structure' | 'blocks'>('structure');
    const [editingModuleIndex, setEditingModuleIndex] = useState<number | null>(null);

    const links = [
        {
            label: "Structure",
            href: "#",
            icon: <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
            onClick: () => setActiveTab('structure'),
            active: activeTab === 'structure'
        },
        {
            label: "Blocks",
            href: "#",
            icon: <Cuboid className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
            onClick: () => setActiveTab('blocks'),
            active: activeTab === 'blocks'
        }
    ];

    return (
        <SidebarBody className="justify-between gap-10 bg-white dark:bg-[#1f1629]">
            <div className="flex flex-col flex-1 overflow-hidden h-full">
                {/* Navigation Links (Tabs) */}
                <div className="flex flex-col gap-2 mb-4">
                    {links.map((link, idx) => (
                        <div key={idx} onClick={(e) => { e.preventDefault(); link.onClick(); }}>
                            <SidebarLink link={link} className={cn(link.active && "bg-gray-100 dark:bg-gray-800 rounded-lg")} />
                        </div>
                    ))}
                </div>

                {/* Main Content Area - Only visible when open */}
                {open && (
                    <div className="flex-1 overflow-hidden relative animate-in fade-in duration-300">
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
                                onSelectUnit={onSelectUnit}
                                onAddModule={onAddModule}
                                onAddUnit={onAddUnit}
                                onDeleteModule={onDeleteModule}
                                onDeleteUnit={onDeleteUnit}
                                onUpdateModule={onUpdateModule}
                                onEditModule={(mIdx) => setEditingModuleIndex(mIdx)}
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
                )}
            </div>
        </SidebarBody>
    );
};
