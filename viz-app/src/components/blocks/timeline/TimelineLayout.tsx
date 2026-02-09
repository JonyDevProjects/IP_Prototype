import {
    useScroll,
    useTransform,
    motion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { TimelineStep } from "./types";
import { StepDetailView } from "./StepDetailView";
import { InlineText } from "../../ui/InlineText";

interface TimelineLayoutProps {
    data: TimelineStep[];
    onUpdate: (updates: any) => void;
    isEditable?: boolean;
    onStepClick?: (index: number) => void;
    activeStepIndex?: number;
}

export const TimelineLayout = ({ data, onUpdate, isEditable = true, onStepClick, activeStepIndex }: TimelineLayoutProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref, data]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const updateActiveStep = (stepIndex: number, field: string, val: string) => {
        const newContent = [...data];
        if (field.includes('.')) {
            const [p, c] = field.split('.') as [string, string];
            if (p === 'cards') return; // Cards are handled via StepDetailView internal logic if needed, but here we construct the path

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

    return (
        <div
            className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto py-5 px-4 md:px-8 lg:px-10">

            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => {
                    const isActive = activeStepIndex === index;
                    return (
                        <div
                            key={index}
                            className={`flex justify-start pt-20 md:pt-44 md:gap-10 transition-all duration-200 rounded-xl p-4 group
                                ${isEditable ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10' : ''}
                                ${isActive && isEditable ? 'bg-slate-50 dark:bg-white/5 border-blue-500/50 dark:border-blue-400/50 ring-1 ring-blue-500/20' : ''}
                            `}
                            onClick={(e) => {
                                if (!isEditable) return;
                                e.stopPropagation(); // prevent drag or parent selection
                                onStepClick?.(index);
                            }}
                            onMouseDown={(e) => {
                                if (isEditable) e.stopPropagation();
                            }}
                        >
                            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-16 md:w-1/4">
                                <div className={`h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-500 
                                    ${isActive ? 'scale-125 ring-2 ring-purple-500/30' : 'group-hover:scale-115 group-hover:ring-2 group-hover:ring-purple-500/10'}`}>
                                    <div className={`h-4 w-4 rounded-full border p-2 transition-all duration-500 
                                        ${isActive ? 'bg-purple-500 border-purple-400 scale-110 shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 group-hover:bg-purple-500/40 group-hover:border-purple-400/50 group-hover:scale-110'}`} />
                                </div>
                                <div className="hidden md:block md:pl-20">
                                    <InlineText
                                        tagName="h3"
                                        className={`text-xl md:text-3xl font-bold transition-all duration-500 
                                            ${isActive ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-300 dark:text-neutral-800 group-hover:text-neutral-500 dark:group-hover:text-neutral-400'}`}
                                        value={item.title}
                                        disabled={!isEditable}
                                        onChange={(val) => updateActiveStep(index, 'title', val)}
                                        onStartEdit={() => onStepClick?.(index)}
                                    />
                                </div>
                            </div>

                            <div className="relative pl-4 pr-4 md:pl-8 flex-1 md:w-3/4">
                                <div className="md:hidden block mb-4">
                                    <InlineText
                                        tagName="h3"
                                        className={`text-2xl text-left font-bold transition-all duration-500 ${isActive ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-300 dark:text-neutral-800'}`}
                                        value={item.title}
                                        disabled={!isEditable}
                                        onChange={(val) => updateActiveStep(index, 'title', val)}
                                        onStartEdit={() => onStepClick?.(index)}
                                    />
                                </div>
                                <div>
                                    <StepDetailView
                                        step={item}
                                        stepNumber={index + 1}
                                        showNumber={false}
                                        isEditable={isEditable}
                                        onUpdate={(field, val) => updateActiveStep(index, field, val)}
                                        // getHighlightClass needs logic if we want to support TTS highlighting in this view
                                        getHighlightClass={() => ''}
                                        onInteraction={() => onStepClick?.(index)}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                    />
                </div>
            </div>
        </div >
    );
};
