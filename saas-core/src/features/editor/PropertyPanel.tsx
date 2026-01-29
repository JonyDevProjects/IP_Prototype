import React, { useEffect, useState } from 'react';
import { useEditor } from './EditorContext';
import { ComponentConfig } from '../../types/CourseTypes';

export const PropertyPanel = () => {
    const { courseData, selectedComponentId, updateComponentProps } = useEditor();
    const [selectedComponent, setSelectedComponent] = useState<ComponentConfig | null>(null);

    // Find the actual component object when ID changes
    useEffect(() => {
        if (!selectedComponentId) {
            setSelectedComponent(null);
            return;
        }

        // Deep search helper
        const findComp = (comps: ComponentConfig[]): ComponentConfig | null => {
            for (const c of comps) {
                if (c.id === selectedComponentId) return c;
                if (c.children) {
                    const found = findComp(c.children);
                    if (found) return found;
                }
            }
            return null;
        };

        // Search in the whole course
        let found = null;
        for (const mod of courseData.modules) {
            for (const unit of mod.units) {
                found = findComp(unit.components);
                if (found) break;
            }
            if (found) break;
        }
        setSelectedComponent(found);
    }, [selectedComponentId, courseData]);

    if (!selectedComponent) {
        return (
            <div className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 flex items-center justify-center text-slate-400 text-sm">
                Select a component to edit its properties.
            </div>
        );
    }

    const handleChange = (key: string, value: any) => {
        updateComponentProps(selectedComponent.id, { [key]: value });
    };

    return (
        <div className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col h-full">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Properties</h2>
                <div className="text-sm font-semibold mt-1 text-indigo-600 truncate">{selectedComponent.type}</div>
                <div className="text-xs text-slate-400 font-mono">{selectedComponent.id}</div>
            </div>

            <div className="flex-1 p-4 space-y-6 overflow-y-auto">
                {/* Dynamically render inputs based on existing props */}
                {Object.entries(selectedComponent.props || {}).map(([key, value]) => {
                    const isLongText = typeof value === 'string' && value.length > 50;
                    const isHtml = key === 'content' || key === 'description'; // Naive HTML detection

                    return (
                        <div key={key} className="space-y-2">
                            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 capitalize">
                                {key}
                            </label>

                            {typeof value === 'boolean' ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={(e) => handleChange(key, e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-sm text-slate-600">{value ? 'True' : 'False'}</span>
                                </div>
                            ) : isHtml || isLongText ? (
                                <textarea
                                    value={value as string}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    rows={6}
                                    className="w-full text-sm p-2 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={value as string}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    className="w-full text-sm p-2 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
