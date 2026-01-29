import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CourseManifest, ComponentConfig } from '../../types/CourseTypes';
import { DEMO_COURSE } from '../../data/mocks/demo-course';

interface EditorContextType {
    courseData: CourseManifest;
    setCourseData: (data: CourseManifest) => void;
    selectedComponentId: string | null;
    selectComponent: (id: string | null) => void;
    updateComponentProps: (id: string, newProps: any) => void;
    addComponent: (type: string, parentId?: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
    // Start with the DEMO_COURSE for now, effectively "Forking" it for the session
    const [courseData, setCourseData] = useState<CourseManifest>(DEMO_COURSE);
    const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

    const selectComponent = (id: string | null) => {
        console.log("Selecting component:", id);
        setSelectedComponentId(id);
    };

    // Helper to deeply find and update a component in the tree
    const updateComponentInTree = (
        components: ComponentConfig[],
        targetId: string,
        updateFn: (comp: ComponentConfig) => ComponentConfig
    ): ComponentConfig[] => {
        return components.map(comp => {
            if (comp.id === targetId) {
                return updateFn(comp);
            }
            if (comp.children) {
                return { ...comp, children: updateComponentInTree(comp.children, targetId, updateFn) };
            }
            return comp;
        });
    };

    const updateComponentProps = (id: string, newProps: any) => {
        setCourseData(prev => {
            const newModules = prev.modules.map(mod => ({
                ...mod,
                units: mod.units.map(unit => ({
                    ...unit,
                    components: updateComponentInTree(unit.components, id, (comp) => ({
                        ...comp,
                        props: { ...comp.props, ...newProps }
                    }))
                }))
            }));
            return { ...prev, modules: newModules };
        });
    };

    const addComponent = (type: string, parentId?: string) => {
        // Placeholder for adding components logic
        // For this prototype, we might just append to the first unit
        const newComponent: ComponentConfig = {
            id: `new-${type}-${Date.now()}`,
            type,
            props: { title: `New ${type}`, content: "Placeholder content" }
        };

        setCourseData(prev => {
            // Naive implementation: Always add to the first unit of the first module
            const newModules = [...prev.modules];
            newModules[0].units[0].components.push(newComponent);
            return { ...prev, modules: newModules };
        });
    };

    return (
        <EditorContext.Provider value={{
            courseData,
            setCourseData,
            selectedComponentId,
            selectComponent,
            updateComponentProps,
            addComponent
        }}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditor must be used within an EditorProvider');
    }
    return context;
};
