
import React from 'react';
import type { ContentBlock } from '../../../types/course';
import { getBlockDefinition } from '../../../components/blocks/registry';
import { PropertySection } from '../../../components/ui/PropertySection';

interface EditorPropertiesSidebarProps {
    selectedBlockId: string | null;
    selectedBlock: ContentBlock | undefined;
    headerInfo: { title: string; description: string };
    onClose: () => void;
    onUpdateHeader: (updates: Partial<{ title: string; description: string }>) => void;
    onUpdateBlock: (blockId: string, updates: Partial<ContentBlock>) => void;
    onDeleteBlock: (blockId: string) => void;
}

export const EditorPropertiesSidebar: React.FC<EditorPropertiesSidebarProps> = ({
    selectedBlockId,
    selectedBlock,
    headerInfo,
    onClose,
    onUpdateHeader,
    onUpdateBlock,
    onDeleteBlock
}) => {
    return (
        <aside className={`bg-white dark:bg-[#1f1629] border-l border-slate-200 dark:border-white/10 shrink-0 flex flex-col z-20 transition-all duration-300 ${selectedBlockId ? 'w-72' : 'w-0 lg:w-72 overflow-hidden border-l-0 lg:border-l'}`}>
            {selectedBlockId ? (
                <>
                    <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Properties</h3>
                            <p className="text-xs text-slate-500 mt-1">Editing: <span className="font-medium text-[#7f13ec]">{selectedBlock?.type || (selectedBlockId === 'header' ? 'Header' : 'Element')}</span></p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                            title="Close Sidebar"
                        >
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
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
                                            onChange={(e) => onUpdateHeader({ title: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1.5">Description</label>
                                        <textarea
                                            className="w-full h-24 px-3 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:border-[#7f13ec] outline-none resize-none"
                                            value={headerInfo.description}
                                            onChange={(e) => onUpdateHeader({ description: e.target.value })}
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
                                    onUpdate={(updates) => onUpdateBlock(selectedBlock.id, updates)}
                                />
                            );
                        })()}
                    </div>

                    {selectedBlock && (
                        <div className="p-4 border-t border-slate-200 dark:border-white/10">
                            <button
                                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-md text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                onClick={() => onDeleteBlock(selectedBlock.id)}
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
    );
};
