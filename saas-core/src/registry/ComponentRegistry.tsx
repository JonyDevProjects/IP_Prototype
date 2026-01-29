import React, { ComponentType } from 'react';
import { TextBlock } from './basic/TextBlock';
import { SectionHeader } from './layout/SectionHeader';
import { TabbedInfoCard } from './complex/TabbedInfoCard';

// Registry Map
const registry: Record<string, ComponentType<any>> = {
    'text-block': TextBlock,
    'section-header': SectionHeader,
    'tabbed-info-card': TabbedInfoCard
};

/**
 * Registers a component to be usable by the dynamic renderer.
 * @param type The unique string ID for the component (e.g., 'quiz-basic')
 * @param component The React Component
 */
export const registerComponent = (type: string, component: ComponentType<any>) => {
    if (registry[type]) {
        console.warn(`ComponentRegistry: Overwriting existing component '${type}'`);
    }
    registry[type] = component;
};

/**
 * Retrieves a component by its string ID.
 * @param type The unique string ID
 * @returns The React Component or undefined
 */
export const getComponent = (type: string): ComponentType<any> | undefined => {
    return registry[type];
};

/**
 * Debug utility to list all registered components
 */
export const getRegisteredTypes = () => Object.keys(registry);

// Initial generic fallback
const FallbackComponent = ({ type, id }: { type: string, id?: string }) => (
    <div className="p-4 border-2 border-dashed border-red-500 rounded text-red-500">
        <p className="font-bold">Missing Component: {type}</p>
        <p className="text-sm opacity-75">ID: {id}</p>
    </div>
);

export const getComponentOrFallback = (type: string) => {
    return getComponent(type) || FallbackComponent;
};
