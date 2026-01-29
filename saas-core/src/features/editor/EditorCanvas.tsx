import React from 'react';
import { useEditor } from './EditorContext';
import { CourseRenderer } from '../../engine/CourseRenderer';

export const EditorCanvas = () => {
    const { courseData, selectedComponentId, selectComponent } = useEditor();

    // For prototype, we just verify the first unit
    const components = courseData.modules[0]?.units[0]?.components || [];

    return (
        <div
            className="flex-1 bg-slate-100 dark:bg-slate-950 p-8 overflow-y-auto h-full"
            onClick={() => selectComponent(null)} // Deselect on background click
        >
            <div className="max-w-3xl mx-auto min-h-[500px] bg-white dark:bg-slate-900 shadow-sm rounded-xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
                <CourseRenderer
                    components={components}
                    selectedId={selectedComponentId}
                    onSelectComponent={selectComponent}
                />
            </div>
        </div>
    );
};
