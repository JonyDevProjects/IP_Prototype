import React, { Suspense } from 'react';
import { ComponentConfig } from '../types/CourseTypes';
import { getComponentOrFallback } from '../registry/ComponentRegistry';
import { clsx } from 'clsx';

interface CourseRendererProps {
    components: ComponentConfig[];
    selectedId?: string | null;
    onSelectComponent?: (id: string) => void;
}

export const CourseRenderer: React.FC<CourseRendererProps> = ({ components, selectedId, onSelectComponent }) => {
    // Helper to handle selection click
    const handleWrapperClick = (e: React.MouseEvent, id: string) => {
        if (onSelectComponent) {
            e.stopPropagation(); // Prevent bubbling to parent containers
            onSelectComponent(id);
        }
    };

    return (
        <div className="course-renderer space-y-8 w-full max-w-4xl mx-auto">
            {components.map((config) => {
                const Component = getComponentOrFallback(config.type);
                const isSelected = selectedId === config.id;

                return (
                    <Suspense key={config.id} fallback={<div className="animate-pulse h-20 bg-gray-100 rounded"></div>}>
                        <div
                            className={clsx(
                                "component-wrapper transition-all duration-200 rounded-xl relative",
                                // Selection styles
                                isSelected && "ring-4 ring-indigo-500 ring-offset-4 ring-offset-white dark:ring-offset-slate-900 z-10",
                                // Hover styles (only if selectable)
                                onSelectComponent && !isSelected && "hover:ring-2 hover:ring-indigo-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                            )}
                            data-component-type={config.type}
                            onClick={(e) => handleWrapperClick(e, config.id)}
                        >
                            <Component {...config.props} id={config.id}>
                                {/* Recursively render children if they exist */}
                                {config.children && config.children.length > 0 && (
                                    <CourseRenderer
                                        components={config.children}
                                        selectedId={selectedId}
                                        onSelectComponent={onSelectComponent}
                                    />
                                )}
                            </Component>
                        </div>
                    </Suspense>
                );
            })}
        </div>
    );
};
