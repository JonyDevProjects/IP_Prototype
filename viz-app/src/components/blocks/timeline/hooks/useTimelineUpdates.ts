import type { TimelineStep } from "../types";

export const useTimelineUpdates = (
    data: TimelineStep[],
    onUpdate: (updates: { content: TimelineStep[] }) => void
) => {
    const updateActiveStep = (stepIndex: number, field: string, val: string) => {
        const newContent = [...data];
        if (field.includes('.')) {
            const [p, c] = field.split('.') as [string, string];
            if (p === 'cards') return; // Cards are handled via StepDetailView internal logic if needed

            if (newContent[stepIndex]) {
                const parent = newContent[stepIndex][p as keyof TimelineStep];
                if (typeof parent === 'object' && parent !== null) {
                    (parent as unknown as Record<string, unknown>)[c] = val;
                }
            }
        } else {
            (newContent[stepIndex] as unknown as Record<string, unknown>)[field] = val;
        }
        onUpdate({ content: newContent });
    };

    return { updateActiveStep };
};
