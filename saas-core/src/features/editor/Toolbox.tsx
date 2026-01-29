import React from 'react';
import { useEditor } from './EditorContext';
import { Type, Layout, MousePointer2 } from 'lucide-react';

export const Toolbox = () => {
    const { addComponent } = useEditor();

    const tools = [
        { id: 'section-header', label: 'Header', icon: <Layout size={18} /> },
        { id: 'text-block', label: 'Text Block', icon: <Type size={18} /> },
        { id: 'tabbed-info-card', label: 'Tabs Card', icon: <MousePointer2 size={18} /> },
    ];

    return (
        <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Toolbox</h2>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {tools.map(tool => (
                    <button
                        key={tool.id}
                        onClick={() => addComponent(tool.id)}
                        className="w-full flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors text-left group"
                    >
                        <span className="text-slate-500 group-hover:text-indigo-500">{tool.icon}</span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{tool.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
