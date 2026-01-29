import React from 'react';
import { EditorProvider } from './EditorContext';
import { Toolbox } from './Toolbox';
import { EditorCanvas } from './EditorCanvas';
import { PropertyPanel } from './PropertyPanel';

export const EditorLayout = () => {
    return (
        <EditorProvider>
            <div className="flex h-[calc(100vh-80px)] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900">
                <Toolbox />
                <EditorCanvas />
                <PropertyPanel />
            </div>
        </EditorProvider>
    );
};
