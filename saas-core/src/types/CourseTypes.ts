import { z } from 'zod';

export type ComponentType = 'text-block' | 'quiz-basic' | 'graph-interactive' | 'section-header' | 'tabbed-info-card' | string;

// --- Zod Schemas ---

export const BaseComponentPropsSchema = z.object({
    id: z.string().optional(),
    className: z.string().optional(),
}).passthrough();

export const ComponentConfigSchema = z.object({
    id: z.string(),
    type: z.string(),
    props: z.record(z.any()), // We can make this stricter later
    children: z.lazy(() => ComponentConfigSchema.array()).optional(),
});

export const UnitSchema = z.object({
    id: z.string(),
    title: z.string(),
    components: z.array(ComponentConfigSchema),
});

export const ModuleSchema = z.object({
    id: z.string(),
    title: z.string(),
    units: z.array(UnitSchema),
});

export const CourseManifestSchema = z.object({
    id: z.string(),
    title: z.string(),
    version: z.string(),
    modules: z.array(ModuleSchema),
});

// --- TypeScript Interfaces (Inferred) ---

export type BaseComponentProps = z.infer<typeof BaseComponentPropsSchema>;
export type ComponentConfig = z.infer<typeof ComponentConfigSchema>;
export type Unit = z.infer<typeof UnitSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type CourseManifest = z.infer<typeof CourseManifestSchema>;

export interface UserProgress {
    userId: string;
    courseId: string;
    completedUnits: string[]; // IDs of completed units
    currentUnitId?: string;
    scores: Record<string, number>; // unitId -> score
}
